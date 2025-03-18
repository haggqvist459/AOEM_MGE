import React, { useState, } from 'react';
import { TROOP_TIER_MULTIPLIERS } from '../utils';
import { FormSubHeader, FormWrapper, FormDropdown, FormInput } from '../components';

const TroopType = ({ troopData, troopType, onChange, onBlur, handleInstantDispatch}) => {

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='border-b border-neutral-400 mb-2 pb-2'>
      {/* Title and button to hide */}
      <div className='flex flex-row space-x-2'>
        <button
          type='button'
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
        >
          <FormSubHeader title={troopType} className={'text-md md:text-lg'} />
          {/* Triangle Icon */}
          <span className={`text-blue-900 inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
            ▶
          </span>
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-50 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}`}>
        {/* promotion Tier dropdown, time to train */}
        <FormWrapper className={'sm:flex-row space-x-1'}>
          <div className='w-full md:w-1/2'>
            <FormDropdown
              title={'Base tier:'}
              options={TROOP_TIER_MULTIPLIERS}
              id={`${troopType}-baseTier`}
              value={troopData.baseTier}
              onChange={(newValue) => handleInstantDispatch('baseTier', newValue, troopType)}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <FormDropdown
              title={'Target tier:'}
              options={TROOP_TIER_MULTIPLIERS}
              id={`${troopType}-targetTier`}
              value={troopData.targetTier}
              onChange={(newValue) => handleInstantDispatch('targetTier', newValue, troopType)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <FormSubHeader title={'Training time'} />
          <FormWrapper flex={'row'} className='space-x-2'>
            <FormInput
              id={`${troopType}-trainingTimeDay`}
              placeholder={'days'}
              value={troopData.trainingTime.days}
              onChange={(value) => onChange('trainingTime', value, troopType, 'days' )}
              onBlur={() => onBlur('trainingTime', 'days', troopType)}
            />
            <FormInput
              id={`${troopType}-trainingTimeHours`}
              placeholder={'hours'}
              value={troopData.trainingTime.hours}
              onChange={(value) => onChange('trainingTime', value, troopType, 'hours')}
              onBlur={() => onBlur('trainingTime', 'hours', troopType)}
            />
            <FormInput
              id={`${troopType}-trainingTimeMinutes`}
              placeholder={'minutes'}
              value={troopData.trainingTime.minutes}
              onChange={(value) => onChange('trainingTime', value, troopType, 'minutes')}
              onBlur={() => onBlur('trainingTime', 'minutes', troopType)}
            />
            <FormInput
              id={`${troopType}-trainingTimeSeconds`}
              placeholder={'seconds'}
              value={troopData.trainingTime.seconds}
              onChange={(value) => onChange('trainingTime', value, troopType, 'seconds')}
              onBlur={() => onBlur('trainingTime', 'seconds', troopType)}
            />
          </FormWrapper>
        </FormWrapper>
        <FormWrapper className={'sm:flex-row mt-1 space-x-1'}>
          <FormWrapper>
            <FormSubHeader title={'Troops per batch:'} />
            <FormInput
              id={`${troopType}-promotedTroopsPerBatch`}
              placeholder={'0'}
              value={troopData.promotedTroopsPerBatch}
              onChange={(newValue) => onChange('promotedTroopsPerBatch', newValue, troopType)}
              onBlur={() => onBlur('promotedTroopsPerBatch', null, troopType)}
            />
          </FormWrapper>
          <FormWrapper>
            <FormSubHeader title={'Available troops:'} />
            <FormInput
              id={`${troopType}-availableTroops`}
              placeholder={'0'}
              value={troopData.availableTroops}
              onChange={(newValue) => onChange('availableTroops', newValue, troopType)}
              onBlur={() => onBlur('availableTroops', null, troopType)}
            />
          </FormWrapper>
        </FormWrapper>
      </div>
    </div>
  )
}

export default TroopType