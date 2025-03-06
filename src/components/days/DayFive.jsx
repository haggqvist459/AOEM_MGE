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
    console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (field, unit, value) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: { ...prev[field], [unit]: value },
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
          } : value, // If no unit, just update the field directly
        },
      },
    }));
  };

  const handleTroopTypeBlur = (troopType, field, unit) => {
    const value = unit
      ? localState.troops[troopType][field][unit] // Handle nested object with unit
      : localState.troops[troopType][field];

    dispatch(updateTroopField({ troopType, field, unit, value }));
    dispatch(calculateDailyScoreDayFive());
  }

  const handleBlur = (field, unit) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDayFive({ field, unit, value }));
    dispatch(calculateDailyScoreDayFive());
  };

  const cancelForm = () => {
    dispatch(resetStateDayFive())
  }
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayFive());
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Five'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
            <FormSubHeader title={'Troop Promotion '} className={'md:text-lg lg:text-xl'} />
            {Object.keys(localState.troops).map((troopType, index) => (
              <TroopType
                key={index}
                troopData={localState.troops[troopType]}
                troopType={troopType}
                onChange={handleTroopTypeStateChange}
                onBlur={handleTroopTypeBlur}
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
                      onChange={(newValue) => handleLocalChange('trainedTroopTier', newValue)}
                      onBlur={() => handleBlur('trainedTroopTier',)}
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
                      onChange={(value) => handleTimeChange('trainedTroopsTrainingTime', 'days', value)}
                      onBlur={() => handleBlur('trainedTroopsTrainingTime', 'days')}
                    />
                    <FormInput
                      id={'troopTrainingTimeHours'}
                      placeholder={'hours'}
                      value={localState.trainedTroopsTrainingTime.hours}
                      onChange={(value) => handleTimeChange('trainedTroopsTrainingTime', 'hours', value)}
                      onBlur={() => handleBlur('trainedTroopsTrainingTime', 'hours')}
                    />
                    <FormInput
                      id={'troopTrainingTimeMinutes'}
                      placeholder={'minutes'}
                      value={localState.trainedTroopsTrainingTime.minutes}
                      onChange={(value) => handleTimeChange('trainedTroopsTrainingTime', 'minutes', value)}
                      onBlur={() => handleBlur('trainedTroopsTrainingTime', 'minutes')}
                    />
                    <FormInput
                      id={'troopTrainingTimeSeconds'}
                      placeholder={'seconds'}
                      value={localState.trainedTroopsTrainingTime.seconds}
                      onChange={(value) => handleTimeChange('trainedTroopsTrainingTime', 'seconds', value)}
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
                  onChange={(newValue) => handleTimeChange('initialTrainingSpeedup', 'days', newValue)}
                  onBlur={() => handleBlur('initialTrainingSpeedup', 'days')}
                />
                <FormInput
                  id={'initialTrainingSpeedupHours'}
                  placeholder={'hours'}
                  value={localState.initialTrainingSpeedup.hours}
                  onChange={(newValue) => handleTimeChange('initialTrainingSpeedup', 'hours', newValue)}
                  onBlur={() => handleBlur('initialTrainingSpeedup', 'hours')}
                />
                <FormInput
                  id={'initialTrainingSpeedupMinutes'}
                  placeholder={'minutes'}
                  value={localState.initialTrainingSpeedup.minutes}
                  onChange={(newValue) => handleTimeChange('initialTrainingSpeedup', 'minutes', newValue)}
                  onBlur={() => handleBlur('initialTrainingSpeedup', 'minutes')}
                />
              </FormWrapper>
            </FormWrapper>
            <PreviousEventScore dayKey={DAY_KEYS.DAY_FIVE} />
          </div>
          <div className='w-full md:w-1/2 relative md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
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
      </form>
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



    console.log('handleTroopTypeStateChange values, troopType: ', troopType);
    console.log('handleTroopTypeStateChange values, field: ', field);
    console.log('handleTroopTypeStateChange values, unit: ', unit);
    console.log('handleTroopTypeStateChange values, value: ', value);



    console.log("handleTroopTypeBlur - Checking localState: ", localState);
    console.log("handleTroopTypeBlur - Checking troopType: ", troopType);
    console.log("handleTroopTypeBlur - Checking field: ", field);
    console.log("handleTroopTypeBlur - Checking unit: ", unit);
    console.log("handleTroopTypeBlur - Checking value: ", value);



*/
