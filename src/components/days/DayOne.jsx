import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayOne, resetStateDayOne, updateFieldDayOne } from '../../redux/slices'
import { TRIBE_LEVEL_MULTIPLIERS } from '../../utils'
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, FormInput,
  FormDropdown, FormWrapper, ScoreBoardSection
} from '../../components'

const DayOne = ({ activeDay, setActiveDay }) => {


  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayOne);

  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);

  //Dropdown dispatch
  const handleInstantDispatch = (field, value) => {
    // console.log("handleInstantDispatch values, field: ", field, ", value: ", value);

    dispatch(updateFieldDayOne({ field, value }));
    dispatch(calculateDailyScoreDayOne());

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

  const handleBlur = (field, unit) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    // console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDayOne({ field, unit, value }));
    dispatch(calculateDailyScoreDayOne())
  };

  const cancelForm = () => {
    dispatch(resetStateDayOne())
  }

  return (
    <DayContainer>
      <FormHeader title={'Day One'} onClick={cancelForm} />
      {/* Split section in half vertically, input on left and output on the right. */}
      {/* On smaller breakpoints, display everything in one column. */}
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          <FormSubHeader title={'Tribe hunting'} sizeClass='subheader-lg' />
          {/* Dropdown */}
          <FormDropdown
            id={'tribeLevelMultiplier'}
            title={'Select tribe level:'}
            value={localState.tribeLevelMultiplier}
            options={TRIBE_LEVEL_MULTIPLIERS}
            onChange={(newValue) => handleInstantDispatch('tribeLevelMultiplier', newValue)}
          />
          {/* Stamina  */}
          <FormInput
            title={'Available stamina:'}
            id={'stamina'}
            placeholder={'include daily and villager boosts'}
            value={localState.stamina}
            onChange={(value) => handleLocalChange('stamina', value)}
            onBlur={() => handleBlur('stamina')}
          />
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
          <FormSubHeader title={'Day One Score'} sizeClass='subheader-lg' />
          <FormWrapper>
            <ScoreBoardSection title={'Daily score: '} value={dailyData.totalDailyScore.toLocaleString()} />
            <ScoreBoardSection title={'Hunted tribes: '} value={dailyData.tribesHunted.toLocaleString()} />
          </FormWrapper>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-md'} />
          <FormWrapper>
            <ScoreBoardSection title={'1st place: '} value={dailyData.previousEventScore.first.toLocaleString()} />
            <ScoreBoardSection title={'10th place: '} value={dailyData.previousEventScore.tenth.toLocaleString()} />
          </FormWrapper>
        </div>
      </div>
      {/* buttons */}
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer>
  )
}

export default DayOne
