import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_KEYS } from '../../utils';
import { calculateDailyScoreDayFour, resetStateDayFour, updateFieldDayFour } from '../../redux/slices';
import {
  DayContainer, FormInput, FormWrapper, FormButtons, FormHeader,
  PreviousEventScore, PreviousEventScoreBoard, FormSubHeader, ScoreBoardSection
} from '../../components';


const DayFour = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch()
  const dailyData = useSelector((state) => state.dayFour)
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
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

  const handleBlur = (field, unit) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDayFour({ field, unit, value }));
    dispatch(calculateDailyScoreDayFour())
  };


  const cancelForm = () => {
    dispatch(resetStateDayFour())
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(calculateDailyScoreDayFour())
  }

  return (
    <DayContainer>
      <FormHeader title={'Day Four'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
            {/* Input */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 px-1'>
              {/* Hammers */}
              <FormWrapper>
                <FormSubHeader title={'Planishing hammers:'} />
                <FormInput
                  id={'hammers'}
                  placeholder={'0'}
                  value={localState.hammers}
                  onChange={(value) => handleLocalChange('hammers', value)}
                  onBlur={() => handleBlur('hammers')}
                />
              </FormWrapper>
              {/* Fine gold */}
              <FormWrapper>
                <FormSubHeader title={'Fine gold:'} />
                <FormInput
                  id={'fineGold'}
                  placeholder={'0'}
                  value={localState.fineGold}
                  onChange={(value) => handleLocalChange('fineGold', value)}
                  onBlur={() => handleBlur('fineGold')}
                />
              </FormWrapper>
              {/* Silver sand */}
              <FormWrapper>
                <FormSubHeader title={'Silver Sand:'} />
                <FormInput
                  id={'silverSand'}
                  placeholder={'0'}
                  value={localState.silverSand}
                  onChange={(value) => handleLocalChange('silverSand', value)}
                  onBlur={() => handleBlur('silverSand')}
                />
              </FormWrapper>
              {/* Copper sand */}
              <FormWrapper>
                <FormSubHeader title={'Copper sand:'} />
                <FormInput
                  id={'copperSand'}
                  placeholder={'0'}
                  value={localState.copperSand}
                  onChange={(value) => handleLocalChange('copperSand', value)}
                  onBlur={() => handleBlur('copperSand')}
                />
              </FormWrapper>
              {/* Meteor steel */}
              <FormWrapper>
                <FormSubHeader title={'Meteor steel:'} />
                <FormInput
                  id={'meteorSteel'}
                  placeholder={'0'}
                  value={localState.meteorSteel}
                  onChange={(value) => handleLocalChange('meteorSteel', value)}
                  onBlur={() => handleBlur('meteorSteel')}
                />
              </FormWrapper>
              {/* Universal Speed-up */}
              <FormWrapper>
                <FormSubHeader title={'Universal speed-up:'} />
                <FormWrapper flex={'row'} className='space-x-1'>
                  <FormInput
                    id={'universalSpeedupDay'}
                    placeholder={'day'}
                    value={localState.universalSpeedup.days}
                    onChange={(value) => handleTimeChange('universalSpeedup', 'days', value)}
                    onBlur={() => handleBlur('universalSpeedup', 'days')}
                  />
                  <FormInput
                    id={'universalSpeedupHours'}
                    placeholder={'hour'}
                    value={localState.universalSpeedup.hours}
                    onChange={(value) => handleTimeChange('universalSpeedup', 'hours', value)}
                    onBlur={() => handleBlur('universalSpeedup', 'hours')}
                  />
                  <FormInput
                    id={'universalSpeedupMin'}
                    placeholder={'min'}
                    value={localState.universalSpeedup.minutes}
                    onChange={(value) => handleTimeChange('universalSpeedup', 'minutes', value)}
                    onBlur={() => handleBlur('universalSpeedup', 'minutes')}
                  />
                </FormWrapper>
              </FormWrapper>
              {/* Building Speed-up */}
              <FormWrapper>
                <FormSubHeader title={'Building speed-up:'} />
                <FormWrapper flex={'row'} className='space-x-1'>
                  <FormInput
                    id={'buildingSpeedupDay'}
                    placeholder={'day'}
                    value={localState.buildingSpeedup.days}
                    onChange={(value) => handleTimeChange('buildingSpeedup', 'days', value)}
                    onBlur={() => handleBlur('buildingSpeedup', 'days')}
                  />
                  <FormInput
                    id={'buildingSpeedupHours'}
                    placeholder={'hour'}
                    value={localState.buildingSpeedup.hours}
                    onChange={(value) => handleTimeChange('buildingSpeedup', 'hours', value)}
                    onBlur={() => handleBlur('buildingSpeedup', 'hours')}
                  />
                  <FormInput
                    id={'buildingSpeedupMinutes'}
                    placeholder={'min'}
                    value={localState.buildingSpeedup.minutes}
                    onChange={(value) => handleTimeChange('buildingSpeedup', 'minutes', value)}
                    onBlur={() => handleBlur('buildingSpeedup', 'minutes')}
                  />
                </FormWrapper>
              </FormWrapper>
              {/* Research Speed-up */}
              <FormWrapper>
                <FormSubHeader title={'Research speed-up:'} />
                <FormWrapper flex={'row'} className='space-x-1'>
                  <FormInput
                    id={'researchSpeedupDay'}
                    placeholder={'day'}
                    value={localState.researchSpeedup.days}
                    onChange={(value) => handleTimeChange('researchSpeedup', 'days', value)}
                    onBlur={() => handleBlur('researchSpeedup', 'days')}
                  />
                  <FormInput
                    id={'researchSpeedupHours'}
                    placeholder={'hour'}
                    value={localState.researchSpeedup.hours}
                    onChange={(value) => handleTimeChange('researchSpeedup', 'hours', value)}
                    onBlur={() => handleBlur('researchSpeedup', 'hours')}
                  />
                  <FormInput
                    id={'researchSpeedupMinutes'}
                    placeholder={'min'}
                    value={localState.researchSpeedup.minutes}
                    onChange={(value) => handleTimeChange('researchSpeedup', 'minutes', value)}
                    onBlur={() => handleBlur('researchSpeedup', 'minutes')}
                  />
                </FormWrapper>
              </FormWrapper>
            </div>
            <PreviousEventScore dayKey={DAY_KEYS.DAY_FOUR} />
          </div>
          <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
            {/* Output */}
            <FormSubHeader title={'Day Four Score '} size={'text-lg lg:text-xl'} weight={'font-bold'} />
            <ScoreBoardSection size={'text-lg'} title={'Total daily score:'} value={dailyData.totalDailyScore.toLocaleString()} />
            <ScoreBoardSection title={'Ring upgrades: '} value={dailyData.score.ring.toLocaleString()} />
            <FormSubHeader title={'Speed-up score'} size={'text-lg lg:text-xl'} weight={'font-semibold'} />
            <div className='flex flex-row justify-between mb-1'>
              <ScoreBoardSection title={'Universal:'} value={dailyData.score.universal.toLocaleString()} />
              <ScoreBoardSection title={'Building:'} value={dailyData.score.building.toLocaleString()} />
              <ScoreBoardSection title={'Research:'} value={dailyData.score.research.toLocaleString()} />
            </div>
            <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_FOUR} />
          </div>
        </div>
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
  )
}

export default DayFour

/**

TODO:
place medals, scrolls and blueprints on rows for sm and above
maybe use sub header to shorten the 


Speed up: 
1m building = 30
1m research = 30

Craft: 
Fine craft 1x = 2000
1x copper sand = 400
1x silver sand = 1000
1x fine gold = 3000
1x meteor steel = 20000



Input: 
Speed ups available, in days, hours and minutes 
Number of hammers stored
Amount of sand and gold available 
    For more in-depth calculation, levels on rings to be upgraded 


Feb 17 start:
1st: 14740460
10th: 5250520

Feb 10 start: 
1st: 19,9kk 
10th: 5,8kk

 */