import React from 'react'

const FormSubHeader = ({ title, size='text-lg'}) => {
  return (
    <h5 className={`font-bold ${size} text-blue-900 mt-1`}>{title}</h5>
  )
}

export default FormSubHeader