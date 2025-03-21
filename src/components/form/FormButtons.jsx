import React from 'react'
import { DAY_KEYS } from '../../utils'

const FormButtons = ({ activeDay, setActiveDay }) => {

    const dayKeysArray = Object.values(DAY_KEYS);
    const currentIndex = dayKeysArray.indexOf(activeDay);

    return (
        <div className='flex space-x-4 mb-5 mt-2'>
            <button
                type='button'
                className='w-1/2  rounded border-2 text-blue-900 bg-neutral-400 font-semibold hover:bg-neutral-600 disabled:opacity-50 disabled:bg-neutral-500 disabled:hover:text-blue-900'
                onClick={() => setActiveDay(dayKeysArray[currentIndex - 1])}
                disabled={currentIndex === 0}
            >
                Previous
            </button>
            <button
                type='button'
                className='w-1/2 hover:border-2  bg-blue-950 rounded text-blue-50 font-semibold hover:border-blue-50 hover:bg-blue-900 disabled:opacity-50 disabled:hover:border-none'
                onClick={() => setActiveDay(dayKeysArray[currentIndex + 1])}
                disabled={currentIndex === dayKeysArray.length - 1}
            >
                Next
            </button>
        </div>
    )
}

export default FormButtons

