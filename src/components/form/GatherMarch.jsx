import React from 'react'
import { FormField } from '../form'

const GatherMarch = ({ march, marchIndex, title, onChange }) => {

    return (
        <div className='px-1 border-b border-neutral-400 pb-1 mb-2'>
            <h5 className='font-bold text-xl text-blue-900'>{title}</h5>
            <div className='flex flex-col sm:flex-row space-x-1 text-sm'>
                {/* Gather march */}
                <FormField
                    labelValue={'Speed bonus'}
                    placeholder={'%'}
                    value={march.gatherSpeed}
                    id={`march-${marchIndex}-gatherSpeed`}
                    onChange={(e) => onChange(marchIndex, 'gatherSpeed', e.target.value)}
                />
                <FormField
                    labelValue={'Load capacity'}
                    placeholder={'0'}
                    value={march.loadCapacity}
                    id={`march-${marchIndex}-loadCapacity`}
                    onChange={(e) => onChange(marchIndex, 'loadCapacity', e.target.value)}
                />
                <FormField
                    labelValue={'Load Bonus'}
                    placeholder={'%'}
                    value={march.loadCapacity}
                    id={`march-${marchIndex}-loadBonus`}
                    onChange={(e) => onChange(marchIndex, 'loadBonus', e.target.value)}
                />
            </div>
        </div>
    )
}

export default GatherMarch 
