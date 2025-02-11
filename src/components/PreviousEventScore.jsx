import React from 'react'

const PreviousEventScore = () => {
  return (
    <div>
      <h5 className='font-bold text-xl my-2 text-amber-600'>Previous event scores: </h5>
      <FormField
        labelValue={'Last event 1st place score: '}
        value={previousEventScore.topOne}
        id='lastTopOne'
        onChange={(value) => { handlePreviousEventScoreChanges('topOne', value) }}
      />
      <FormField
        labelValue={'Last event 10th place score: '}
        value={previousEventScore.topOne}
        id='lastTopTen'
        onChange={(value) => { handlePreviousEventScoreChanges('topOne', value) }}
      /></div>
  )
}   

export default PreviousEventScore