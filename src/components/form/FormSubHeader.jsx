import React from 'react'

const FormSubHeader = ({ title, className, weight='font-semibold lg:font-bold', size='text-sm sm:text-md lg:text-lg', text='text-blue-900' }) => {
  return (
    <h5 className={`${weight} ${size} ${className} ${text} mt-1`}>{title}</h5>
  )
}

export default FormSubHeader
