import React, { useState, useEffect } from 'react'
import { DAY_KEYS, DAY_TITLES } from '../utils';
import { DayOne, DayTwo, DayThree, DayFour, DayFive, DaySix, DaySeven } from '../components/days'

const HomePage = () => {

  const [activeDay, setActiveDay] = useState(DAY_KEYS.DAY_ONE);

  const menuOptions = Object.values(DAY_KEYS).map((key) => (
    <button key={key} onClick={() => setActiveDay(key)} className='text-white font-semibold text-lg'>
      {DAY_TITLES[key]}
    </button>
  ))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDay]);

  const conditionalRenderedDay = () => {
    switch (activeDay) {
      case DAY_KEYS.DAY_ONE: return <DayOne activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_TWO: return <DayTwo activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_THREE: return <DayThree activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_FOUR: return <DayFour activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_FIVE: return <DayFive activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_SIX: return <DaySix activeDay={activeDay} setActiveDay={setActiveDay} />;
      case DAY_KEYS.DAY_SEVEN: return <DaySeven activeDay={activeDay} setActiveDay={setActiveDay} />;
      default: return <DayOne activeDay={activeDay} setActiveDay={setActiveDay} />;
    }
  }

  return (
    <div>
      <div className='relative w-full px-3 h-10 bg-blue-950 flex flex-row items-center justify-center gap-x-2'>
        <p className='text-white font-semibold min-w-max text-lg'>Jump to Day: </p>
        <div className='relative overflow-x-auto flex flex-row  whitespace-nowrap scroll-smooth snap-x snap-mandatory gap-x-5 '>
          {menuOptions}
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-blue-950/80 to-transparent md:hidden"></div>
      </div>
      {conditionalRenderedDay()}
    </div>
  )
}

export default HomePage
