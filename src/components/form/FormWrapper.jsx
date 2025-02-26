import React from 'react'

const FormWrapper = ({ children, className='', flex='col'}) => {
  return (
    <div className={`flex flex-${flex} w-full ${className}`}>{children}</div>
  )
}

export default FormWrapper


