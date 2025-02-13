import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFieldDayFour, calculateDailyScoreDayFour, resetStateDayFour } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader } from '../form'
import { DAY_KEYS } from '../../utils'

const DayFour = () => {

  const dispatch = useDispatch()
  const dayFourData = useSelector((state) => state.dayFour)

  const handleInput = (field, value) => {
    dispatch(updateFieldDayFour({ field, value }))
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
        <div className=''>
          <FormHeader title={'Day Four'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                <PreviousEventScore dayKey={DAY_KEYS.DAY_FOUR}/>
              </div>
              <div className='w-full md:w-1/2 relative'>
                {/* Output */}
              </div>
            </div>
            <FormButtons onSubmit={submitForm} onCancel={cancelForm} />
          </form>
        </div>
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


Top 1 score 19,9kk 
Top 10 score 5,8kk

 */