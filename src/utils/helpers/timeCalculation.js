

// convert the state into seconds for score calculation
export const convertToSeconds = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
    // Convert empty strings to 0 before doing the calculation
    days = days === '' ? 0 : Number(days);
    hours = hours === '' ? 0 : Number(hours);
    minutes = minutes === '' ? 0 : Number(minutes);
    seconds = seconds === '' ? 0 : Number(seconds);
  
    return (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
  };

// convert back to properly display remaining values in UI. 
export const convertFromSeconds = (totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
};

// Converts time object (days, hours, minutes) to total minutes
export const convertToMinutes = (time) => {
    if (!time) return 0;

    const { days = 0, hours = 0, minutes = 0 } = time;

    return (Number(days) * 1440) + (Number(hours) * 60) + Number(minutes);
};

// Converts total minutes back into an object with days, hours, minutes
export const convertFromMinutes = (totalMinutes) => {
    if (isNaN(totalMinutes) || totalMinutes < 0) return { days: 0, hours: 0, minutes: 0 };

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    return { days, hours, minutes };
};