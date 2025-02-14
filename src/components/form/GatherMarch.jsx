import React from 'react'
import { FormField } from '../form'

const GatherMarch = ({ march, marchIndex, title, onChange }) => {

    return (
        <div>
            <h5 className='font-bold text-blue-900 px-1'>{title}</h5>
            <div className='flex flex-col sm:flex-row space-x-1 px-1'>
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
