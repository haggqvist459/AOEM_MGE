import React from 'react'
import { FormSubHeader } from '../../components'

const FormDropdown = ({ onChange, title, options, id, value }) => {
  return (
    <div className='w-full'>
      <FormSubHeader title={title}/>
      <div className='relative w-full'>
        <select
          id={id}
          className='w-full px-1 text-sm lg:text-lg text-neutral-600 border border-neutral-600 rounded-md shadow-sm appearance-none'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {Object.keys(options).map((level) => (
            <option key={level} value={options[level]}>
              {level}
            </option>
          ))}
        </select>
        <div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
          <svg className='w-5 h-5 text-neutral-600' fill='none' stroke='black' strokeWidth='2' viewBox='0 0 24 24' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default FormDropdown