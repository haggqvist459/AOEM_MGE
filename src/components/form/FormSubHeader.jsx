import React from 'react'

const FormSubHeader = ({ title, sizeClass='subheader', className='', colour='text-blue-900'}) => {
  
  return (
    <h5 className={`${colour} ${sizeClass} ${className}`}>{title}</h5>
  )
}

export default FormSubHeader
