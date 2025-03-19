import React from 'react'
import { useSelector } from 'react-redux'
import { FormSubHeader } from '../components/form';

const PreviousEventScoreBoard = ({ dayKey }) => {

    const previousEventScore = useSelector((state) => state[dayKey].previousEventScore);

    return (
        <div className=''>
            <FormSubHeader title={'Previous event scores'} sizeClass={'form-subheader-xl'}/>
            <div className='flex flex-col text-sm lg:text-lg'>
                <div className='flex flex-row mt-1 space-x-1'>
                    <FormSubHeader title={'1st place:'} sizeClass={'form-subheader-lg'} />
                    <p className='font-medium lg:font-semibold text-neutral-600'>{previousEventScore.first.toLocaleString()}</p>
                </div>
                <div className='flex flex-row mt-1 mb-1 space-x-1'>
                <FormSubHeader title={'10th place:'} sizeClass={'form-subheader-lg'}/>
                    <p className='font-medium lg:font-semibold text-neutral-600'>{previousEventScore.tenth.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PreviousEventScoreBoard
