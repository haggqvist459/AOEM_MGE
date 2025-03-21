import React from 'react'
import { useSelector } from 'react-redux';
import { DAY_KEYS, DAY_TITLES } from '../utils';
import { FormHeader, FormSubHeader } from '../components'

const TotalScorePage = () => {

  const dailyScores = [];
  const previousEventScores = [];

  Object.keys(DAY_KEYS).forEach(key => {
    dailyScores.push({
      day: DAY_KEYS[key], 
      score: useSelector(state => state[DAY_KEYS[key]].totalDailyScore === '' ? 0 : state[DAY_KEYS[key]].totalDailyScore)
    });
  });

  
  Object.keys(DAY_KEYS).forEach(key => {
    previousEventScores.push({
      day: DAY_KEYS[key], 
      score: {
        first: useSelector(state => state[DAY_KEYS[key]].previousEventScore.first === '' ? 0 : state[DAY_KEYS[key]].previousEventScore.first),
        tenth: useSelector(state => state[DAY_KEYS[key]].previousEventScore.tenth === '' ? 0 : state[DAY_KEYS[key]].previousEventScore.tenth)
      }
    });
  });
  


  console.log('dailyScores:', dailyScores);
  console.log('previousEventScores:', previousEventScores);

  const totalDailyScore = dailyScores.reduce((acc, curr) => acc + curr.score, 0);
  const totalPreviousFirst = previousEventScores.reduce((acc, curr) => acc + curr.score.first, 0);
  const totalPreviousTenth = previousEventScores.reduce((acc, curr) => acc + curr.score.tenth, 0);


  return (
    <section className='container bg-neutral-300 mx-auto lg:w-3/5 w-11/12 pt-5 my-5 border shadow-md rounded-md'>
      <FormHeader title={'Total Score'} showTrash={false} />
      <div className='flex flex-col xs:flex-row mb-5'>
        {/* Daily scores */}
        <div className='w-full flex flex-col xs:w-1/2 xs:border-r border-neutral-400 xs:pr-2'>
          <FormSubHeader title={'Your score'} sizeClass='subheader-xl' className='text-end pr-2 mb-3' />
          <div className='p-2 mb-2 text-right'>
            <FormSubHeader title={'Total: '} sizeClass='subheader-md' />
            <p>{totalDailyScore.toLocaleString()}</p>
            <br />
            <br />
          </div>
          {dailyScores.map(({ day, score }) => (
            <div className='p-2 text-right' key={day}>
              <FormSubHeader title={DAY_TITLES[day]} sizeClass='subheader-md' />
              <p className='font-medium'>Daily score:</p>
              <p>{score.toLocaleString()}</p>
              <br />
              <br />
            </div>
          ))}
        </div>
        {/* Previous event scores */}
        <div className='w-full flex flex-col xs:w-1/2 xs:pl-2 border-t border-neutral-400 xs:border-0 mt-1 xs:mt-0'>
          <FormSubHeader title={'Previous Events'} sizeClass='subheader-lg' className='text-start pl-2 mb-3' />
          <div className='p-2 mb-2'>
            <FormSubHeader title={'1st place: '} sizeClass='subheader-md' />
            <p>{totalPreviousFirst.toLocaleString()}</p>
            <FormSubHeader title={'10th place: '} sizeClass='subheader-md' />
            <p>{totalPreviousTenth.toLocaleString()}</p>
          </div>

          {previousEventScores.map(({ day, score }) => (
            <div className='p-2' key={day}>
              <FormSubHeader title={DAY_TITLES[day]} sizeClass='subheader-md' />
              <p className='font-medium'>1st place:</p>
              <p>{score.first.toLocaleString()}</p>
              <p className='font-medium'>10th place:</p>
              <p>{score.tenth.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TotalScorePage

