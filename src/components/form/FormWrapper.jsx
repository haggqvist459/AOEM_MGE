import React from 'react'

const FormWrapper = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col xs:flex-row xs:space-x-1 w-full mb-2 ${className}`}>
      {React.Children.map(children, (child) => (
        <div className="w-full">{child}</div>
      ))}
    </div>
  )
}

export default FormWrapper


