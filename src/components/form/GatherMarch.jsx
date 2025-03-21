import React, { useState } from 'react'
import { ExpandableHeader, ExpandableSection, FormSubHeader, FormInput, ToggleButton, Modal } from '../../components';



const GatherMarch = ({ march, marchId, title, onChange, onBlur, onDelete, handleInstantDispatch }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const confirmDelete = () => {
        onDelete(marchId)
        setShowModal(false);
    };

    return (
        <div className='pb-1 mb-1 border-b border-neutral-400'>
            <ExpandableHeader title={title} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(!isExpanded)} />
            <ExpandableSection isExpanded={isExpanded}>
                {/* load bonus & load capacity, number of turns */}
                <FormInput
                    title={'Rename march:'}
                    id={`March-${marchId}-marchName`}
                    type={'text'}
                    placeholder={'e.g. Harald III'}
                    value={march.marchName}
                    onChange={(newValue) => onChange('marchName', newValue, marchId)}
                    onBlur={() => onBlur('marchName', null, marchId)}
                />
                <div className='grid grid-cols-1 xs:grid-cols-2 gap-1'>
                    <FormInput
                        showInfo={true}
                        message={'Add each hero`s skill and talent based bonuses into one value'}
                        title={'Load bonus:'}
                        id={`March-${marchId}-loadBonus`}
                        placeholder={'0%'}
                        value={march.loadBonus}
                        onChange={(newValue) => onChange('loadBonus', newValue, marchId)}
                        onBlur={() => onBlur('loadBonus', null, marchId)}
                        allowDecimals={true}
                    />
                    <FormInput
                        title={'Load capacity:'}
                        id={`March-${marchId}-loadCapacity`}
                        placeholder={'0'}
                        value={march.loadCapacity}
                        onChange={(newValue) => onChange('loadCapacity', newValue, marchId)}
                        onBlur={() => onBlur('loadCapacity', null, marchId)}
                    />
                    <FormInput
                        title={'Completed turns:'}
                        id={`March-${marchId}-completedTurns`}
                        placeholder={'0'}
                        value={march.completedTurns}
                        onChange={(newValue) => onChange('completedTurns', newValue, marchId)}
                        onBlur={() => onBlur('completedTurns', null, marchId)}
                    />
                    <div className='flex justify-between'>
                        <div className='flex flex-col justify-around'>
                            <FormSubHeader title={'Full on day start'} />
                            <ToggleButton
                                isToggled={march.fullAtReset}
                                onChange={() => handleInstantDispatch('fullAtReset', !march.fullAtReset, marchId)}
                            />
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
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
            <Modal
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title="Delete March"
                description={`You are about to delete ${march.marchName}`}
            />
        </div>
    )
}

export default GatherMarch

