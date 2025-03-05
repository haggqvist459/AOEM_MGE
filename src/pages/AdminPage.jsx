import React from 'react'
import { deleteData, exportLocalStorageToFile, importLocalStorageFromFile } from '../utils'
import { DayContainer, FormHeader, FormSubHeader } from '../components'

const AdminPage = () => {
  return (
    <DayContainer className={'text-center'}>
      <FormHeader title={'Admin Stuff!'} />
      <div className='grid grid-cols-1 md:grid-cols-2 space-x-2'>
        <div className='flex flex-col items-center mb-5 pb-3 border-b border-neutral-400'>
          <FormSubHeader size='text-lg lg:text-xl' title={'Export data'} />
          <p>To transfer all the data from one device to another, export it into a .txt file first. </p>
          {/* Export stuff */}
        </div>
        <div className='flex flex-col items-center mb-5 pb-3 border-b border-neutral-400'>
          {/* Import stuff */}
          <FormSubHeader size='text-lg lg:text-xl' title={'Import data'} />
          <p>If you have a .txt file exported from this page, from another device, import it here.</p>
        </div>
      </div>
      <div className='mx-auto md:px-32'>
        {/* Import stuff */}
        <div className='flex flex-col items-center border-b border-neutral-400 mb-5 pb-3'>
          <FormSubHeader size='text-lg lg:text-xl' title={'Delete data'} />
          <p>If you want to clear the browser, click here. This will delete data from every single day, and all the total score data.</p>
        </div>
      </div>
    </DayContainer>
  )
}

export default AdminPage