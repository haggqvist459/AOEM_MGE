import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField, calculateDailyScoreDaySeven, resetStateDaySeven } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader } from '../form'
import { DAY_KEYS } from '../../utils'

const DaySeven = () => {

  const dispatch = useDispatch();
  const daySevenData = useSelector((state) => state.daySeven);

  const handleInput = (field, value) => {
    dispatch(updateField({day: DAY_KEYS.DAY_SEVEN, field, value }))
  }

  const cancelForm = () => {
    // clear the form
    // reroute to home page or restart the input process? 
    dispatch(resetStateDaySeven())
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDaySeven())
  }

  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <FormHeader title={'Day Seven'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                <PreviousEventScore dayKey={DAY_KEYS.DAY_SEVEN} />
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

export default DaySeven

/*

Defeat tribes, points:
lvl 1-4 = 50 
lvl 5-8 = 80 
lvl 9-12 = 100 
lvl 13-16 = 150
lvl 17-20 = 180 
lvl 21-24 = 220
lvl 25-28 = 260
lvl 29-30 = 300 

Gather 100 resources = 1 point

Legendary advent spin = 1000
    5x spins = 4200 empire coins
    1x spin = 900 coins

Craft: 
Fine craft 1x = 2000
1x copper sand = 400
1x silver sand = 1000
1x fine gold = 3000
1x meteor steel = 20000



Power increase
Citadel building 1x power = 3 
Research texh 1x power = 6
Unit training power = 3


Medals: 
Epic = 500
Legendary = 2500
   

Scrolls: 
Epic = 350
Legendary = 2000


Re-use the code from previous days to display last day increases
    Do not use stored values from consumable items likely used on previous days as default
    

*/