import React from 'react'

const FormSubHeader = ({ title, className, weight='font-semibold lg:font-bold', size='text-sm sm:text-lg lg:text-xl', text='text-blue-900' }) => {
  return (
    <h5 className={`${weight} ${size} ${className} ${text}`}>{title}</h5>
  )
}

export default FormSubHeader
