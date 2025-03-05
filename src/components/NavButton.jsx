import React from 'react'

const NavButton = ({ isExpanded, onClick }) => {

    return (
        <div className='w-10 flex flex-col items-center justify-between gap-2 ' onClick={onClick}>
            
            <div className={`w-full h-1 bg-blue-50 rounded-sm transition-all duration-500 ease-in-out
                ${isExpanded ? "-rotate-[33deg] scale-110 origin-right " : "rotate-0 origin-right"}`}>
            </div>
    
            
            <div className={`w-full h-1 bg-blue-50 rounded-sm transition-all duration-500 ease-in-out
                ${isExpanded ? "opacity-0" : "opacity-100"}`}>
            </div>
    
            
            <div className={`w-full h-1 bg-blue-50 rounded-sm transition-all duration-500 ease-in-out
                ${isExpanded ? "rotate-[33deg] scale-110  origin-right " : "rotate-0 origin-right"}`}>
            </div>
    
        </div>
    )
}

export default NavButton

// second implementation
// return (
//     <div 
//         className="w-10 h-10 flex items-center justify-center relative cursor-pointer" 
//         onClick={onClick}
//     >
//         {/* Top Bar */}
//         <div className={`absolute w-full h-1 bg-blue-50 rounded-sm transition-all duration-300 ease-in-out 
//             ${isExpanded ? "opacity-0" : "top-[12%]"}`}>
//         </div>

//         {/* Middle Bar 1 (Rotates to form X) */}
//         <div className={`absolute w-full h-1 bg-blue-50 rounded-sm transition-all duration-300 ease-in-out 
//             ${isExpanded ? "rotate-45" : "top-[50%] -translate-y-1/2"}`}>
//         </div>

//         {/* Middle Bar 2 (Rotates to form X, overlaps Middle Bar 1) */}
//         <div className={`absolute w-full h-1 bg-blue-50 rounded-sm transition-all duration-300 ease-in-out 
//             ${isExpanded ? "-rotate-45" : "top-[50%] -translate-y-1/2"}`}>
//         </div>

//         {/* Bottom Bar */}
//         <div className={`absolute w-full h-1 bg-blue-50 rounded-sm transition-all duration-300 ease-in-out 
//             ${isExpanded ? "opacity-0" : "bottom-[12%]"}`}>
//         </div>
//     </div>
// );