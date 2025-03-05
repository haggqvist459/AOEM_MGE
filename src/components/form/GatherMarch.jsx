import React, { useState } from 'react'
import { FormField } from '../../retired'


const GatherMarch = ({ march, marchIndex, title, onChange }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className='px-1 border-b border-neutral-400 pb-1 mb-1'>
            <div className='flex flex-row space-x-1'>
                <button
                    type='button'
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
                >
                    <h5 className='font-bold text-lg text-blue-900'>{title}</h5>
                    {/* Triangle Icon */}
                    <span className={`text-blue-900 inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
                        ▶
                    </span>
                </button>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-50 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"
                    }`}
            >
                <div className="flex flex-col xs:flex-row space-x-1 text-sm">
                    <FormField
                        labelValue={'Speed bonus'}
                        placeholder={'%'}
                        value={march.gatherSpeedBonus}
                        id={`march-${marchIndex}-gatherSpeed`}
                        onChange={(newValue) => onChange(marchIndex, 'gatherSpeedBonus', newValue)}
                    />
                    <FormField
                        labelValue={'Load capacity'}
                        placeholder={'0'}
                        value={march.loadCapacity}
                        id={`march-${marchIndex}-loadCapacity`}
                        onChange={(newValue) => onChange(marchIndex, 'loadCapacity', newValue)}
                    />
                    <FormField
                        labelValue={'Load Bonus'}
                        placeholder={'%'}
                        value={march.loadBonus}
                        id={`march-${marchIndex}-loadBonus`}
                        onChange={(newValue) => onChange(marchIndex, 'loadBonus', newValue)}
                    />
                </div>
            </div>
        </div>
    )
}

export default GatherMarch


/*



*/


