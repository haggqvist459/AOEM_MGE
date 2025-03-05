import React from 'react'

const FormHeader = ({ title, className }) => {
  return (
    <h1 className={`text-2xl ${className} text-blue-900 text-center font-bold mb-5`}>{title}</h1>
  )
}

export default FormHeader