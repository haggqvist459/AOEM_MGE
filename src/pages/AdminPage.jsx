import React from 'react'
import { deleteData, exportLocalStorageToFile, importLocalStorageFromFile } from '../utils'
import { DayContainer, FormHeader, FormSubHeader } from '../components'

const AdminPage = () => {

  const handleInputButtonClick = () => {
    document.getElementById('inputBackup').click(); // Trigger the file input click
  };


  return (
    <DayContainer className={'text-center'}>
      <FormHeader title={'Data management'}  showTrash={false}/>
      <div className='flex flex-col md:flex-row space-x-5 justify-center'>
        {/* Export stuff */}
        <div className='w-full  md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-neutral-400 md:border-none'>
          <FormSubHeader size='text-lg lg:text-xl' title={'Export data'} />
          <p className='flex-grow'>To transfer all the data from one device to another, export it into a .txt file first. </p>
          <button
            type='button'
            className='w-1/2  mt-4 hover:border-2 hover:border-blue-900 bg-neutral-400 hover:bg-neutral-500 rounded text-blue-900 font-bold'
            onClick={() => exportLocalStorageToFile()}
          >
            Export
          </button>
        </div>
        {/* Import stuff */}
        <div className='w-full md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-neutral-400 md:border-none'>
          <FormSubHeader size='text-lg lg:text-xl' title={'Import data'} />
          <p className='flex-grow'>If you have a .txt file exported from this page, from another device, import it here.</p>
          <input
            id='inputBackup'
            type='file'
            accept='.txt'
            style={{ display: 'none' }}
            onChange={(e) => importLocalStorageFromFile(e)}
          />
          <button
            id='inputBackup'
            type='button'
            className='w-1/2 mt-4 hover:border-2 hover:border-blue-900 bg-neutral-400 hover:bg-neutral-500 rounded text-blue-900 font-bold'
            onClick={handleInputButtonClick}>Import</button>
        </div>
      </div>
      <div className='w-full md:w-1/3 mx-auto'>
        {/* Import stuff */}
        <div className='flex flex-col items-center border-b border-neutral-400 md:border-none mb-5 pb-3'>
          <FormSubHeader size='text-lg lg:text-xl' title={'Delete data'} />
          <p>Delete all calculator data, and all previous event score data. </p>
          <button
            type='button'
            className='w-1/2 mt-4 hover:border-2 hover:border-blue-900 bg-neutral-400 hover:bg-neutral-500 rounded text-blue-900 font-bold'
            onClick={() => deleteData()}
          >
            Delete
          </button>
        </div>
      </div>
    </DayContainer>
  )
}

export default AdminPage