import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, TROOP_POWER_MULTIPLIER } from '../../utils';
import { calculateDailyScoreDaySeven, resetStateDaySeven, updateFieldDaySeven } from '../../redux/slices';
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, FormInput,
  FormDropdown, PreviousEventScore, PreviousEventScoreBoard, ScoreBoardSection,
  ExpandableHeader, ExpandableSection, ScoreBoardWrapper, FormWrapper,
} from '../../components';

const DaySeven = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.daySeven);
  const [localState, setLocalState] = useState(dailyData);

  const [expandedSections, setExpandedSections] = useState({
    tribeHunting: false,
    scrollsMedals: false,
    rings: false,
    power: true,

  });

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);


  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form Dropdown
  const handleInstantDispatch = (field, value, unit=null) => {
      dispatch(updateFieldDaySeven({ field, unit, value }));
      dispatch(calculateDailyScoreDaySeven({ field, unit })); 
  }

  const handleLocalChange = (field, value, unit = null) => {
    console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }));
  };

  const handleBlur = (field, unit = null) => {
    const value = unit
      ? localState[field][unit]
      : localState[field];

    console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    dispatch(updateFieldDaySeven({ field, unit, value }));
    dispatch(calculateDailyScoreDaySeven({ field, unit }));
  };

  const cancelForm = () => {
    dispatch(resetStateDaySeven())
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Seven'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row md:pr-2'>
        <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          {/* Stamina */}
          <ExpandableHeader title={'Tribe Hunting'} isExpanded={expandedSections.tribeHunting} toggleExpansion={() => toggleSection('tribeHunting')} />
          <ExpandableSection isExpanded={expandedSections.tribeHunting}>
            <FormDropdown
              id={'tribeLevelMultiplier'}
              title={'Select tribe level:'}
              options={TRIBE_LEVEL_MULTIPLIERS}
              value={localState.tribeLevelMultiplier}
              onChange={(newValue) => handleInstantDispatch('tribeLevelMultiplier', newValue)}
            />
            <FormWrapper>
              <FormSubHeader title={'Stamina'} />
              <FormInput
                id={'stamina'}
                placeholder={'include daily and villager boosts'}
                value={localState.stamina}
                onChange={(value) => handleLocalChange('stamina', value)}
                onBlur={() => handleBlur('stamina')}
              />
            </FormWrapper>
          </ExpandableSection>
          <ExpandableHeader title={'Medals & Scrolls'} isExpanded={expandedSections.scrollsMedals} toggleExpansion={() => toggleSection('scrollsMedals')} />
          <ExpandableSection isExpanded={expandedSections.scrollsMedals}>
            {/* Medals */}
            <FormWrapper className={'mb-2'}>
              <FormSubHeader title={'Medals: '} />
              <FormWrapper flex={'row'} className={'space-x-1'}>
                <FormWrapper>
                  <FormSubHeader title={'Legendary'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'legendaryMedals'}
                    placeholder={'0'}
                    value={localState.legendaryMedals}
                    onChange={(value) => handleLocalChange('legendaryMedals', value)}
                    onBlur={() => handleBlur('legendaryMedals')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Epic'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'epicMedals'}
                    placeholder={'0'}
                    value={localState.epicMedals}
                    onChange={(value) => handleLocalChange('epicMedals', value)}
                    onBlur={() => handleBlur('epicMedals')}
                  />
                </FormWrapper>
              </FormWrapper>
            </FormWrapper>
            {/* Scrolls */}
            <FormWrapper className='mb-2'>
              <FormSubHeader title={'Scrolls'} size={'text-lg md:text-xl'} />
              <FormWrapper flex={'row'} className='space-x-1'>
                <FormWrapper>
                  <FormSubHeader title={'Legendary:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'legendaryScrolls'}
                    placeholder={'0'}
                    value={localState.legendaryScrolls}
                    onChange={(value) => handleLocalChange('legendaryScrolls', value)}
                    onBlur={() => handleBlur('legendaryScrolls')}
                  />
                </FormWrapper>
                <FormWrapper>
                  <FormSubHeader title={'Epic:'} size='text-sm' weight='font-medium' />
                  <FormInput
                    id={'epicScrolls'}
                    placeholder={'0'}
                    value={localState.epicScrolls}
                    onChange={(value) => handleLocalChange('epicScrolls', value)}
                    onBlur={() => handleBlur('epicScrolls')}
                  />
                </FormWrapper>
              </FormWrapper>
            </FormWrapper>
          </ExpandableSection>
          {/* Rings */}
          <ExpandableHeader title={'Rings'} isExpanded={expandedSections.rings} toggleExpansion={() => toggleSection('rings')} />
          <ExpandableSection isExpanded={expandedSections.rings}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
              {/* Hammers */}
              <FormWrapper>
                <FormSubHeader title={'Planishing hammers:'} />
                <FormInput
                  id={'hammers'}
                  placeholder={'0'}
                  value={localState.hammers}
                  onChange={(value) => handleLocalChange('hammers', value)}
                  onBlur={() => handleBlur('hammers')}
                />
              </FormWrapper>
              {/* Fine gold */}
              <FormWrapper>
                <FormSubHeader title={'Fine gold:'} />
                <FormInput
                  id={'fineGold'}
                  placeholder={'0'}
                  value={localState.fineGold}
                  onChange={(value) => handleLocalChange('fineGold', value)}
                  onBlur={() => handleBlur('fineGold')}
                />
              </FormWrapper>
              {/* Silver sand */}
              <FormWrapper>
                <FormSubHeader title={'Silver Sand:'} />
                <FormInput
                  id={'silverSand'}
                  placeholder={'0'}
                  value={localState.silverSand}
                  onChange={(value) => handleLocalChange('silverSand', value)}
                  onBlur={() => handleBlur('silverSand')}
                />
              </FormWrapper>
              {/* Copper sand */}
              <FormWrapper>
                <FormSubHeader title={'Copper sand:'} />
                <FormInput
                  id={'copperSand'}
                  placeholder={'0'}
                  value={localState.copperSand}
                  onChange={(value) => handleLocalChange('copperSand', value)}
                  onBlur={() => handleBlur('copperSand')}
                />
              </FormWrapper>
            </div>
          </ExpandableSection>
          {/* Power gain */}
          <ExpandableHeader title={'Power Gain'} isExpanded={expandedSections.power} toggleExpansion={() => toggleSection('power')} />
          <ExpandableSection isExpanded={expandedSections.power}>
            {/* Research estimate */}
            <FormSubHeader title={'Research'} />
            <FormInput
              id={'researchPower'}
              placeholder={'0'}
              value={localState.researchPower}
              onChange={(newValue) => handleLocalChange('researchPower', newValue)}
              onBlur={() => handleBlur('researchPower')}
            />
            {/* Building estimates */}
            {/* 3x building queues */}
            <FormSubHeader title={'Building'} />
            <FormWrapper flex={'row'} className='space-x-1'>
              <FormInput
                id={'buildingPowerFirstQueue'}
                placeholder={'0'}
                value={localState.buildingPower.firstQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'firstQueue')}
                onBlur={() => handleBlur('buildingPower', 'firstQueue')}
              />
              <FormInput
                id={'buildingPowerSecondQueue'}
                placeholder={'0'}
                value={localState.buildingPower.secondQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'secondQueue')}
                onBlur={() => handleBlur('buildingPower', 'secondQueue')}
              />
              <FormInput
                id={'buildingPower'}
                placeholder={'0'}
                value={localState.buildingPower.thirdQueue}
                onChange={(newValue) => handleLocalChange('buildingPower', newValue, 'thirdQueue')}
                onBlur={() => handleBlur('buildingPower', 'thirdQueue')}
              />
            </FormWrapper>
            {/* Troop estimates */}
            {/* Troop tier dropdown + number input for amount of troops */}
            <FormSubHeader title={'Troops:'} />
            <FormWrapper flex={'row'} className={'space-x-1'}>
              <FormWrapper>
                <FormSubHeader title={'Expected trained: '} />
                <FormInput
                  id={'troopsTrainedTotal'}
                  placeholder={'0'}
                  value={localState.troopPower.troopsTrainedTotal}
                  onChange={(newValue) => handleLocalChange('troopPower', newValue, 'troopsTrainedTotal')}
                  onBlur={() => handleBlur('troopPower', 'troopsTrainedTotal')}
                />
              </FormWrapper>
              <FormDropdown
                id={'troopTargetTier'}
                title={'Target tier:'}
                options={TROOP_POWER_MULTIPLIER}
                value={localState.troopPower.tier}
                onChange={(newValue) => handleInstantDispatch('troopPower', newValue, 'tier')}
              />
            </FormWrapper>
          </ExpandableSection>
          <PreviousEventScore dayKey={DAY_KEYS.DAY_SEVEN} />
        </div>
        <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
          {/* Output */}
          <FormSubHeader title={'Day Seven Score'} />
          <ScoreBoardSection title={'Daily score total: '} value={dailyData.totalDailyScore.toLocaleString()} />
          <ScoreBoardWrapper gridCols={'grid-cols-3'}>
            <ScoreBoardSection title={'Tribes: '} value={dailyData.score.tribes} />
            <ScoreBoardSection title={'Medals: '} value={dailyData.score.medals} />
            <ScoreBoardSection title={'Scrolls: '} value={dailyData.score.scrolls} />
            <ScoreBoardSection title={'Rings: '} value={dailyData.score.rings} />
            <ScoreBoardSection title={'Building: '} value={dailyData.score.building} />
            <ScoreBoardSection title={'Research: '} value={dailyData.score.research} />
            <ScoreBoardSection title={'Troops: '} value={dailyData.score.troops} />
            <ScoreBoardSection title={'Gathering: '} value={dailyData.score.gathering} />
            <ScoreBoardSection title={'Advent Spins: '} value={dailyData.score.adventSpins} />
          </ScoreBoardWrapper>
          <PreviousEventScoreBoard dayKey={DAY_KEYS.DAY_SEVEN} />
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer>
  )
}

export default DaySeven

/*

Defeat tribes, points:
lvl 1-4 = 50 
lvl 5-8 = 80 
lvl 9-12 = 100 
lvl 13-16 = 150
lvl 17-20 = 180 
lvl 21-24 = 220
lvl 25-28 = 260
lvl 29-30 = 300 

Gather 100 resources = 1 point

Legendary advent spin = 1000
    5x spins = 4200 empire coins
    1x spin = 900 coins

Craft: 
Fine craft 1x = 2000
1x copper sand = 400
1x silver sand = 1000
1x fine gold = 3000
1x meteor steel = 20000



Power increase
Citadel building 1x power = 3 
Research tech 1x power = 6
Unit training power = 3


Medals: 
Epic = 500
Legendary = 2500
   

Scrolls: 
Epic = 350
Legendary = 2000


Re-use the code from previous days to display last day increases
    Do not use stored values from consumable items likely used on previous days as default
    

*/