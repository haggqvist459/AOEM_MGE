import React from 'react'

const DayContainer = ({ children, className }) => {
  return (
    <section className={`container bg-neutral-300 mx-auto lg:w-3/4 w-11/12 pt-5 my-5 border shadow-md rounded-md ${className}`}>
      <div className='px-5'>
        {children}
      </div>
    </section>
  )
}

export default DayContainer