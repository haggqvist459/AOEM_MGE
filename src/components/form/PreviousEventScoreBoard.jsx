import React from 'react'
import { useSelector } from 'react-redux'
import { FormSubHeader } from '../form';

const PreviousEventScoreBoard = ({ dayKey }) => {

    const previousEventScore = useSelector((state) => state[dayKey].previousEventScore);

    return (
        <div className=''>
            <FormSubHeader title={'Previous event scores: '} />
            <div className='flex flex-col'>
                <div className='flex flex-row mt-1 space-x-1'>
                    <h3 className='block font-semibold text-blue-900'>1st place: </h3>
                    <p className='font-semibold text-neutral-600'>{previousEventScore.topOne.toLocaleString()}</p>
                </div>
                <div className='flex flex-row mt-1 mb-1 space-x-1'>
                    <h3 className='block font-semibold text-blue-900'>10th place: </h3>
                    <p className='font-semibold text-neutral-600'>{previousEventScore.topTen.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PreviousEventScoreBoard
