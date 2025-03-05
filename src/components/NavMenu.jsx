import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAVBAR_OPTIONS } from '../utils'
import { FormSubHeader } from '../components'


const NavMenu = ({ isExpanded }) => {


    const linkClass = ({ isActive }) => isActive
        ? 'text-amber-500 underline decoration-2 hover:text-white' //active link classes 
        : '' //inactive` link classes 


    const menuItems = Object.values(NAVBAR_OPTIONS).map(({ route, id, text }) => (
        <NavLink to={route} key={id} className={linkClass}>
            <FormSubHeader title={text} weight={'font-medium'} size={'text-lg lg:text-xl'} text={'text-amber-500 hover:text-white'} />
        </NavLink>
    ))


    return (
        <div className='overflow-hidden transition-all duration-300 ease-in-out' style={{ height: isExpanded ? '36px' : '0px' }}>
            <div className={`px-10 md:px-72 lg:px-96 flex flex-row justify-between transition-transform duration-300 ease-in-out
            ${isExpanded ? "translate-y-0 " : "-translate-y-full "}`}>
                {menuItems}
            </div>
        </div>
    )
}

export default NavMenu


/** 
 
min-h-0
min-h-[50px]
NavLinks to: 
 - Home Page (day navigation)
 - Total Score Page
 - Previous Event Score
 - Admin Page
 - About Page



 */