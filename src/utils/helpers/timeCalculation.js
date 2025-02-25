

// convert the state into seconds for score calculation
export const convertToSeconds = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
    return (Number(days) * 86400) + (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
};

// convert back to properly display remaining values in UI. 
export const convertFromSeconds = (totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
};
