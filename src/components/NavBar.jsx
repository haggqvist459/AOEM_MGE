import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import { NavMenu, NavButton } from '../components'

const NavBar = () => {


    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <nav className='bg-blue-950'>
            <div className='flex flex-row items-center justify-between mx-auto max-w-full px-5 py-3 sm:px-3 md:px-7'>
                <NavLink
                    className='px-3 py-3 text-blue-50 hover:text-white font-bold'
                    to={ROUTES.HOME}>
                    <p className='text-lg md:text-xl m-0'>AoEM M.G.E </p>
                    <p className='text-sm md:text-lg m-0 text-right'>Calculator</p>
                </NavLink>
                <NavButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
            </div>
            <NavMenu isExpanded={isExpanded} />
        </nav>
    )
}

export default NavBar
