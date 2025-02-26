import React from 'react'

const TimeSelector = ({ title, value, onChange, showSeconds = true }) => {

  const handleChange = (unit, newValue) => {
    onChange({ ...value, [unit]: newValue })
  }

  return (
    <div className="flex flex-col mb-2">
      <label className="w-full text-sm font-semibold text-blue-900 my-1">{title}</label>
      <div className='flex flex-row space-x-1'>
        <input
          type='number'
          value={value.days}
          onChange={(e) => handleChange('days', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='day'
        />
        <input
          type='number'
          value={value.hours}
          onChange={(e) => handleChange('hours', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='hour'
        />
        <input
          type='number'
          value={value.minutes}
          onChange={(e) => handleChange('minutes', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='min'
        />
        {showSeconds &&
          <input
            type='number'
            value={value.seconds}
            onChange={(e) => handleChange('seconds', e.target.value)}
            className='w-full border rounded pl-1'
            placeholder='sec'
          />
        }
      </div>
    </div>
  );
}

export default TimeSelector