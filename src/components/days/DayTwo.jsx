import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateDailyScoreDayTwo, resetStateDayTwo, updateFieldDayTwo } from '../../redux/slices';
import { DAY_KEYS } from '../../utils';
import {
  DayContainer, FormWrapper, FormButtons, FormHeader, FormSubHeader,
  PreviousEventScore, PreviousEventScoreBoard, ScoreBoardSection, FormInput
} from '../../components';


const DayTwo = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayTwo);
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);


  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };


  const handleTimeChange = (field, unit, value) => {
    console.log('Day Two handleTimeChange values, field: ', field, ', unit: ', unit, ', value: ', value)
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
    dispatch(updateFieldDayTwo({ field, unit, value }));
    dispatch(calculateDailyScoreDayTwo());
  };

  const cancelForm = () => {
    dispatch(resetStateDayTwo());
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Two'} onClick={cancelForm} />
      <form>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
            {/* Input */}

            {/* Medals */}
            <FormWrapper className='mb-4'>
              <FormSubHeader title={'Medals'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormWrapper>
                  <FormSubHeader title={'Legendary:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'legendaryMedals'}
                    placeholder={'0'}
                    value={localState.legendaryMedals}
                    onChange={(value) => handleLocalChange('legendaryMedals', value)}
                    onBlur={() => handleBlur('legendaryMedals')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Epic:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'epicMedals'}
                    placeholder={'0'}
                    value={localState.epicMedals}
                    onChange={(value) => handleLocalChange('epicMedals', value)}
                    onBlur={() => handleBlur('epicMedals')}
                  />
                </FormWrapper>
              </FormWrapper>
            </FormWrapper>

            {/* Scrolls make epic/legendary headers smaller */}
            <FormWrapper className='mb-4'>
              <FormSubHeader title={'Scrolls'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormWrapper>
                  <FormSubHeader title={'Legendary:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'legendaryScrolls'}
                    placeholder={'0'}
                    value={localState.legendaryScrolls}
                    onChange={(value) => handleLocalChange('legendaryScrolls', value)}
                    onBlur={() => handleBlur('legendaryScrolls')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Epic:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'epicScrolls'}
                    placeholder={'0'}
                    value={localState.epicScrolls}
                    onChange={(value) => handleLocalChange('epicScrolls', value)}
                    onBlur={() => handleBlur('epicScrolls')}
                  />
                </FormWrapper>
              </FormWrapper>
            </FormWrapper>


            {/* Blueprints */}
            <FormWrapper className='mb-4'>
              <FormSubHeader title={'Blueprints'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormWrapper>
                  <FormSubHeader title={'Legendary:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'legendaryBlueprints'}
                    placeholder={'0'}
                    value={localState.legendaryBlueprints}
                    onChange={(value) => handleLocalChange('legendaryBlueprints', value)}
                    onBlur={() => handleBlur('legendaryBlueprints')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Pre-forged:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'preforgedBlueprints'}
                    placeholder={'0'}
                    value={localState.preforgedBlueprints}
                    onChange={(value) => handleLocalChange('preforgedBlueprints', value)}
                    onBlur={() => handleBlur('preforgedBlueprints')}
                  />
                </FormWrapper>
              </FormWrapper>
            </FormWrapper>

            {/* Time & Speed-up */}
            <FormWrapper className='mb-4'>
              <FormSubHeader title={'Forging time:'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormInput
                  id={'forgingTimeDay'}
                  placeholder={'day'}
                  value={localState.forgingTime.days}
                  onChange={(value) => handleTimeChange('forgingTime', 'days', value)}
                  onBlur={() => handleBlur('forgingTime', 'days')}
                />
                <FormInput
                  id={'forgingTimeHours'}
                  placeholder={'hour'}
                  value={localState.forgingTime.hours}
                  onChange={(value) => handleTimeChange('forgingTime', 'hours', value)}
                  onBlur={() => handleBlur('forgingTime', 'hours')}
                />
                <FormInput
                  id={'forgingTimeMinutes'}
                  placeholder={'min'}
                  value={localState.forgingTime.minutes}
                  onChange={(value) => handleTimeChange('forgingTime', 'minutes', value)}
                  onBlur={() => handleBlur('forgingTime', 'minutes')}
                />
                <FormInput
                  id={'forgingTimeSeconds'}
                  placeholder={'sec'}
                  value={localState.forgingTime.seconds}
                  onChange={(value) => handleTimeChange('forgingTime', 'seconds', value)}
                  onBlur={() => handleBlur('forgingTime', 'seconds')}
                />
              </FormWrapper>
            </FormWrapper>
            <FormWrapper className='mb-4'>
              <FormSubHeader title={'Forging speed-up:'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormInput
                  id={'forgingSpeedupDay'}
                  placeholder={'day'}
                  value={localState.forgingSpeedup.days}
                  onChange={(value) => handleTimeChange('forgingSpeedup', 'days', value)}
                  onBlur={() => handleBlur('forgingSpeedup', 'days')}
                />
                <FormInput
                  id={'forgingSpeedupHours'}
                  placeholder={'hour'}
                  value={localState.forgingSpeedup.hours}
                  onChange={(value) => handleTimeChange('forgingSpeedup', 'hours', value)}
                  onBlur={() => handleBlur('forgingSpeedup', 'hours')}
                />
                <FormInput
                  id={'forgingSpeedupMinutes'}
                  placeholder={'min'}
                  value={localState.forgingSpeedup.minutes}
                  onChange={(value) => handleTimeChange('forgingSpeedup', 'minutes', value)}
                  onBlur={() => handleBlur('forgingSpeedup', 'minutes')}
                />
              </FormWrapper>
            </FormWrapper>

            <PreviousEventScore dayKey={DAY_KEYS.DAY_TWO} />
          </div>
          <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
            {/* Output */}
            <FormSubHeader title={'Day Two Score'} size={'text-lg lg:text-xl'} weight={'font-bold'} />
            <ScoreBoardSection title={'Daily score total: '} value={dailyData.totalDailyScore.toLocaleString()} />
            <div className='flex flex-row justify-between mb-1'>
              <ScoreBoardSection title={'Forging: '} value={dailyData.score.forging.toLocaleString()} />
              <ScoreBoardSection title={'Scrolls: '} value={dailyData.score.scrolls.toLocaleString()} />
              <ScoreBoardSection title={'Medals: '} value={dailyData.score.medals.toLocaleString()} />
            </div>
            <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_TWO} />
          </div>
        </div>
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
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


<FormSubHeader title={'Blueprints: '} size='text-md lg:text-lg' />
            <div className='flex flex-row space-x-5'>
              <ScoreBoardSection title={'Used: '} value={dailyData.completedBlueprints} />
              <ScoreBoardSection title={'Remaining: '} value={dailyData.remainingBlueprints} />
            </div>

 */