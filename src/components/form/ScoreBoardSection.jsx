import React from 'react'

const ScoreBoardSection = ({ title, value, children }) => {
    return (
        <div className='flex flex-row sm:flex-col space-x-1'>
            <h3 className='block font-semibold text-sm text-blue-900'>{title}</h3>
            <div className='font-semibold text-sm text-neutral-600 flex flex-col sm:flex-row sm:space-x-1'>
                {children ? children : <p>{value}</p>}
            </div>
        </div>
    )
}

export default ScoreBoardSection

