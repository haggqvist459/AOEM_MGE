import React, { useState, useEffect } from 'react'
import { DAY_TITLES } from '../utils';
import { DayOne, DayTwo, DayThree, DayFour, DayFive, DaySix, DaySeven } from '../components/days'

const HomePage = () => {

  const [activeDay, setActiveDay] = useState(1);

  const menuOptions = DAY_TITLES.map((title, index) => (
    <button key={index} onClick={() => setActiveDay(index + 1)} className='text-white font-semibold text-lg'>
      {title}
    </button>
  ))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDay]);

  const conditionalRenderedDay = () => {
    switch (activeDay) {
      case 1: return <DayOne activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 2: return <DayTwo activeDay={activeDay} setActiveDay={setActiveDay} />;
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
      <div className='w-full px-3 h-10 bg-blue-950 flex flex-row items-center justify-center gap-x-2'>
        <p className='text-white font-semibold min-w-max text-lg'>Jump to Day: </p>
        <div className='overflow-x-auto flex flex-row  whitespace-nowrap scroll-smooth snap-x snap-mandatory gap-x-5 '>
          {menuOptions}
        </div>
      </div>
      {conditionalRenderedDay()}
    </div>
  )
}

export default HomePage
