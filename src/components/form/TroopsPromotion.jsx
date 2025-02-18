import React from 'react'
import { TROOP_TIER_MULTIPLIERS } from '../../utils'
import { FormField } from '../form'

const TroopsPromotion = ({ troopType, troopData, onChange }) => {
    return (
        <div className='px-1 border-b border-neutral-400 pb-1 mb-2'>
            <h5 className='font-bold text-xl my-1 text-blue-900'>{troopType}</h5>
            <div className='flex flex-col sm:flex-row space-x-2'>
                {/* Base troop tier */}
                <div className='w-full'>
                    <label htmlFor={`${troopType}-baseTier`} className='block font-bold text-blue-900 mt-2'>Base Troop Tier:</label>
                    <div className='relative w-full'>
                        <select
                            id={`${troopType}-baseTier`}
                            className='w-full mt-1 px-1 border border-neutral-300 rounded-md shadow-sm appearance-none'
                            value={troopData.baseTier}
                            // onChange={(e) => setSelectedDropdownOption(Number(e.target.value))} // ensure selected value remains a number 
                            onChange={(e) => onChange(troopType, 'baseTier', e.target.value)}
                        >
                            {Object.keys(TROOP_TIER_MULTIPLIERS).map((level, index) => (
                                <option key={index} value={TROOP_TIER_MULTIPLIERS[level]}>
                                    {level}
                                </option>
                            ))}
                        </select>
                        <div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
                            <svg className='w-5 h-5 text-black' fill='none' stroke='black' strokeWidth='2' viewBox='0 0 24 24' >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Target troop tier */}
                <div className='w-full'>
                    <label htmlFor={`${troopType}-targetTier`} className='block font-bold text-blue-900 mt-2'>Target Troop Tier:</label>
                    <div className='relative w-full'>
                        <select
                            id={`${troopType}-targetTier`}
                            className='w-full mt-1 px-1 border border-neutral-300 rounded-md shadow-sm appearance-none'
                            value={troopData.targetTier}
                            onChange={(e) => onChange(troopType, 'targetTier', e.target.value)}
                        >
                            {Object.keys(TROOP_TIER_MULTIPLIERS).map((level, index) => (
                                <option key={index} value={TROOP_TIER_MULTIPLIERS[level]}>
                                    {level}
                                </option>
                            ))}
                        </select>
                        <div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
                            <svg className='w-5 h-5 text-black' fill='none' stroke='black' strokeWidth='2' viewBox='0 0 24 24' >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row mt-2 space-x-1'>
                    {/* Troops per batch: */}
                    {/* Troop training time:  */}
                    {/* Training speed-up:  */}
                    <FormField
                        labelValue={'Troops per batch:'}
                        placeholder={'0'}
                        value={troopData.promotedTroopPerBatch}
                        id={`${troopType}-promotedTroopPerBatch`}
                        onChange={(value) => onChange(troopType, 'promotedTroopPerBatch', value)}
                    />
                    <FormField
                        labelValue={'Training time:'}
                        placeholder={'Input in minutes'}
                        value={troopType.trainingTime}
                        id={`${troopType}-trainingTimePerBatch`}
                        onChange={(value) => onChange(troopType, 'trainingTime', value)}
                    />
                    <FormField
                        labelValue={'Available troops:'}
                        placeholder={'0'}
                        value={troopType.availableTroops}
                        id={`${troopType}-availableTroops`}
                        onChange={(value) => onChange(troopType, 'availableTroops', value)}
                    />
                </div>
        </div>
    )
}

export default TroopsPromotion  
