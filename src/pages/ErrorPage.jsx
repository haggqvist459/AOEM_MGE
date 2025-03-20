import React from 'react'
import { FormSubHeader } from '../components'

const ErrorPage = () => {
  return (
    <section className='container bg-neutral-300 mx-auto lg:w-3/5 w-11/12 pt-5 my-5 border shadow-md rounded-md'>
      <div className='flex flex-col items-center mb-5 px-2'>
        <FormSubHeader title={'Error Page!'} sizeClass='subheader-lg'/>
        <p>Looks like you have encountered an error.</p>
        <p className='text-center'>Press the text in the header to return to home page.</p>
      </div>
    </section>
  )
}

export default ErrorPage