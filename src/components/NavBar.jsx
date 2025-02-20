import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

const NavBar = () => {
    return (
        <nav className='bg-blue-950'>
            <div className='flex flex-row items-center mx-auto max-w-full px-5 py-3 sm:px-3 md:px-7'>
                <NavLink
                    className='px-3 py-3 text-amber-500 hover:text-gray-700 font-bold text-2xl'
                    to={ROUTES.HOME}
                >AoEM M.G.E. Calculator</NavLink>
            </div>
        </nav>
    )
}

export default NavBar
