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
            <FormSubHeader title={text} colour='text-blue-50' className={'hover:text-blue-50'} />
        </NavLink>
    ))


    return (
        <div className='relative overflow-hidden transition-all duration-500 ease-in-out' style={{ height: isExpanded ? '36px' : '0px' }}>
            <div className={`flex flex-row items-center pl-3 justify-start md:justify-center overflow-x-auto whitespace-nowrap scroll-smooth flex-nowrap snap-x snap-mandatory gap-x-4 w-full md:w-1/2 xl:w-1/3 md:mx-auto transition-transform duration-500 ease-in-out
            ${isExpanded ? "translate-y-0 " : "-translate-y-full "}`}>
                {menuItems}
            </div>
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-blue-950/80 to-transparent block md:block"></div>
            <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-blue-950/80 to-transparent block md:block"></div>

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