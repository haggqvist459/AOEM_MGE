import React from 'react'

const FormButtons = ({ activeDay, setActiveDay }) => {

    return (
        <div className='flex space-x-4 mb-5 mt-2'>
            <button
                type='button'
                className='w-1/2  rounded border-2 text-blue-900 bg-neutral-400 font-semibold hover:bg-neutral-600 disabled:opacity-50 disabled:bg-neutral-500 disabled:hover:text-blue-900'
                onClick={() => setActiveDay(activeDay - 1)}
                disabled={activeDay === 1}
            >
                Previous
            </button>
            <button
                type='button'
                className='w-1/2 hover:border-2  bg-blue-950 rounded text-blue-50 font-semibold hover:border-blue-50 hover:bg-blue-900 disabled:opacity-50 disabled:hover:border-none'
                onClick={() => setActiveDay(activeDay + 1)}
                disabled={activeDay === 7}
            >
                Next
            </button>
        </div>
    )
}

export default FormButtons


// rework to handle daily navigation