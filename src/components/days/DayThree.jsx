import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFieldDayThree, calculateDailyScoreDayThree, resetStateDayThree, updateMarchField } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader, GatherMarch } from '../form'
import { DAY_KEYS } from '../../utils'

const DayThree = () => {

  const dispatch = useDispatch();
  const dayThreeData = useSelector((state) => state.dayThree)

  const handleInput = (field, value) => {
    dispatch(updateFieldDayThree({ field, value }))
  }

  const handleMarchInput = (index, field, value) => {
    dispatch(updateMarchField(index, field, value))
  }
  const cancelForm = () => {
    dispatch(resetStateDayThree())
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayThree())
  }

  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <FormHeader title={'Day Three'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                {dayThreeData.marches.map((march, index) => (
                  <GatherMarch
                    key={index}
                    march={march}
                    marchIndex={index}
                    onChange={handleMarchInput}
                    title={`March ${index + 1}`}
                  />
                ))}
                <PreviousEventScore dayKey={DAY_KEYS.DAY_THREE} />
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

export default DayThree

/**
 
Gather 100 resources = 1 point

Legendary advent spin = 1000
    5x spins = 4200 empire coins
    1x spin = 900 coins


Input gather marches resource gather boosts, their load capacity and potential bonuses 
Input amount of empire coins available for spins 

Gather info: 
  Gather speed % 
  load capacity
  load bonus %



Display max available score based on gathering
    Include rich resources, and alliance resource center 
    Include full marches waiting to be deposited at reset

Top 1 score 1,8kk, 
Top 10 score 1,1kk


 */ 