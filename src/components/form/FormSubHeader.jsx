import React from 'react'

const FormSubHeader = ({ title, sizeClass='subheader', className='text-blue-900'}) => {
  
  return (
    <h5 className={`${sizeClass} ${className}`}>{title}</h5>
  )
}

export default FormSubHeader
