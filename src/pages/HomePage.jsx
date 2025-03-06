import React, { useState, useEffect } from 'react'
import { DayOne, DayTwo, DayThree, DayFour, DayFive, DaySix, DaySeven } from '../components/days'

const HomePage = () => {

  const [activeDay, setActiveDay] = useState(1);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDay]);

  const conditionalRenderedDay = () => {
    switch (activeDay) {
      case 1: return <DayOne activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 2: return <DayTwo  activeDay={activeDay} setActiveDay={setActiveDay}/>;
      case 3: return <DayThree activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 4: return <DayFour activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 5: return <DayFive activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 6: return <DaySix activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 7: return <DaySeven activeDay={activeDay} setActiveDay={setActiveDay} />;
      default: return <DayOne activeDay={activeDay} setActiveDay={setActiveDay} />;
    }
  }

  return (
    <div>
      {conditionalRenderedDay()}
    </div>
  )
}

export default HomePage