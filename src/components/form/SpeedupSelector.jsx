import React from 'react'

const SpeedupSelector = ({ title, value, onChange }) => {

  let days = Math.floor(value / 1440);
  let hours = Math.floor((value % 1440) / 60);
  let minutes = value % 60;
  // console.log(`${days} days, ${hours} hours, ${minutes} minutes`);

  const handleChange = (unit, newValue) => {
    let numValue = parseInt(newValue, 10);

    // Prevent updating Redux if the value is not a valid number
    if (isNaN(numValue) || numValue < 0) return;

    // Get current values (ensuring defaults)
    let updatedDays = days || 0;
    let updatedHours = hours || 0;
    let updatedMinutes = minutes || 0;

    if (unit === 'days') {
        updatedDays = numValue;
    } else if (unit === 'hours') {
        updatedHours = numValue;
    } else if (unit === 'minutes') {
        updatedMinutes = numValue;
    }

    // Recalculate total minutes
    const totalMinutes = (updatedDays * 1440) + (updatedHours * 60) + updatedMinutes;

    // Prevent sending redundant updates (only update if there's an actual change)
    if (totalMinutes !== value) {
        console.log(`🛠️ Updating Redux -> Key: ${unit}, Value: ${numValue}, Total Minutes: ${totalMinutes}`);
        onChange({ field: "forgingSpeedup", value: totalMinutes });
    }
};

  const handleChangeOld = (unit, newValue) => {
    newValue = Number(newValue);
    let totalMinutes;
    console.log(`🛠️ Updating Redux -> Key: ${unit}, Value: ${newValue}, Total Minutes: ${totalMinutes}`);
    if (unit === 'days') {
      totalMinutes = (newValue * 1440) + (hours * 60) + minutes
    } else if (unit === 'hours') {
      totalMinutes = (days * 1440) + (newValue * 60) + minutes;
    } else if (unit === 'minutes') {
      totalMinutes = (days * 1440) + (hours * 60) + newValue;
    }
    onChange(totalMinutes);
  }


  return (
    <div className="flex flex-col mb-2">
      <label className="w-full font-semibold text-blue-900 my-1">{title}</label>
      <div className='flex flex-row space-x-1'>
        <input
          value={days}
          onChange={(e) => handleChange('days', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='days'
        />
        <input
          value={hours}
          onChange={(e) => handleChange('hours', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='hours'
        />
        <input
          value={minutes}
          onChange={(e) => handleChange('minutes', e.target.value)}
          className='w-full border rounded pl-1'
          placeholder='min'
        />
      </div>
    </div>
  );
}

export default SpeedupSelector