import React, { useState, useEffect } from 'react'
import { POINTS_AND_MULTIPLIERS, TRIBE_LEVEL_MULTIPLIERS } from '../../utils'
import FormField from '../FormField'

const DayOne = () => {

  // Get the text labels from the tribe level object literal
  const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS);

  const [dayOneData, setDayOneData] = useState({
    'stamina': '',
  })

  const [dayOneScore, setDayOneScore] = useState({
    'totalScore': 0,
    'tribesHunted': 0
  })
  const [previousEventScore, setPreviousEventScore] = useState({
    'topOne': '',
    'topTen': '',
  })

  const handleDayOneFieldChanges = (field, value) => {
    // If the value is a string, clean non-numeric characters
    const cleanedValue = typeof value === "string" ? value.replace(/[^0-9]/g, "") : value;
    console.log(`Updating ${field} with:`, cleanedValue); // Debug log
    setDayOneData((prev) => ({ ...prev, [field]: Number(cleanedValue) }))
  }

  const handlePreviousEventScoreChanges = (field, value) => {
    // If the value is a string, clean non-numeric characters
    const cleanedValue = typeof value === "string" ? value.replace(/[^0-9]/g, "") : value;
    setPreviousEventScore((prev) => ({ ...prev, [field]: Number(cleanedValue) }))
  }

  // useEffect(() => {
  //   // load data from localstorage 

  // }, [])

  const calculateScore = () => {
    // divide available stamina with 5 to calculate number of tribes hunted

    console.log("calculateScore stamina: ", dayOneData.stamina, typeof dayOneData.stamina)
    console.log("calculateScore staminaCost: ", dayOneData.staminaCost, typeof dayOneData.staminaCost)

    const tribesHunted = dayOneData.stamina / dayOneData.staminaCost

    // multiply the tribe level multiplier with the number of tribes hunted 
    console.log("calculateScore tribesHunted: ", tribesHunted, typeof tribesHunted)
    console.log("calculateScore tribeLevelMultiplier: ", dayOneData.tribeLevelMultiplier, typeof dayOneData.tribeLevelMultiplier)
    const totalScore = dayOneData.tribeLevelMultiplier * tribesHunted;

    console.log("calculateScore totalScore: ", totalScore);

    // update the score state to properly display the points gained and tribes hunted 
    setDayOneScore((prev) => ({
      ...prev,
      totalScore: totalScore,
      tribesHunted: tribesHunted
    }));
  }

  const cancelForm = () => {
    // clear the form
    // reroute to home page or restart the input process? 

  }

  const submitForm = (e) => {
    e.preventDefault();
    // calculate the score for day one, 
    calculateScore();
    // divide stamina with stamina per tribe 


    // display the score somewhere 
    // compare the score potential to the previous event score 



  }
  // Need Input for stamina, tribe level selection & previous scores
  // Need UI for total score field 
  // 
  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <h1 className='text-2xl text-amber-600 text-center font-bold mb-5'>Day One</h1>
        </div>
        <form onSubmit={submitForm}>
          {/* Split section in half vertically, input on left and output on the right. */}
          {/* On phones and tablets in portrait mode, display everything in one column. */}
          <div className='flex flex-col md:flex-row md:pr-2'>
            <div className='w-full md:w-1/2 relative'>
              {/* Input needed: Available stamina, tribe level, previous event scores */}
              <label htmlFor='tribeLevel' className='block font-bold text-amber-600 mt-2'>Select Tribe Level:</label>
              <div className='relative w-full'>
                <select
                  id="tribeLevel"
                  className='w-full mt-1 px-1 border border-neutral-300 rounded-md shadow-sm appearance-none'
                  value={dayOneData.tribeLevelMultiplier}
                  // onChange={(e) => setSelectedDropdownOption(Number(e.target.value))} // ensure selected value remains a number 
                  onChange={(e) => handleDayOneFieldChanges('tribeLevelMultiplier', Number(e.target.value))}
                >
                  {dropdownOptions.map((level, index) => (
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
                onChange={(value) => { handleDayOneFieldChanges('stamina', value) }}
                required
              />
              <h5 className='font-bold text-xl my-2 text-amber-600'>Previous event scores: </h5>
              <FormField
                labelValue={'Last event 1st place score: '}
                value={previousEventScore.topOne}
                id='lastTopOne'
                placeholder={'0'}
                onChange={(value) => { handlePreviousEventScoreChanges('topOne', value) }}
              />
              <FormField
                labelValue={'Last event 10th place score: '}
                value={previousEventScore.topOne}
                id='lastTopTen'
                placeholder={'0'}
                onChange={(value) => { handlePreviousEventScoreChanges('topOne', value) }}
              />
            </div>
            <div className='w-full md:w-1/2 md:pl-2'>
              {/* Output */}
              {/* TODO: place each headline and value in rows */}
              <h5 className='block font-bold text-amber-600 mt-2'>Total number of tribes hunted:</h5>
              <p className='font-semibold mt-1 text-neutral-600'>{dayOneScore.tribesHunted.toLocaleString()}</p>
              <h5 className='font-bold my-1 text-amber-600'>Score potential day 1:</h5>
              <p className='font-semibold my-2 text-neutral-600'>{dayOneScore.totalScore.toLocaleString()}</p>
              <h5 className='font-bold text-xl mt-4 mb-2 text-amber-600'>Previous event scores: </h5>
              <h5 className='block font-bold text-amber-600 my-2'>Previous event 1st place score:</h5>
              <p className='font-semibold mt-2 mb-4 text-neutral-600'>{previousEventScore.topOne.toLocaleString()}</p>
              <h5 className='font-bold mt-2 mb-1 text-amber-600'>Previous event 10th place score:</h5>
              <p className='font-semibold mb-2 text-neutral-600'>{previousEventScore.topTen.toLocaleString()}</p>
            </div>
          </div>
          {/* buttons */}
          <div className='flex space-x-2 mb-5'>
            <button className='w-1/2 bg-neutral-400 hover:bg-neutral-500 rounded text-amber-700 font-bold' type='submit'>Submit</button>
            <button className='w-1/2 hover:bg-neutral-500 rounded border-2 border-bg-amber-700 text-amber-700 font-bold' type='button' onClick={() => cancelForm()}>Cancel</button>
          </div>
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


Top 1 score 144k 
Top 10 score 84,3k


*/