import React from 'react'
import { FormSubHeader } from '../../components';

const ScoreBoardSection = ({ title, value, children, className, sizeClass }) => {
    return (
        <div className={`flex flex-col space-x-1 w-full ${className}`}>
            <FormSubHeader title={title} sizeClass={sizeClass}/>
            <div className='font-medium text-sm lg:text-lg text-neutral-600 flex flex-row sm:space-x-1'>
                {children ? children : <p>{value}</p>}
            </div>
        </div>
    )
}

export default ScoreBoardSection

