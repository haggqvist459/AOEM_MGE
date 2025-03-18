import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_KEYS, TROOP_TIER_MULTIPLIERS } from '../../utils';
import { calculateDailyScoreDayFive, resetStateDayFive, updateTroopField, updateFieldDayFive } from '../../redux/slices';
import {
  DayContainer, PreviousEventScore, FormButtons, FormHeader, FormWrapper, FormSubHeader,
  TroopType, FormInput, FormDropdown,
  ScoreBoardWrapper, ScoreBoardSection, PreviousEventScoreBoard
} from '../../components';


const DayFive = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayFive)
  const [localState, setLocalState] = useState(dailyData);
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  // Dropdown dispatch 
  const handleInstantDispatch = (field, value, troopType = null) => {
    console.log("handleInstantDispatch values, field: ", field, ", value: ", value, ' troopType: ', troopType);

    if (troopType) {
      dispatch(updateTroopField({ troopType, field, unit: null, value }))
    } else {
      dispatch(updateFieldDayFive({ field, unit: null, value }));
    }

    dispatch(calculateDailyScoreDayFive());
  }

  // updates the local state 
  const handleLocalChange = (field, value, troopType = null, unit = null) => {
    console.log("handleLocalChange values: field:", field, ", unit:", unit, ", troopType:", troopType, ", value:", value);

    setLocalState(prev => ({
      ...prev,
      ...(troopType
        ? {
          troops: {
            ...prev.troops,
            [troopType]: {
              ...prev.troops[troopType],
              [field]: unit
                ? { ...prev.troops[troopType][field], [unit]: value }
                : value,
            },
          },
        }
        : {
          [field]: unit
            ? { ...prev[field], [unit]: value }
            : value,
        }
      )
    }));
  };

  // Update redux
  const handleBlur = (field, unit = null, troopType=null) => {
    
    let value;

    // Assign the value conditionally
    if (troopType) {
      value = unit
      ? localState.troops[troopType][field][unit] 
      : localState.troops[troopType][field];
    } else {
      value = unit
      ? localState[field][unit]
      : localState[field];
    }

    console.log("handleBlur before dispatch values: field: ", field, ', value: ', value, ', unit: ', unit, ', troopType: ', troopType);
    
    // Conditionally dispatch actions depending on whether TroopType or not 
    if(troopType){
      dispatch(updateTroopField({ troopType, field, unit, value }));
    } else {
      dispatch(updateFieldDayFive({ field, unit, value }));
    }
    
    dispatch(calculateDailyScoreDayFive());
  };

  const cancelForm = () => {
    dispatch(resetStateDayFive())
  }



  return (
    <DayContainer>
      <FormHeader title={'Day Five'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          <FormSubHeader title={'Troop Promotion '} className={'md:text-lg lg:text-xl'} />
          {Object.keys(localState.troops).map((troopType, index) => (
            <TroopType
              key={index}
              troopData={localState.troops[troopType]}
              troopType={troopType}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              handleInstantDispatch={handleInstantDispatch}
            />
          ))}
          {/* Troop training: */}
          <FormWrapper className='border-b border-neutral-400 mb-2 pb-2'>
            <div className='flex flex-row space-x-2'>
              <button
                type='button'
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
              >
                <FormSubHeader title={'Troop Training:'} className={'text-lg md:text-xl'} />
                {/* Triangle Icon */}
                <span className={`text-blue-900 inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
                  ▶
                </span>
              </button>
            </div>
            {/* Tier & Troops per batch  */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-50 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}`}>
              <FormWrapper className='sm:flex-row space-x-1'>
                <div className='w-full sm:w-1/2'>
                  <FormDropdown
                    title={'Target tier: '}
                    options={TROOP_TIER_MULTIPLIERS}
                    id={'trainedTroopTier'}
                    value={localState.trainedTroopTier}
                    onChange={(newValue) => handleInstantDispatch('trainedTroopTier', newValue)}
                  />
                </div>
                <div className='w-full sm:w-1/2'>
                  <FormWrapper>
                    <FormSubHeader title={'Troops per batch:'} />
                    <FormInput
                      id={'trainedTroopsPerBatch'}
                      placeholder={'0'}
                      value={localState.trainedTroopsPerBatch}
                      onChange={(newValue) => handleLocalChange('trainedTroopsPerBatch', newValue)}
                      onBlur={() => handleBlur('trainedTroopsPerBatch')}
                    />
                  </FormWrapper>
                </div>
              </FormWrapper>
              {/* Troop training time: */}
              <FormWrapper>
                <FormSubHeader title={'Troop training time:'} />
                <FormWrapper flex={'row'} className='space-x-2'>
                  <FormInput
                    id={'troopTrainingTimeDay'}
                    placeholder={'days'}
                    value={localState.trainedTroopsTrainingTime.days}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'days')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'days')}
                  />
                  <FormInput
                    id={'troopTrainingTimeHours'}
                    placeholder={'hours'}
                    value={localState.trainedTroopsTrainingTime.hours}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'hours')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'hours')}
                  />
                  <FormInput
                    id={'troopTrainingTimeMinutes'}
                    placeholder={'minutes'}
                    value={localState.trainedTroopsTrainingTime.minutes}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'minutes')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'minutes')}
                  />
                  <FormInput
                    id={'troopTrainingTimeSeconds'}
                    placeholder={'seconds'}
                    value={localState.trainedTroopsTrainingTime.seconds}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'seconds')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'seconds')}
                  />
                </FormWrapper>
              </FormWrapper>
            </div>
          </FormWrapper>
          {/* Training Speedup: */}
          <FormWrapper>
            <FormSubHeader title={'Training Speed-up: '} />
            <FormWrapper flex='row' className='space-x-1'>
              <FormInput
                id={'initialTrainingSpeedupDays'}
                placeholder={'days'}
                value={localState.initialTrainingSpeedup.days}
                onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'days')}
                onBlur={() => handleBlur('initialTrainingSpeedup', 'days')}
              />
              <FormInput
                id={'initialTrainingSpeedupHours'}
                placeholder={'hours'}
                value={localState.initialTrainingSpeedup.hours}
                onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'hours')}
                onBlur={() => handleBlur('initialTrainingSpeedup', 'hours')}
              />
              <FormInput
                id={'initialTrainingSpeedupMinutes'}
                placeholder={'minutes'}
                value={localState.initialTrainingSpeedup.minutes}
                onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'minutes')}
                onBlur={() => handleBlur('initialTrainingSpeedup', 'minutes')}
              />
            </FormWrapper>
          </FormWrapper>
          <PreviousEventScore dayKey={DAY_KEYS.DAY_FIVE} />
        </div>
        <div className='w-full md:w-1/2  md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
          {/* Output */}
          <FormSubHeader title={'Day Five Score: '} weight={'font-bold'} size={'text-lg lg:text-xl'} />
          <ScoreBoardSection title={'Daily score total: '} value={dailyData.totalDailyScore.toLocaleString()} />
          <div className='flex flex-row space-x-5'>
            <ScoreBoardSection title={'Promotion score: '} value={dailyData.score.promoting.toLocaleString()} />
            <ScoreBoardSection title={'Training score: '} value={dailyData.score.training.toLocaleString()} />
          </div>
          <ScoreBoardWrapper>
            <div className='flex flex-col'>
              <FormSubHeader title={'Archers data:'} className={'text-lg'} />
              <div className='flex flex-row'>
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Archers'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Archers'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection className={'ml-5'} title={'Troop score:'} value={(dailyData.troops['Archers'].troopTotalScore || 0).toLocaleString()} />
              </div>
            </div>
            <div className='flex flex-col'>
              <FormSubHeader title={'Cavalry data:'} className={'text-sm'} />
              <div className='flex flex-row'>
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Cavalry'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Cavalry'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection className={'ml-5'} title={'Troop score:'} value={dailyData.troops['Cavalry'].troopTotalScore.toLocaleString()} />
              </div>
            </div>
            <div className='flex flex-col'>
              <FormSubHeader title={'Pikemen data:'} className={'text-sm'} />
              <div className='flex flex-row'>
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Pikemen'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Pikemen'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection className={'ml-5'} title={'Troop score:'} value={dailyData.troops['Pikemen'].troopTotalScore.toLocaleString()} />
              </div>
            </div>
            <div className='flex flex-col'>
              <FormSubHeader title={'Swordsmen data:'} className={'text-sm'} />
              <div className='flex flex-row '>
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Swordsmen'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Swordsmen'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection className={'ml-5'} title={'Troop score:'} value={dailyData.troops['Swordsmen'].troopTotalScore.toLocaleString()} />
              </div>
            </div>
          </ScoreBoardWrapper>
          <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_FIVE} />
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer >
  )
}

export default DayFive


/*

Troop training:
1x lvl 1 = 2
1x lvl 2 = 3
1x lvl 3 = 5
1x lvl 4 = 10
1x lvl 5 = 20
1x lvl 6 = 50
1x lvl 7 = 100
Promote units based on level gap = 1 point per level
stop

Input:
    Available T1 troops to promote and to which level it will be promoted

Top 1 score 52,5kk
Top 10 score 11,2kk

const handleLocalChange = (field, value, unit = null) => {
    console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }));
  };

  const handleTroopTypeStateChange = (troopType, field, unit, value) => {

    setLocalState(prev => ({
      ...prev,
      troops: {
        ...prev.troops,
        [troopType]: {
          ...prev.troops[troopType],
          [field]: unit ? {
            ...prev.troops[troopType][field],
            [unit]: value
          } : value,
        },
      },
    }));
  };
  const handleTroopTypeBlur = (troopType, field, unit = null) => {
    const value = unit
      ? localState.troops[troopType][field][unit] // Handle nested object with unit
      : localState.troops[troopType][field];

    dispatch(updateTroopField({ troopType, field, unit, value }));
    dispatch(calculateDailyScoreDayFive());
  }

*/
