import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TROOP_TIER_MULTIPLIERS } from '../../utils';
import { calculateDailyScoreDayFive, resetStateDayFive, updateTroopField, updateFieldDayFive } from '../../redux/slices';
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, TroopType, FormInput, FormDropdown,
  ScoreBoardSection, ExpandableHeader, ExpandableSection,FormWrapper
} from '../../components';


const DayFive = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayFive)
  const [localState, setLocalState] = useState(dailyData);
  const [expandedSections, setExpandedSections] = useState({
    troopTraining: true,
    troopData: false,
  });

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };


  // Dropdown dispatch 
  const handleInstantDispatch = (field, value, troopType = null) => {
    console.log("handleInstantDispatch values, field: ", field, ", value: ", value, ' troopType: ', troopType);

    if (troopType) {
      dispatch(updateTroopField({ troopType, field, unit: null, value }))
    } else {
      dispatch(updateFieldDayFive({ field, unit: null, value }));
    }

    dispatch(calculateDailyScoreDayFive());
  }

  // updates the local state 
  const handleLocalChange = (field, value, troopType = null, unit = null) => {
    console.log("handleLocalChange values: field:", field, ", unit:", unit, ", troopType:", troopType, ", value:", value);

    setLocalState(prev => ({
      ...prev,
      ...(troopType
        ? {
          troops: {
            ...prev.troops,
            [troopType]: {
              ...prev.troops[troopType],
              [field]: unit
                ? { ...prev.troops[troopType][field], [unit]: value }
                : value,
            },
          },
        }
        : {
          [field]: unit
            ? { ...prev[field], [unit]: value }
            : value,
        }
      )
    }));
  };

  // Update redux
  const handleBlur = (field, unit = null, troopType = null) => {

    let value;

    // Assign the value conditionally
    if (troopType) {
      value = unit
        ? localState.troops[troopType][field][unit]
        : localState.troops[troopType][field];
    } else {
      value = unit
        ? localState[field][unit]
        : localState[field];
    }

    console.log("handleBlur before dispatch values: field: ", field, ', value: ', value, ', unit: ', unit, ', troopType: ', troopType);

    // Conditionally dispatch actions depending on whether TroopType or not 
    if (troopType) {
      dispatch(updateTroopField({ troopType, field, unit, value }));
    } else {
      dispatch(updateFieldDayFive({ field, unit, value }));
    }

    dispatch(calculateDailyScoreDayFive());
  };

  const cancelForm = () => {
    dispatch(resetStateDayFive())
  }



  return (
    <DayContainer>
      <FormHeader title={'Day Five'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          <FormSubHeader title={'Troop Promotion '} sizeClass={'subheader-lg'} />
          {Object.keys(localState.troops).map((troopType, index) => (
            <TroopType
              key={index}
              troopData={localState.troops[troopType]}
              troopType={troopType}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              handleInstantDispatch={handleInstantDispatch}
            />
          ))}
          {/* Troop training: */}
          <div className='border-b border-neutral-400 mb-2'>
            <ExpandableHeader title={'Troop Training'} isExpanded={expandedSections.troopTraining} toggleExpansion={() => toggleSection('troopTraining')} />
            <ExpandableSection isExpanded={expandedSections.troopTraining}>
              <div className='flex flex-col xs:flex-row space-x-1'>
                {/* Tier & Troops per batch  */}
                <div className='w-full sm:w-1/2'>
                  <FormDropdown
                    title={'Target tier: '}
                    options={TROOP_TIER_MULTIPLIERS}
                    id={'trainedTroopTier'}
                    value={localState.trainedTroopTier}
                    onChange={(newValue) => handleInstantDispatch('trainedTroopTier', newValue)}
                  />
                </div>
                <div className='w-full sm:w-1/2'>
                  <FormSubHeader title={'Troops per batch:'} />
                  <FormInput
                    id={'trainedTroopsPerBatch'}
                    placeholder={'0'}
                    value={localState.trainedTroopsPerBatch}
                    onChange={(newValue) => handleLocalChange('trainedTroopsPerBatch', newValue)}
                    onBlur={() => handleBlur('trainedTroopsPerBatch')}
                  />
                </div>
              </div>
              {/* Troop training time: */}
              <div className='flex flex-col w-full my-1'>
                <FormSubHeader title={'Troop training time:'} />
                <div className='flex flex-col xs:flex-row xs:space-x-1'>
                  <FormInput
                    id={'troopTrainingTimeDay'}
                    placeholder={'days'}
                    value={localState.trainedTroopsTrainingTime.days}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'days')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'days')}
                  />
                  <FormInput
                    id={'troopTrainingTimeHours'}
                    placeholder={'hours'}
                    value={localState.trainedTroopsTrainingTime.hours}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'hours')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'hours')}
                  />
                  <FormInput
                    id={'troopTrainingTimeMinutes'}
                    placeholder={'minutes'}
                    value={localState.trainedTroopsTrainingTime.minutes}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'minutes')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'minutes')}
                  />
                  <FormInput
                    id={'troopTrainingTimeSeconds'}
                    placeholder={'seconds'}
                    value={localState.trainedTroopsTrainingTime.seconds}
                    onChange={(value) => handleLocalChange('trainedTroopsTrainingTime', value, null, 'seconds')}
                    onBlur={() => handleBlur('trainedTroopsTrainingTime', 'seconds')}
                  />
                </div>
              </div>
            </ExpandableSection>
          </div>
          <FormSubHeader title={'Training Speed-up: '} />
          <FormWrapper>
            <FormInput
              id={'initialTrainingSpeedupDays'}
              placeholder={'days'}
              value={localState.initialTrainingSpeedup.days}
              onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'days')}
              onBlur={() => handleBlur('initialTrainingSpeedup', 'days')}
            />
            <FormInput
              id={'initialTrainingSpeedupHours'}
              placeholder={'hours'}
              value={localState.initialTrainingSpeedup.hours}
              onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'hours')}
              onBlur={() => handleBlur('initialTrainingSpeedup', 'hours')}
            />
            <FormInput
              id={'initialTrainingSpeedupMinutes'}
              placeholder={'minutes'}
              value={localState.initialTrainingSpeedup.minutes}
              onChange={(newValue) => handleLocalChange('initialTrainingSpeedup', newValue, null, 'minutes')}
              onBlur={() => handleBlur('initialTrainingSpeedup', 'minutes')}
            />
          </FormWrapper>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-lg'} />
          <FormWrapper>
            <FormInput
              title={'1st place:'}
              id={'previousEventScoreFirst'}
              placeholder={'0'}
              value={localState.previousEventScore.first}
              onChange={(newValue) => handleLocalChange('previousEventScore', newValue, null, 'first')}
              onBlur={() => handleBlur('previousEventScore', 'first')}
            />
            <FormInput
              title={'10th place:'}
              id={'previousEventScoreTenth'}
              placeholder={'0'}
              value={localState.previousEventScore.tenth}
              onChange={(newValue) => handleLocalChange('previousEventScore', newValue, null, 'tenth')}
              onBlur={() => handleBlur('previousEventScore', 'tenth')}
            />
          </FormWrapper>
        </div>
        <div className='w-full md:w-1/2  md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
          {/* Output */}
          <FormSubHeader title={'Day Five Score'} sizeClass={'subheader-xl'} />
          <ScoreBoardSection title={'Total daily score:'} sizeClass={'subheader-md'} value={dailyData.totalDailyScore.toLocaleString()} />
          <div className='flex flex-col xs:flex-row xs:space-x-1'>
            <ScoreBoardSection title={'Promotion score: '} value={dailyData.score.promoting.toLocaleString()} />
            <ScoreBoardSection title={'Training score: '} value={dailyData.score.training.toLocaleString()} />
          </div>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-md'} />
          <FormWrapper>
            <ScoreBoardSection title={'1st place: '} value={dailyData.previousEventScore.first.toLocaleString()} />
            <ScoreBoardSection title={'10th place: '} value={dailyData.previousEventScore.tenth.toLocaleString()} />
          </FormWrapper>

          <ExpandableHeader title={'Troop Data'} isExpanded={expandedSections.troopData} toggleExpansion={() => toggleSection('troopData')} />
          <ExpandableSection isExpanded={expandedSections.troopData} height='max-h-80'>
            <div className='grid grid-cols-2 gap-1'>
              <div>
                <FormSubHeader title={'Archers data:'} sizeClass={'subheader-md'} />
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Archers'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Archers'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection title={'Troop score:'} value={(dailyData.troops['Archers'].troopTotalScore || 0).toLocaleString()} />
              </div>
              <div>
                <FormSubHeader title={'Cavalry data:'} sizeClass={'subheader-md'} />
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Cavalry'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Cavalry'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection title={'Troop score:'} value={dailyData.troops['Cavalry'].troopTotalScore.toLocaleString()} />
              </div>
              <div>
                <FormSubHeader title={'Pikemen data:'} sizeClass={'subheader-md'} />
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Pikemen'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Pikemen'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection title={'Troop score:'} value={dailyData.troops['Pikemen'].troopTotalScore.toLocaleString()} />
              </div>
              <div>
                <FormSubHeader title={'Swordsmen data:'} sizeClass={'subheader-md'} />
                <ScoreBoardSection title={'Promoted troops: '} value={((dailyData.troops['Swordsmen'].promotedTroopsPerBatch || 0) *
                  (dailyData.troops['Swordsmen'].promotableBatches || 0)).toLocaleString()} />
                <ScoreBoardSection title={'Troop score:'} value={dailyData.troops['Swordsmen'].troopTotalScore.toLocaleString()} />
              </div>
            </div>
          </ExpandableSection>
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer >
  )
}

export default DayFive


/*

Troop training:
1x lvl 1 = 2
1x lvl 2 = 3
1x lvl 3 = 5
1x lvl 4 = 10
1x lvl 5 = 20
1x lvl 6 = 50
1x lvl 7 = 100
Promote units based on level gap = 1 point per level
stop

Input:
    Available T1 troops to promote and to which level it will be promoted

Top 1 score 52,5kk
Top 10 score 11,2kk

const handleLocalChange = (field, value, unit = null) => {
    console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }));
  };

  const handleTroopTypeStateChange = (troopType, field, unit, value) => {

    setLocalState(prev => ({
      ...prev,
      troops: {
        ...prev.troops,
        [troopType]: {
          ...prev.troops[troopType],
          [field]: unit ? {
            ...prev.troops[troopType][field],
            [unit]: value
          } : value,
        },
      },
    }));
  };
  const handleTroopTypeBlur = (troopType, field, unit = null) => {
    const value = unit
      ? localState.troops[troopType][field][unit] // Handle nested object with unit
      : localState.troops[troopType][field];

    dispatch(updateTroopField({ troopType, field, unit, value }));
    dispatch(calculateDailyScoreDayFive());
  }

*/
