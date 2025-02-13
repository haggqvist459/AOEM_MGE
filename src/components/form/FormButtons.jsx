import React from 'react'

const FormButtons = ({ onSubmit, onCancel, isDisabled = false }) => {
    return (
        <div className='flex space-x-4 mb-5 mt-2'>
            <button
                type='button'
                className='w-1/2 hover:border-2 hover:border-blue-900 bg-neutral-400 hover:bg-neutral-500 rounded text-blue-900 font-bold'
                onClick={onSubmit}
                disabled={isDisabled}
            >
                Submit
            </button>
            <button
                type='button'
                className='w-1/2 hover:bg-neutral-500 rounded border-2 text-blue-900 font-bold'
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    )
}

export default FormButtons