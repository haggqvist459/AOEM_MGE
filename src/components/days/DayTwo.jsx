import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayTwo, resetStateDayTwo } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader, FormSubHeader, SpeedupSelector } from '../form'
import { DAY_KEYS } from '../../utils'


const DayTwo = () => {

  const dispatch = useDispatch();
  const dayTwoData = useSelector((state) => state.dayTwo);

  const handleInput = (field, value) => {
    dispatch(updateField({day: DAY_KEYS.DAY_TWO, field, value }))
  }

  const handleSpeedupInput = ( field, value ) => {
    dispatch(updateSpeedup({day:  DAY_KEYS.DAY_TWO, field, value}))
  }

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
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Epic medals: '}
                  placeholder={'0'}
                  value={dayTwoData.epicMedals}
                  id={'epicMedals'}
                  onChange={(value) => handleInput('epicMedals', value)}
                />
                <FormField
                  labelValue={'Legendary medals: '}
                  placeholder={'0'}
                  value={dayTwoData.legendaryMedals}
                  id={'legendaryMedals'}
                  onChange={(value) => handleInput('legendaryMedals', value)}
                />
              </div>
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Epic skill scrolls: '}
                  placeholder={'0'}
                  value={dayTwoData.epicScrolls}
                  id={'epicScrolls'}
                  onChange={(value) => handleInput('epicScrolls', value)}
                />
                <FormField
                  labelValue={'Legendary skill scrolls: '}
                  placeholder={'0'}
                  value={dayTwoData.legendaryScrolls}
                  id={'legendaryScrolls'}
                  onChange={(value) => handleInput('legendaryScrolls', value)}
                />
              </div>
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <div className='w-1/2'>
                  <FormField
                    labelValue={'Legendary blueprints: '}
                    placeholder={'0'}
                    value={dayTwoData.legendaryBlueprints}
                    id={'legendaryBlueprints'}
                    onChange={(value) => handleInput('legendaryBlueprints', value)}
                  />
                </div>
                <div className='w-1/2'>
                  <SpeedupSelector title={'Forging speed-up'} onChange={handleSpeedupInput} value={dayTwoData.forgingSpeedup ? Number(dayTwoData.forgingSpeedup) : 0} />
                </div>

              </div>
              <div className='px-1 sm:w-1/2'>
                <FormField
                  labelValue={'Time required to forge: '}
                  placeholder={'Enter amount in minutes'}
                  value={dayTwoData.forgingTime}
                  id={'forgingTime'}
                  onChange={(value) => handleInput('forgingTime', value)}
                />
              </div>
              <PreviousEventScore dayKey={DAY_KEYS.DAY_TWO} />
            </div>
            <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
              {/* Output */}
              <FormSubHeader title={'Day Two Score: '} />
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