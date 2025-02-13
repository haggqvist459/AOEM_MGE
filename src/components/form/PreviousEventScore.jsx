import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldDayOne, updateFieldDayTwo, updateFieldDayThree, updateFieldDayFour, updateFieldDayFive, updateFieldDaySix, updateFieldDaySeven } from '../../redux/slices'
import { FormField } from '../form'

const updateActions = {
  dayOne: updateFieldDayOne,
  dayTwo: updateFieldDayTwo,
  dayThree: updateFieldDayThree,
  dayFour: updateFieldDayFour,
  dayFive: updateFieldDayFive, 
  daySix: updateFieldDaySix,
  daySeven: updateFieldDaySeven
}

const PreviousEventScore = ({ dayKey }) => {

  const dispatch = useDispatch();
  const previousEventScore = useSelector((state) => state[dayKey].previousEventScore);

  const handleInput = ( field, value ) => {
    if (updateActions[dayKey]) {
      dispatch(updateActions[dayKey]({field, value}))
    }
  }

  return (
    <div className='my-2 px-1'>
      <h5 className='font-bold text-xl text-blue-900'>Previous event scores: </h5>
      <FormField
        labelValue={'Last event 1st place score: '}
        value={previousEventScore.topOne}
        placeholder={'0'}
        id='lastTopOne'
        onChange={(value) => { handleInput('topOne', value ) }}
        required={false}
      />
      <FormField
        labelValue={'Last event 10th place score: '}
        value={previousEventScore.topTen}
        placeholder={'0'}
        id='lastTopTen'
        onChange={(value) => { handleInput('topTen', value) }}
        required={false}
      />
    </div>
  )
}

export default PreviousEventScore