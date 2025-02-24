import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayFour, resetStateDayFour } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader } from '../form'
import { DAY_KEYS } from '../../utils'

const DayFour = () => {

  const dispatch = useDispatch()
  const dayFourData = useSelector((state) => state.dayFour)

  const handleInput = (field, value) => {
    dispatch(updateField({day: DAY_KEYS.DAY_FOUR, field, value }))
  }

  const cancelForm = () => {
    dispatch(resetStateDayFour())
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(calculateDailyScoreDayFour())

  }

  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <FormHeader title={'Day Four'} />
        <form onSubmit={submitForm}>
          <div className='flex flex-col md:flex-row md:pr-2'>
            <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
              {/* Input */}
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Planishing hammers: '}
                  placeholder={'0'}
                  value={dayFourData.hammers}
                  id={'hammers'}
                  onChange={(value) => handleInput('hammers', value)}
                />
                <FormField
                  labelValue={'Fine gold: '}
                  placeholder={'0'}
                  value={dayFourData.fineGold}
                  id={'fineGold'}
                  onChange={(value) => handleInput('fineGold', value)}
                />
              </div>
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Silver sand: '}
                  placeholder={'0'}
                  value={dayFourData.silverSand}
                  id={'silverSand'}
                  onChange={(value) => handleInput('silverSand', value)}
                />
                <FormField
                  labelValue={'Copper sand: '}
                  placeholder={'0'}
                  value={dayFourData.copperSand}
                  id={'copperSand'}
                  onChange={(value) => handleInput('copperSand', value)}
                />
              </div>
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Meteor steel: '}
                  placeholder={'0'}
                  value={dayFourData.meteorSteel}
                  id={'meteorSteel'}
                  onChange={(value) => handleInput('meteorSteel', value)}
                />
                <FormField
                  labelValue={'Universal speed-up: '}
                  placeholder={'Input in minutes'}
                  value={dayFourData.universalSpeedup}
                  id={'universalSpeedup'}
                  onChange={(value) => handleInput('universalSpeedup', value)}
                />
              </div>
              <div className='flex flex-col sm:flex-row space-x-2 px-1'>
                <FormField
                  labelValue={'Building speed-up: '}
                  placeholder={'Input in minutes'}
                  value={dayFourData.buildingSpeedup}
                  id={'buildingSpeedup'}
                  onChange={(value) => handleInput('buildingSpeedup', value)}
                />
                <FormField
                  labelValue={'Research speed-up: '}
                  placeholder={'Input in minutes'}
                  value={dayFourData.researchSpeedup}
                  id={'researchSpeedup'}
                  onChange={(value) => handleInput('researchSpeedup', value)}
                />
              </div>
              <PreviousEventScore dayKey={DAY_KEYS.DAY_FOUR} />
            </div>
            <div className='w-full md:w-1/2 relative'>
              {/* Output */}
            </div>
          </div>
          <FormButtons onSubmit={submitForm} onCancel={cancelForm} />
        </form>
      </div>
    </section>
  )
}

export default DayFour

/**
 
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