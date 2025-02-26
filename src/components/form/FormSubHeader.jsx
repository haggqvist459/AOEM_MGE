import React from 'react'

const FormSubHeader = ({ title, size='text-sm', weight='font-semibold'}) => {
  return (
    <h5 className={`${weight} ${size} text-blue-900 mt-1`}>{title}</h5>
  )
}

export default FormSubHeader
