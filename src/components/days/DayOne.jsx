import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayOne, resetStateDayOne, updateFieldDayOne } from '../../redux/slices'
import { TRIBE_LEVEL_MULTIPLIERS, DAY_KEYS } from '../../utils'
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, FormInput,
  FormDropdown, PreviousEventScore, PreviousEventScoreBoard, ScoreBoardSection
} from '../../components'

const DayOne = ({ activeDay, setActiveDay }) => {


  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayOne);

  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);

  //Dropdown dispatch
  const handleInstantDispatch = (field, value) => {
    console.log("handleInstantDispatch values, field: ", field, ", value: ", value);

      dispatch(updateFieldDayOne({ field, value }));
      dispatch(calculateDailyScoreDayOne());
  
  }

  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    dispatch(updateFieldDayOne({ field, value: localState[field] }));
    dispatch(calculateDailyScoreDayOne());
  };

  const cancelForm = () => {
    // clear the form
    // reroute to home page or restart the input process? 
    dispatch(resetStateDayOne())
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayOne());
  }

  return (
    <DayContainer>
      <FormHeader title={'Day One'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        {/* Split section in half vertically, input on left and output on the right. */}
        {/* On smaller breakpoints, display everything in one column. */}
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 relative  md:border-r border-neutral-400 md:pr-2'>
            {/* Dropdown */}
            <FormDropdown
              id={'tribeLevelMultiplier'}
              title={'Select tribe level:'}
              value={localState.tribeLevelMultiplier}
              options={TRIBE_LEVEL_MULTIPLIERS}
              onChange={(newValue) => handleInstantDispatch('tribeLevelMultiplier', newValue)}
            />
            {/* Stamina  */}
            <FormSubHeader title={'Available stamina:'} size='text-lg md:text-xl' weight='font-semibold' />
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
            <FormSubHeader title={'Day One Score'} size={'text-lg lg:text-xl'} weight={'font-bold'} />
            <div className='grid grid-cols-2 gap-2'>
              <ScoreBoardSection title={'Hunted tribes: '} value={dailyData.tribesHunted.toLocaleString()} />
              <ScoreBoardSection title={'Daily score: '} value={dailyData.totalDailyScore.toLocaleString()} />
            </div>
            <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_ONE} />
          </div>
        </div>
        {/* buttons */}
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
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


March 3 start:
1st: 173700
10th: 115500
Score: 133500 (4th) 

Feb 17 start:
Top 1 score: 323400
Top 10 score: 61500

Feb 10 start:
Top 1 score 144k
Top 10 score 84,3k


*/
