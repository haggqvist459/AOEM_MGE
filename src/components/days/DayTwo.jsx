import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayTwo, resetStateDayTwo, updateFieldDayTwo } from '../../redux/slices'
import { FormWrapper, FormButtons, FormHeader, FormSubHeader, PreviousEventScore, PreviousEventScoreBoard, ScoreBoardSection, FormInput } from '../form'
import { DAY_KEYS } from '../../utils'


const DayTwo = () => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayTwo);
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);


  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    dispatch(updateFieldDayTwo({ field, value: localState[field] }));
  };

  const handleTimeChange = (field, unit, value) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: { ...prev[field], [unit]: value },
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayTwo());
  }

  const cancelForm = () => {
    dispatch(resetStateDayTwo());
  }


  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <FormHeader title={'Day Two'} />
        <form onSubmit={submitForm}>
          <div className='flex flex-col md:flex-row md:pr-2'>
            <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
              {/* Input */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 px-1'>
                {/* Medals */}
                <FormWrapper>
                  <FormSubHeader title={'Epic medals:'} />
                  <FormInput
                    id={'epicMedals'}
                    placeholder={'0'}
                    value={localState.epicMedals}
                    onChange={(value) => handleLocalChange('epicMedals', value)}
                    onBlur={() => handleBlur('epicMedals')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Legendary medals:'} />
                  <FormInput
                    id={'legendaryMedals'}
                    placeholder={'0'}
                    value={localState.legendaryMedals}
                    onChange={(value) => handleLocalChange('legendaryMedals', value)}
                    onBlur={() => handleBlur('legendaryMedals')}
                  />
                </FormWrapper>
                {/* Scrolls */}
                <FormWrapper>
                  <FormSubHeader title={'Epic scrolls:'} />
                  <FormInput
                    id={'epicScrolls'}
                    placeholder={'0'}
                    value={localState.epicScrolls}
                    onChange={(value) => handleLocalChange(value)}
                    onBlur={() => handleBlur('epicScrolls')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Legendary scrolls:'} />
                  <FormInput
                    id={'legendaryScrolls'}
                    placeholder={'0'}
                    value={localState.legendaryScrolls}
                    onChange={(value) => handleLocalChange('legendaryScrolls', value)}
                    onBlur={() => handleBlur('legendaryScrolls')}
                  />
                </FormWrapper>
                {/* Blueprints */}
                <FormWrapper>
                  <FormSubHeader title={'Legendary blueprints:'} />
                  <FormInput
                    id={'legendaryBlueprints'}
                    placeholder={'0'}
                    value={localState.legendaryBlueprints}
                    onChange={(value) => handleLocalChange('legendaryBlueprints', value)}
                    onBlur={() => handleBlur('legendaryBlueprints')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Pre-forged blueprints:'} />
                  <FormInput
                    id={'preforgedBlueprints'}
                    placeholder={'0'}
                    value={localState.preforgedBlueprints}
                    onChange={(value) => handleLocalChange('preforgedBlueprints', value)}
                    onBlur={() => handleBlur('preforgedBlueprints')}
                  />
                </FormWrapper>
                {/* Time & Speed-up */}
                <FormWrapper>
                  <FormSubHeader title={'Forging time:'} />
                  <FormWrapper flex={'row'} className='space-x-1'>
                  <FormInput
                    id={'forgingTimeDay'}
                    placeholder={'day'}
                    value={localState.forgingTime.days}
                    onChange={(value) => handleTimeChange('forgingTime', 'days', value)}
                    onBlur={() => handleBlur('forgingTime')}
                  />
                  <FormInput
                    id={'forgingTimeHours'}
                    placeholder={'hour'}
                    value={localState.forgingTime.hours}
                    onChange={(value) => handleTimeChange('forgingTime', 'hours', value)}
                    onBlur={() => handleBlur('forgingTime')}
                  />
                  <FormInput
                    id={'forgingTimeMinutes'}
                    placeholder={'min'}
                    value={localState.forgingTime.minutes}
                    onChange={(value) => handleTimeChange('forgingTime', 'minutes', value)}
                    onBlur={() => handleBlur('forgingTime')}
                  />
                  <FormInput
                    id={'forgingTimeSeconds'}
                    placeholder={'sec'}
                    value={localState.forgingTime.seconds}
                    onChange={(value) => handleTimeChange('forgingTime', 'seconds', value)}
                    onBlur={() => handleBlur('forgingTime')}
                  />
                  </FormWrapper>
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Forging speed-up:'} />
                  <FormWrapper flex={'row'} className='space-x-1'>
                  <FormInput
                    id={'forgingSpeedupDay'}
                    placeholder={'day'}
                    value={localState.forgingSpeedup.days}
                    onChange={(value) => handleTimeChange('forgingSpeedup', 'days', value)}
                    onBlur={() => handleBlur('forgingSpeedup')}
                  />
                  <FormInput
                    id={'forgingSpeedupHours'}
                    placeholder={'hour'}
                    value={localState.forgingSpeedup.hours}
                    onChange={(value) => handleTimeChange('forgingSpeedup', 'hours', value)}
                    onBlur={() => handleBlur('forgingSpeedup')}
                  />
                  <FormInput
                    id={'forgingSpeedupMinutes'}
                    placeholder={'min'}
                    value={localState.forgingSpeedup.minutes}
                    onChange={(value) => handleTimeChange('forgingSpeedup', 'minutes', value)}
                    onBlur={() => handleBlur('forgingSpeedup')}
                  />
                  </FormWrapper>
                </FormWrapper>
              </div>
              <PreviousEventScore dayKey={DAY_KEYS.DAY_TWO} />
            </div>
            <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
              {/* Output */}
              <FormSubHeader title={'Day Two Score: '} />
              <div className='grid grid-cols-2 gap-2 mt-1'>
                <ScoreBoardSection title={'Daily score total: '} value={dailyData.totalDailyScore.toLocaleString()} />
                <ScoreBoardSection title={'Forging score: '} value={dailyData.score.forging.toLocaleString()} />
                <ScoreBoardSection title={'Scroll score: '} value={dailyData.score.scrolls.toLocaleString()} />
                <ScoreBoardSection title={'Medal score: '} value={dailyData.score.medals.toLocaleString()} />
              </div>
              <FormSubHeader title={'Forging details: '} size='text-md' />
              <div className='grid grid-cols-2 gap-2 mt-1'>
                <ScoreBoardSection title={'Used blueprints: '} value={dailyData.completedBlueprints} />
                <ScoreBoardSection title={'Remaining blueprints: '} value={dailyData.remainingBlueprints} />
              </div>
              <ScoreBoardSection title={'Remaining speed-up: '}>
                <p>{dailyData.remainingForgingSpeedup.days} days,</p>
                <p>{dailyData.remainingForgingSpeedup.hours} hours, </p>
                <p>{dailyData.remainingForgingSpeedup.minutes} minutes</p>
              </ScoreBoardSection>
              <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_TWO} />
            </div>
          </div>
          <FormButtons onSubmit={submitForm} onCancel={cancelForm} />
        </form>
      </div>
    </section>
  )
}

export default DayTwo

/**
 
Hero growth: 

Gear: 
Rare = 1000
Epic = 5000
Legendary = 30000
    Forging time for speed up consumption
    Forge level

Medals: 
Epic = 500
Legendary = 2500
    Hero star ranks for intended heros co calculate possible combinations of medal use 

Scrolls: 
Epic = 350
Legendary = 2000
    Skill levels per skill 



At first: 
Input amount of legendary blueprints availabe
Input amount of speed up available 

Input number of medals available, both epic and legendary 
Input number of skill scrolls available, both epic and legendary

In-depth input for more detailed score calculation: 
    Input the star ranks and number of medals for each hero that will be upgraded
    Input the skill and level for each skill that will be upgraded 
    

Display amount of score available based on either blueprints or speed ups 
Display score potential based on skills and medals used 

Feb 17 start:
1st: 5742500
10th: 2429000 

Feb 10 start:
Top 1 score 5,3kk 
Top 10 score 2,9kk


 */