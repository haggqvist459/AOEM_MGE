import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFieldDayOne, calculateDailyScoreDayOne, resetStateDayOne } from '../../redux/slices'
import { TRIBE_LEVEL_MULTIPLIERS, DAY_KEYS } from '../../utils'
import { FormButtons, FormHeader, FormSubHeader, FormInput, FormWrapper, PreviousEventScore, PreviousEventScoreBoard, ScoreBoardSection } from '../form'


const DayOne = () => {


  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayOne);

  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);

  const handleInput = (field, value) => {
    // console.log('DayOne.jsx handleInput triggered, field: ', field, ' value: ', value );
    dispatch(updateFieldDayOne({ field, value }))
  }

  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    dispatch(updateFieldDayOne({ field, value: localState[field] }));
  };

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
          {/* On smaller breakpoints, display everything in one column. */}
          <div className='flex flex-col md:flex-row md:pr-2'>
            <div className='w-full md:w-1/2 relative  md:border-r border-neutral-400 md:pr-2'>
              {/* Dropdown */}
              <label htmlFor='tribeLevel' className='block font-bold text-blue-900 mt-2'>Select Tribe Level:</label>
              <div className='relative w-full'>
                <select
                  id="tribeLevel"
                  className='w-full mt-1 px-1 border border-neutral-300 rounded-md shadow-sm appearance-none'
                  value={dailyData.tribeLevelMultiplier}
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
              {/* Stamina  */}
              <FormSubHeader title={'Available stamina:'} />
              <FormInput
                id={'stamina'}
                placeholder={'include daily and villager boosts'}
                value={localState.stamina}
                onChange={(value) => handleLocalChange('stamina', value)}
                onBlur={() => handleBlur('stamina')}
              />
              <PreviousEventScore dayKey={DAY_KEYS.DAY_ONE} />
            </div>
            <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
              {/* Output */}
              <FormSubHeader title={'Day One Score: '} />
              <div className='grid grid-cols-2 gap-2'>
                <ScoreBoardSection title={'Hunted tribes: '} value={dailyData.tribesHunted.toLocaleString()} />
                <ScoreBoardSection title={'Daily score: '} value={dailyData.totalDailyScore.toLocaleString()} />
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
