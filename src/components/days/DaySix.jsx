import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFieldDaySix, calculateDailyScoreDaySix, resetStateDaySix } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader } from '../form'
import { DAY_KEYS } from '../../utils'

const DaySix = () => {

  const dispatch = useDispatch();
  const daySixData = useSelector((state) => state.daySix);

  const handleInput = (field, value) => {
    dispatch(updateFieldDaySix({ field, value }))
  }

  const cancelForm = () => {
    // clear the form
    // reroute to home page or restart the input process? 
    dispatch(resetStateDaySix());
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDaySix());
  }

  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <FormHeader title={'Day Six'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                <PreviousEventScore dayKey={DAY_KEYS.DAY_SIX} />
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

export default DaySix


/*

Power increase
Citadel building 1x power = 3 
Research texh 1x power = 6
Unit training power = 3

Input needed: 
Building, how much power increase it yields
Research, how much power increase it yields
Troop training total potential 




*/