import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayThree, resetStateDayThree, updateMarchField, updateFieldDayThree } from '../../redux/slices'
import { DayContainer, PreviousEventScore, FormButtons, FormHeader, GatherMarch } from '../../components'
import { DAY_KEYS } from '../../utils'

const DayThree = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayThree)
  const [localState, setLocalState] = useState(dailyData);

  const handleInput = (field, value) => {
    dispatch(updateField({ day: DAY_KEYS.DAY_THREE, field, value }))
  }

  const handleMarchInput = (index, field, value) => {
    console.log("handleMarchInput values, index: ", index, ', field: ', field, ', value: ', value)
    dispatch(updateMarchField({ index, field, value }))
  }

  const cancelForm = () => {
    dispatch(resetStateDayThree())
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayThree())
  }

  return (
    <DayContainer>
      <FormHeader title={'Day Three'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
            {/* Input */}
            {dailyData.marches.map((march, index) => (
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
          <div className='w-full md:w-1/2'>
            {/* Output */}
          </div>
        </div>
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
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

Feb 17 start:
1st: 1595000
10th: 1299220

Feb 10 start:
Top 1 score 1,8kk, 
Top 10 score 1,1kk


 */ 