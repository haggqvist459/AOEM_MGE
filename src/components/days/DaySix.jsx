import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TROOP_POWER_MULTIPLIER } from '../../utils';
import { calculateDailyScoreDaySix, resetStateDaySix, updateFieldDaySix } from '../../redux/slices';
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, FormInput, FormDropdown, FormWrapper,
  ScoreBoardWrapper, ScoreBoardSection
} from '../../components';


const DaySix = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.daySix);
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  const handleInstantDispatch = (field, unit, value) => {
    dispatch(updateFieldDaySix({ field, unit, value }));
    dispatch(calculateDailyScoreDaySix({ field, unit }));
  }

  const handleLocalChange = (field, value, unit = null) => {
    // console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }));
  };

  const handleBlur = (field, unit = null) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    // console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDaySix({ field, unit, value }));
    dispatch(calculateDailyScoreDaySix({ field, unit }));
  };

  const cancelForm = () => {
    dispatch(resetStateDaySix());
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Six'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          {/* Research estimate */}
          <FormSubHeader title={'Research:'} sizeClass='subheader-lg' />
          <FormWrapper>
            <FormInput
              id={'researchPower'}
              placeholder={'0'}
              value={localState.researchPower}
              onChange={(newValue) => handleLocalChange('researchPower', newValue)}
              onBlur={() => handleBlur('researchPower')}
            />
          </FormWrapper>
          {/* Building estimates */}
          {/* 3x building queues */}
          <FormSubHeader title={'Building queues:'} sizeClass='subheader-lg' />
          <FormWrapper>
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
              id={'buildingPowerThirdQueue'}
              placeholder={'0'}
              value={localState.buildingPower.thirdQueue}
              onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'thirdQueue')}
              onBlur={() => handleBlur('buildingPower', 'thirdQueue')}
            />
          </FormWrapper>
          {/* Troop estimates */}
          {/* Troop tier dropdown + number input for amount of troops */}
          <FormSubHeader title={'Troops:'} sizeClass='subheader-lg' />
          <FormWrapper>
            <FormInput
              title={'Expected trained: '}
              id={'troopsTrainedTotal'}
              placeholder={'0'}
              value={localState.troopPower.troopsTrainedTotal}
              onChange={(newValue) => handleLocalChange('troopPower', newValue, 'troopsTrainedTotal')}
              onBlur={() => handleBlur('troopPower', 'troopsTrainedTotal')}
            />
            <FormDropdown
              id={'troopTargetTier'}
              title={'Target tier:'}
              options={TROOP_POWER_MULTIPLIER}
              value={localState.troopPower.tier}
              onChange={(newValue) => handleInstantDispatch('troopPower', 'tier', newValue)}
            />
          </FormWrapper>
          {/* Previous Event Score */}
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-lg'} />
          <FormWrapper>
            <FormInput
              title={'1st place:'}
              id={'previousEventScoreFirst'}
              placeholder={'0'}
              value={localState.previousEventScore.first}
              onChange={(newValue) => handleLocalChange('previousEventScore', newValue, 'first')}
              onBlur={() => handleBlur('previousEventScore', 'first')}
            />
            <FormInput
              title={'10th place:'}
              id={'previousEventScoreTenth'}
              placeholder={'0'}
              value={localState.previousEventScore.tenth}
              onChange={(newValue) => handleLocalChange('previousEventScore', newValue, 'tenth')}
              onBlur={() => handleBlur('previousEventScore', 'tenth')}
            />
          </FormWrapper>
        </div>
        <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1 md:mt-0'>
          {/* Output */}
          <FormSubHeader title={'Day Five Score'} sizeClass={'subheader-xl'} />
          <ScoreBoardSection title={'Total daily score:'} sizeClass={'subheader-md'} value={dailyData.totalDailyScore.toLocaleString()} />
          <ScoreBoardWrapper gridCols={'grid-cols-3'}>
            <ScoreBoardSection title={'Troops: '} value={dailyData.score.troop.toLocaleString()} />
            <ScoreBoardSection title={'Building: '} value={dailyData.score.building.toLocaleString()} />
            <ScoreBoardSection title={'Research: '} value={dailyData.score.research.toLocaleString()} />
          </ScoreBoardWrapper>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-md'} />
          <FormWrapper>
            <ScoreBoardSection title={'1st place: '} value={dailyData.previousEventScore.first.toLocaleString()} />
            <ScoreBoardSection title={'10th place: '} value={dailyData.previousEventScore.tenth.toLocaleString()} />
          </FormWrapper>
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer>
  )
}

export default DaySix;