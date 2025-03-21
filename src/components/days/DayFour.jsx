import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateDailyScoreDayFour, resetStateDayFour, updateFieldDayFour } from '../../redux/slices';
import {
  DayContainer, FormInput, FormWrapper, FormButtons, FormHeader,
  FormSubHeader, ScoreBoardSection
} from '../../components';


const DayFour = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch()
  const dailyData = useSelector((state) => state.dayFour)
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);


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
    dispatch(updateFieldDayFour({ field, unit, value }));
    dispatch(calculateDailyScoreDayFour({ field, unit }))
  };


  const cancelForm = () => {
    dispatch(resetStateDayFour())
  }

  return (
    <DayContainer>
      <FormHeader title={'Day Four'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          <FormSubHeader title={'Ring upgrades'} sizeClass='subheader-lg' />
          <div className='grid grid-cols-1 xs:grid-cols-2 gap-1'>
            {/* Hammers */}
            <FormInput
              title={'Hammers:'}
              id={'hammers'}
              placeholder={'0'}
              value={localState.hammers}
              onChange={(value) => handleLocalChange('hammers', value)}
              onBlur={() => handleBlur('hammers')}
            />
            {/* Fine gold */}
            <FormInput
              title={'Fine gold:'}
              id={'fineGold'}
              placeholder={'0'}
              value={localState.fineGold}
              onChange={(value) => handleLocalChange('fineGold', value)}
              onBlur={() => handleBlur('fineGold')}
            />
            {/* Silver sand */}
            <FormInput
              title={'Silver Sand:'}
              id={'silverSand'}
              placeholder={'0'}
              value={localState.silverSand}
              onChange={(value) => handleLocalChange('silverSand', value)}
              onBlur={() => handleBlur('silverSand')}
            />
            {/* Copper sand */}
            <FormInput
              title={'Copper sand:'}
              id={'copperSand'}
              placeholder={'0'}
              value={localState.copperSand}
              onChange={(value) => handleLocalChange('copperSand', value)}
              onBlur={() => handleBlur('copperSand')}
            />
            {/* Meteor steel */}
            <FormInput
              title={'Meteor steel:'}
              id={'meteorSteel'}
              placeholder={'0'}
              value={localState.meteorSteel}
              onChange={(value) => handleLocalChange('meteorSteel', value)}
              onBlur={() => handleBlur('meteorSteel')}
            />
          </div>
          {/* Universal Speed-up */}
          <FormSubHeader title={'Speed-ups'} sizeClass='subheader-lg' />
          <FormSubHeader title={'Universal:'} />
          <FormWrapper>
            <FormInput
              id={'universalSpeedupDay'}
              placeholder={'day'}
              value={localState.universalSpeedup.days}
              onChange={(value) => handleLocalChange('universalSpeedup', value, 'days')}
              onBlur={() => handleBlur('universalSpeedup', 'days')}
            />
            <FormInput
              id={'universalSpeedupHours'}
              placeholder={'hour'}
              value={localState.universalSpeedup.hours}
              onChange={(value) => handleLocalChange('universalSpeedup', value, 'hours')}
              onBlur={() => handleBlur('universalSpeedup', 'hours')}
            />
            <FormInput
              id={'universalSpeedupMin'}
              placeholder={'min'}
              value={localState.universalSpeedup.minutes}
              onChange={(value) => handleLocalChange('universalSpeedup', value, 'minutes')}
              onBlur={() => handleBlur('universalSpeedup', 'minutes')}
            />
          </FormWrapper>
          {/* Building Speed-up */}
          <FormSubHeader title={'Building'} />
          <FormWrapper>
            <FormInput
              id={'buildingSpeedupDay'}
              placeholder={'day'}
              value={localState.buildingSpeedup.days}
              onChange={(value) => handleLocalChange('buildingSpeedup', value, 'days')}
              onBlur={() => handleBlur('buildingSpeedup', 'days')}
            />
            <FormInput
              id={'buildingSpeedupHours'}
              placeholder={'hour'}
              value={localState.buildingSpeedup.hours}
              onChange={(value) => handleLocalChange('buildingSpeedup', value, 'hours')}
              onBlur={() => handleBlur('buildingSpeedup', 'hours')}
            />
            <FormInput
              id={'buildingSpeedupMinutes'}
              placeholder={'min'}
              value={localState.buildingSpeedup.minutes}
              onChange={(value) => handleLocalChange('buildingSpeedup', value, 'minutes')}
              onBlur={() => handleBlur('buildingSpeedup', 'minutes')}
            />
          </FormWrapper>
          {/* Research Speed-up */}
          <FormSubHeader title={'Research'} />
          <FormWrapper>
            <FormInput
              id={'researchSpeedupDay'}
              placeholder={'day'}
              value={localState.researchSpeedup.days}
              onChange={(value) => handleLocalChange('researchSpeedup', value, 'days')}
              onBlur={() => handleBlur('researchSpeedup', 'days')}
            />
            <FormInput
              id={'researchSpeedupHours'}
              placeholder={'hour'}
              value={localState.researchSpeedup.hours}
              onChange={(value) => handleLocalChange('researchSpeedup', value, 'hours')}
              onBlur={() => handleBlur('researchSpeedup', 'hours')}
            />
            <FormInput
              id={'researchSpeedupMinutes'}
              placeholder={'min'}
              value={localState.researchSpeedup.minutes}
              onChange={(value) => handleLocalChange('researchSpeedup', value, 'minutes')}
              onBlur={() => handleBlur('researchSpeedup', 'minutes')}
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
          <FormSubHeader title={'Day Four Score'} sizeClass={'subheader-lg'} />
          <ScoreBoardSection title={'Total daily score:'} sizeClass={'subheader-md'} value={dailyData.totalDailyScore.toLocaleString()} />
          <ScoreBoardSection title={'Ring upgrades: '} value={dailyData.score.rings.toLocaleString()} />
          <FormSubHeader title={'Speed-up score'} sizeClass={'subheader-md'} />
          <div className='flex flex-row justify-between mb-1'>
            <ScoreBoardSection title={'Universal:'} value={dailyData.score.universal.toLocaleString()} />
            <ScoreBoardSection title={'Building:'} value={dailyData.score.building.toLocaleString()} />
            <ScoreBoardSection title={'Research:'} value={dailyData.score.research.toLocaleString()} />
          </div>
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

export default DayFour
