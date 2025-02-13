import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFieldDayFive, calculateDailyScoreDayFive, resetStateDayFive } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader } from '../form'
import { DAY_KEYS } from '../../utils'

const DayFive = () => {

  const dispatch = useDispatch();
  const dayFiveData = useSelector((state) => state.dayFive)

  const handleInput = (field, value) => {
    dispatch(updateFieldDayFive({ field, value }))
  }

  const cancelForm = () => {
    dispatch(resetStateDayFive())
  }
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayFive());
  }


  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <FormHeader title={'Day Five'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                <PreviousEventScore dayKey={DAY_KEYS.DAY_FIVE} />
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

export default DayFive

/*

Troop training: 
1x lvl 1 = 2 
1x lvl 2 = 3 
1x lvl 3 = 5
1x lvl 4 = 10 
1x lvl 5 = 20
1x lvl 6 = 50
1x lvl 7 = 100
Promote units based on level gap = 1 point per level 


Input: 
    Available T1 troops to promote and to which level it will be promoted 
    
Top 1 score 52,5kk
Top 10 score 11,2kk 

*/