import React, { useState } from 'react'
import { RESOURCE_FIELD_MAP } from '../../utils';
import { ExpandableHeader, ExpandableSection, FormSubHeader, FormInput, ToggleButton } from '../../components';
import { FormField } from '../../retired'


const GatherMarch = ({ march, marchId, title, onChange, onBlur, onDelete, handleInstantDispatch }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    

    return (
        <div className='pb-1 mb-1'>
            <ExpandableHeader title={title} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(!isExpanded)} />
            <ExpandableSection isExpanded={isExpanded}>
                {/* load bonus & load capacity, number of turns */}
                <FormSubHeader title={'Rename march:'}/>
                <FormInput 
                    id={`March-${marchId}-marchName`}
                    type={'text'}
                    placeholder={'e.g. Harald III'}
                    value={march.marchName}
                    onChange={(newValue) => onChange(marchId, 'marchName', newValue)}
                    onBlur={() => onBlur(marchId, 'marchName')}
                />
                <div className='grid grid-cols-1 xs:grid-cols-2 gap-1'>
                    <div>
                        <FormSubHeader title={'Load capacity'} />
                        <FormInput
                            id={`March-${marchId}-loadCapacity`}
                            placeholder={'0'}
                            value={march.loadCapacity}
                            onChange={(newValue) => onChange(marchId, 'loadCapacity', newValue)}
                            onBlur={() => onBlur(marchId, 'loadCapacity')}
                        />
                    </div>
                    <div>
                        <FormSubHeader title={'Load bonus'} />
                        <FormInput
                            id={`March-${marchId}-loadBonus`}
                            placeholder={'0%'}
                            value={march.loadBonus}
                            onChange={(newValue) => onChange(marchId, 'loadBonus', newValue)}
                            onBlur={() => onBlur(marchId, 'loadBonus')}
                        />
                    </div>
                    <div>
                        <FormSubHeader title={'Completed turns'} />
                        <FormInput
                            id={`March-${marchId}-completedTurns`}
                            placeholder={'0'}
                            value={march.completedTurns}
                            onChange={(newValue) => onChange(marchId, 'completedTurns', newValue)}
                            onBlur={() => onBlur(marchId, 'completedTurns')}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col justify-around'>
                            <FormSubHeader title={'Full on reset'} />
                            <ToggleButton
                                isToggled={march.fullAtReset}

                                onChange={() => handleInstantDispatch('fullAtReset', !march.fullAtReset, marchId)}
                                onBlur={() => onBlur(marchId, 'fullAtReset')}
                            />
                        </div>
                        <button
                            onClick={() => onDelete(marchId)}
                            aria-label="Clear Form"
                            className="text-blue-900 hover:text-blue-50 self-end"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                </div>
            </ExpandableSection>
        </div>
    )
}

export default GatherMarch


/*
     
    setLocalState((prev) => ({
        ...prev,
        marches: prev.marches.map(march =>
            march.id === id ? { ...march, [field]: value } : march
        ),
    }));
<ToggleButton isToggled={march.fullAtReset} onToggle={() => onChange('fullAtReset', !march.fullAtReset)} />
*/


