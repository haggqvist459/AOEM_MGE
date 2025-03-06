import React from 'react'

const ScoreBoardSection = ({ size='text-sm lg:text-lg', title, value, children, className }) => {
    return (
        <div className={`flex flex-col space-x-1 ${className}`}>
            <h3 className={`block font-semibold ${size} text-blue-900`}>{title}</h3>
            <div className='font-semibold text-sm lg:text-lg text-neutral-600 flex flex-row sm:space-x-1'>
                {children ? children : <p>{value}</p>}
            </div>
        </div>
    )
}

export default ScoreBoardSection

