import React, { useState, } from 'react';
import { TROOP_TIER_MULTIPLIERS } from '../utils';
import { FormSubHeader, FormWrapper, FormDropdown, FormInput, ExpandableHeader, ExpandableSection } from '../components';

const TroopType = ({ troopData, troopType, onChange, onBlur, handleInstantDispatch }) => {

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='border-b border-neutral-400 mb-2'>
      <ExpandableHeader isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(!isExpanded)} title={troopType} sizeClass={'subheader-md'} />
      <ExpandableSection isExpanded={isExpanded}>
        <FormWrapper>
          <FormDropdown
            title={'Base tier:'}
            options={TROOP_TIER_MULTIPLIERS}
            id={`${troopType}-baseTier`}
            value={troopData.baseTier}
            onChange={(newValue) => handleInstantDispatch('baseTier', newValue, troopType)}
          />
          <FormDropdown
            title={'Target tier:'}
            options={TROOP_TIER_MULTIPLIERS}
            id={`${troopType}-targetTier`}
            value={troopData.targetTier}
            onChange={(newValue) => handleInstantDispatch('targetTier', newValue, troopType)}
          />
        </FormWrapper>
        <FormSubHeader title={'Promotion time:'} />
        <FormWrapper>
          <FormInput
            id={`${troopType}-trainingTimeDay`}
            placeholder={'days'}
            value={troopData.trainingTime.days}
            onChange={(value) => onChange('trainingTime', value, troopType, 'days')}
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
        <FormWrapper>
          <FormInput
            title={'Troops per batch:'}
            id={`${troopType}-promotedTroopsPerBatch`}
            placeholder={'0'}
            value={troopData.promotedTroopsPerBatch}
            onChange={(newValue) => onChange('promotedTroopsPerBatch', newValue, troopType)}
            onBlur={() => onBlur('promotedTroopsPerBatch', null, troopType)}
          />
          <FormInput
            title={'Available troops:'}
            id={`${troopType}-availableTroops`}
            placeholder={'0'}
            value={troopData.availableTroops}
            onChange={(newValue) => onChange('availableTroops', newValue, troopType)}
            onBlur={() => onBlur('availableTroops', null, troopType)}
          />
        </FormWrapper>
      </ExpandableSection>
    </div>
  )
}

export default TroopType