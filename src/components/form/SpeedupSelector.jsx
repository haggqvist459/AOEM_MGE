import React from 'react'

const SpeedupSelector = ({value, onChange}) => {
    
    const days = Math.floor(value / 1400);
    const hours = Math.floor((value % 1400)/ 60 );
    const minutes = value % 60;

    const handleChange = (unit, newValue) => {
        let totalMinutes;
        if (unit === 'days') {

        } else if (unit === 'hours') {
            
        } else if (unit === 'minutes') {

        }
    }

    
    return (
    <div>SpeedupSelector</div>
  )
}

export default SpeedupSelector





// console.log('speedupSelector days: ', days);
// console.log('speedupSelector hours: ', hours);
// console.log('speedupSelector minutes: ', minutes);


    