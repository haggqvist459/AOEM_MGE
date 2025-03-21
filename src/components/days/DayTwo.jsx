import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateDailyScoreDayTwo, resetStateDayTwo, updateFieldDayTwo } from '../../redux/slices';
import {
  DayContainer, FormWrapper, FormButtons, FormHeader, FormSubHeader,
  ScoreBoardSection, FormInput,
  InfoPopup, Modal
} from '../../components';


const DayTwo = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayTwo);
  const [localState, setLocalState] = useState(dailyData);
  const [showModal, setShowModal] = useState(false);

  const confirmReset = () => {
    dispatch(resetStateDayTwo());
    setShowModal(false);
  };

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

  const handleBlur = (field, unit = null) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    // console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDayTwo({ field, unit, value }));
    dispatch(calculateDailyScoreDayTwo({ field, unit }));
  };


  return (
    <DayContainer>
      <FormHeader title={'Day Two'} onClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          {/* Medals */}
          <div className='flex flex-row space-x-1'>
            <FormSubHeader title={'Medals'} sizeClass='subheader-lg' />
            <InfoPopup message={'As medals are consumed in batches based on individual hero ranks, these scores are rough estimates.'} />
          </div>
          <FormWrapper>
            <FormInput
              title={'Legendary:'}
              id={'legendaryMedals'}
              placeholder={'0'}
              value={localState.legendaryMedals}
              onChange={(value) => handleLocalChange('legendaryMedals', value)}
              onBlur={() => handleBlur('legendaryMedals')}
            />
            <FormInput
              title={'Epic:'}
              id={'epicMedals'}
              placeholder={'0'}
              value={localState.epicMedals}
              onChange={(value) => handleLocalChange('epicMedals', value)}
              onBlur={() => handleBlur('epicMedals')}
            />
          </FormWrapper>
          {/* Scrolls */}
          <div className='flex flex-row space-x-1'>
            <FormSubHeader title={'Scrolls'} sizeClass='subheader-lg' />
            <InfoPopup message={'As scrolls are consumed in batches based on individual hero skill ranks, these scores are rough estimates.'} />
          </div>
          <FormWrapper>
            <FormInput
              title={'Legendary:'}
              id={'legendaryScrolls'}
              placeholder={'0'}
              value={localState.legendaryScrolls}
              onChange={(value) => handleLocalChange('legendaryScrolls', value)}
              onBlur={() => handleBlur('legendaryScrolls')}
            />
            <FormInput
              title={'Epic:'}
              id={'epicScrolls'}
              placeholder={'0'}
              value={localState.epicScrolls}
              onChange={(value) => handleLocalChange('epicScrolls', value)}
              onBlur={() => handleBlur('epicScrolls')}
            />
          </FormWrapper>
          {/* Blueprints */}
          <div className='flex flex-row space-x-1'>
            <FormSubHeader title={'Blueprints'} sizeClass='subheader-lg' />
            <InfoPopup message={'For Pre-forged, input the number of blueprints completed but not claimed before day two starts.'} />
          </div>
          <FormWrapper>
            <FormInput
              title={'Legendary:'}
              id={'legendaryBlueprints'}
              placeholder={'0'}
              value={localState.legendaryBlueprints}
              onChange={(value) => handleLocalChange('legendaryBlueprints', value)}
              onBlur={() => handleBlur('legendaryBlueprints')}
            />
            <FormInput
              title={'Pre-forged:'}
              id={'preforgedBlueprints'}
              placeholder={'0'}
              value={localState.preforgedBlueprints}
              onChange={(value) => handleLocalChange('preforgedBlueprints', value)}
              onBlur={() => handleBlur('preforgedBlueprints')}
            />
          </FormWrapper>
          {/* Time & Speed-up */}
          <FormSubHeader title={'Forging'} sizeClass='subheader-lg' />
          <FormSubHeader title={'Time to complete:'} />
          <FormWrapper>
            <FormInput
              id={'forgingTimeDay'}
              placeholder={'days'}
              value={localState.forgingTime.days}
              onChange={(value) => handleLocalChange('forgingTime', value, 'days')}
              onBlur={() => handleBlur('forgingTime', 'days')}
            />
            <FormInput
              id={'forgingTimeHours'}
              placeholder={'hours'}
              value={localState.forgingTime.hours}
              onChange={(value) => handleLocalChange('forgingTime', value, 'hours')}
              onBlur={() => handleBlur('forgingTime', 'hours')}
            />
            <FormInput
              id={'forgingTimeMinutes'}
              placeholder={'minutes'}
              value={localState.forgingTime.minutes}
              onChange={(value) => handleLocalChange('forgingTime', value, 'minutes')}
              onBlur={() => handleBlur('forgingTime', 'minutes')}
            />
            <FormInput
              id={'forgingTimeSeconds'}
              placeholder={'seconds'}
              value={localState.forgingTime.seconds}
              onChange={(value) => handleLocalChange('forgingTime', value, 'seconds')}
              onBlur={() => handleBlur('forgingTime', 'seconds')}
            />
          </FormWrapper>
          <FormSubHeader title={'Speed-up:'} />
          <FormWrapper>
            <FormInput
              id={'forgingSpeedupDay'}
              placeholder={'days'}
              value={localState.forgingSpeedup.days}
              onChange={(value) => handleLocalChange('forgingSpeedup', value, 'days')}
              onBlur={() => handleBlur('forgingSpeedup', 'days')}
            />
            <FormInput
              id={'forgingSpeedupHours'}
              placeholder={'hours'}
              value={localState.forgingSpeedup.hours}
              onChange={(value) => handleLocalChange('forgingSpeedup', value, 'hours')}
              onBlur={() => handleBlur('forgingSpeedup', 'hours')}
            />
            <FormInput
              id={'forgingSpeedupMinutes'}
              placeholder={'minutes'}
              value={localState.forgingSpeedup.minutes}
              onChange={(value) => handleLocalChange('forgingSpeedup', value, 'minutes')}
              onBlur={() => handleBlur('forgingSpeedup', 'minutes')}
            />
          </FormWrapper>
          {/* Previous Event Scores */}
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
          <FormSubHeader title={'Day Two Score'} sizeClass='subheader-lg' />
          <ScoreBoardSection title={'Daily score total: '} sizeClass={'subheader-md'} value={dailyData.totalDailyScore.toLocaleString()} />
          <div className='flex flex-row justify-between mb-1'>
            <ScoreBoardSection title={'Forging: '} value={dailyData.score.forging.toLocaleString()} />
            <ScoreBoardSection title={'Scrolls: '} value={dailyData.score.scrolls.toLocaleString()} />
            <ScoreBoardSection title={'Medals: '} value={dailyData.score.medals.toLocaleString()} />
          </div>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-md'} />
          <FormWrapper>
            <ScoreBoardSection title={'1st place: '} value={dailyData.previousEventScore.first.toLocaleString()} />
            <ScoreBoardSection title={'10th place: '} value={dailyData.previousEventScore.tenth.toLocaleString()} />
          </FormWrapper>
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      <Modal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmReset}
        title="Reset"
        description={'Clear all values for day two?'}
      />
    </DayContainer>
  )
}

export default DayTwo
