import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePreviousEventScore } from '../../redux/slices'
import { FormField, FormSubHeader } from '../form'


const PreviousEventScore = ({ dayKey }) => {

  const dispatch = useDispatch();
  const previousEventScore = useSelector((state) => state[dayKey].previousEventScore);

  const handleInput = (field, value) => {
    dispatch(updatePreviousEventScore({day: dayKey, field, value}));
  }

  return (
    <div className='my-2 px-1 '>
      <FormSubHeader title={'Previous event scores: '}/>
      <div className='flex flex-col sm:flex-row space-x-2'>
        <FormField
          labelValue={'1st place score: '}
          value={previousEventScore.topOne}
          placeholder={'0'}
          id='lastTopOne'
          onChange={(value) => { handleInput('topOne', value) }}
          required={false}
        />
        <FormField
          labelValue={'10th place score: '}
          value={previousEventScore.topTen}
          placeholder={'0'}
          id='lastTopTen'
          onChange={(value) => { handleInput('topTen', value) }}
          required={false}
        />
      </div>
    </div>
  )
}

export default PreviousEventScore