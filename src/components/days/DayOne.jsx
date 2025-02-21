import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField, calculateDailyScoreDayOne, resetStateDayOne } from '../../redux/slices'
import { TRIBE_LEVEL_MULTIPLIERS, DAY_KEYS } from '../../utils'
import { FormField, PreviousEventScore, PreviousEventScoreBoard, FormButtons, FormHeader, FormSubHeader } from '../form'


const DayOne = () => {

  const dispatch = useDispatch();
  const dayOneData = useSelector((state) => state.dayOne);

  const handleInput = (field, value) => {
    dispatch(updateField({day: DAY_KEYS.DAY_ONE, field, value }))
  }

  const cancelForm = () => {
    // clear the form
    // reroute to home page or restart the input process? 
    dispatch(resetStateDayOne()) 
  }

  const submitForm = (e) => {
    e.preventDefault();
    // calculate the score for day one, 
    dispatch(calculateDailyScoreDayOne());

    // update localstorage?
    // navigate to next day? 
  }

  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <FormHeader title={'Day One'} />
        <form onSubmit={submitForm}>
          {/* Split section in half vertically, input on left and output on the right. */}
          {/* , display everything in one column. */}
          <div className='flex flex-col md:flex-row md:pr-2'>
            <div className='w-full md:w-1/2 relative  md:border-r border-neutral-400 md:pr-2'>
              {/* Input needed: Available stamina, tribe level, previous event scores */}
              <label htmlFor='tribeLevel' className='block font-bold text-blue-900 mt-2'>Select Tribe Level:</label>
              <div className='relative w-full'>
                <select
                  id="tribeLevel"
                  className='w-full mt-1 px-1 border border-neutral-300 rounded-md shadow-sm appearance-none'
                  value={dayOneData.tribeLevelMultiplier}
                  // onChange={(e) => setSelectedDropdownOption(Number(e.target.value))} // ensure selected value remains a number 
                  onChange={(e) => handleInput('tribeLevelMultiplier', e.target.value)}
                >
                  {Object.keys(TRIBE_LEVEL_MULTIPLIERS).map((level, index) => (
                    <option key={index} value={TRIBE_LEVEL_MULTIPLIERS[level]}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-black' fill='none' stroke='black' strokeWidth='2' viewBox='0 0 24 24' >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <FormField
                labelValue={'Available stamina: '}
                placeholder={"Include daily and villager boosts"}
                value={dayOneData.stamina}
                id={'stamina'}
                onChange={(value) => handleInput('stamina', value)}
                required
              />
              <PreviousEventScore dayKey={DAY_KEYS.DAY_ONE} />
            </div>
            <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
              {/* Output */}
              {/* TODO: place each headline and value in rows */}
              <FormSubHeader title={'Day One Score: '} />
              <div className='flex flex-row mt-1 mb-1 space-x-1'>
                <h3 className='block font-semibold text-blue-900'>Hunted tribes total: </h3>
                <p className='font-semibold text-neutral-600'>{dayOneData.tribesHunted.toLocaleString()}</p>
              </div>
              <div className='flex flex-row mt-1 mb-1 space-x-1'>
                <h3 className='block font-semibold text-blue-900'>Score potential: </h3>
                <p className='font-semibold text-neutral-600'>{dayOneData.totalDailyScore.toLocaleString()}</p>
              </div>
              <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_ONE} />
            </div>
          </div>
          {/* buttons */}
          <FormButtons onSubmit={submitForm} onCancel={cancelForm} />
        </form>
      </div>
    </section>
  )
}

export default DayOne

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

5 stamina per tribe
= 300 points per 5 stamina

Input amount of stamina available
Calculate score outcome based on tribes hunted
Display score


Feb 17 start:
Top 1 score: 323400
Top 10 score: 61500

Feb 10 start:
Top 1 score 144k
Top 10 score 84,3k


*/
