import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_KEYS, TROOP_POWER_MULTIPLIER } from '../../utils';
import { calculateDailyScoreDaySix, resetStateDaySix, updateFieldDaySix } from '../../redux/slices';
import {
  DayContainer, PreviousEventScore, FormButtons, FormHeader, FormSubHeader, FormInput, FormDropdown, FormWrapper,
  ScoreBoardWrapper, ScoreBoardSection, PreviousEventScoreBoard
} from '../../components';


const DaySix = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.daySix);
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);


  const handleLocalChange = (field, value, unit=null) => {
    console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }  //  Correctly updates object fields
        : value,  //  Directly updates primitive fields without spreading
    }));
  };

  const handleBlur = (field, unit=null) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDaySix({ field, unit, value }));
    dispatch(calculateDailyScoreDaySix());
  };

  const cancelForm = () => {
    dispatch(resetStateDaySix());
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDaySix());
  }

  return (
    <DayContainer>
      <FormHeader title={'Day Six'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
            {/* Input */}
            {/* Research estimate */}
            <FormSubHeader title={'Research'} />
            <FormInput
              id={'researchPower'}
              placeholder={'0'}
              value={localState.researchPower}
              onChange={(newValue) => handleLocalChange('researchPower', newValue)}
              onBlur={() => handleBlur('researchPower')}
            />
            {/* Building estimates */}
            {/* 3x building queues */}
            <FormSubHeader title={'Building'} />
            <FormWrapper flex={'row'} className='space-x-1'>
              <FormInput
                id={'buildingPowerFirstQueue'}
                placeholder={'0'}
                value={localState.buildingPower.firstQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'firstQueue')}
                onBlur={() => handleBlur('buildingPower', 'firstQueue')}
              />
              <FormInput
                id={'buildingPowerSecondQueue'}
                placeholder={'0'}
                value={localState.buildingPower.secondQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'secondQueue')}
                onBlur={() => handleBlur('buildingPower', 'secondQueue')}
              />
              <FormInput
                id={'buildingPower'}
                placeholder={'0'}
                value={localState.buildingPower.thirdQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue , 'thirdQueue')}
                onBlur={() => handleBlur('buildingPower', 'thirdQueue')}
              />
            </FormWrapper>
            {/* Troop estimates */}
            {/* Troop tier dropdown + number input for amount of troops */}
            <FormSubHeader title={'Troops:'} />
            <FormWrapper flex={'row'} className={'space-x-1'}>
              <FormWrapper>
                <FormSubHeader title={'Expected trained: '} />
                <FormInput
                  id={'troopsTrainedTotal'}
                  placeholder={'0'}
                  value={localState.troopPower.troopsTrainedTotal}
                  onChange={(newValue) => handleLocalChange('troopPower', newValue, 'troopsTrainedTotal')}
                  onBlur={() => handleBlur('troopPower', 'troopsTrainedTotal')}
                />
              </FormWrapper>
              <FormDropdown 
                id={'troopTargetTier'}
                title={'Target tier:'}
                options={TROOP_POWER_MULTIPLIER}
                value={localState.troopPower.tier}
                onChange={(newValue) => handleLocalChange('troopPower',  newValue, 'tier')}
                onBlur={() => handleBlur('troopPower', 'tier')}
              />
            </FormWrapper>
            <PreviousEventScore dayKey={DAY_KEYS.DAY_SIX} />
          </div>
          <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
            {/* Output */}
            <FormSubHeader title={'Day five score'} weight={'font-bold'} size={'text-lg lg:text-xl'} />
            <ScoreBoardSection title={'Daily score total: '} value={dailyData.totalDailyScore.toLocaleString()} />
            <ScoreBoardWrapper gridCols={'grid-cols-3'}>
              <ScoreBoardSection title={'Troops: '} value={dailyData.score.troop.toLocaleString()} />
              <ScoreBoardSection title={'Building: '} value={dailyData.score.building.toLocaleString()} />
              <ScoreBoardSection title={'Research: '} value={dailyData.score.research.toLocaleString()} />
            </ScoreBoardWrapper>
            <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_SIX} />
          </div>
        </div>
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
  )
}

export default DaySix


/*

Power increase
Citadel building 1x power = 3 
Research tech 1x power = 6
Unit training power = 3

Input needed: 
Building, how much power increase it yields
Research, how much power increase it yields
Troop training total potential 




*/