import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAVBAR_OPTIONS } from '../utils'
import { FormSubHeader } from '../components'


const NavMenu = ({ isExpanded }) => {


    const linkClass = ({ isActive }) => isActive
        ? 'text-blue-50 underline decoration-2 hover:text-blue-50' //active link classes 
        : '' //inactive` link classes 


    const menuItems = Object.values(NAVBAR_OPTIONS).map(({ route, id, text }) => (
        <NavLink to={route} key={id} className={linkClass}>
            <FormSubHeader title={text} className={'text-blue-50 hover:text-blue-50'} />
        </NavLink>
    ))


    return (
        <div className='overflow-hidden transition-all duration-500 ease-in-out' style={{ height: isExpanded ? '36px' : '0px' }}>
            <div className={`flex flex-row items-center justify-center overflow-x-auto whitespace-nowrap scroll-smooth flex-nowrap snap-x snap-mandatory px-5 gap-x-5 w-full md:w-1/2 xl:w-1/3 md:mx-auto  transition-transform duration-[600ms] ease-in-out
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