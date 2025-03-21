import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TROOP_TIER_MULTIPLIERS } from '../../utils';
import { calculateDailyScoreDayFive, resetStateDayFive, updateTroopField, updateFieldDayFive } from '../../redux/slices';
import {
  DayContainer, FormButtons, FormHeader, FormSubHeader, TroopType, FormInput, FormDropdown,
  ScoreBoardSection, ExpandableHeader, ExpandableSection, FormWrapper, InfoPopup, Modal
} from '../../components';


const DayFive = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayFive)
  const [localState, setLocalState] = useState(dailyData);
  const [expandedSections, setExpandedSections] = useState({
    troopTraining: true,
    troopData: false,
  });
  const [showModal, setShowModal] = useState(false);

  const confirmReset = () => {
    dispatch(resetStateDayFive())
    setShowModal(false);
  };
  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };


  // Dropdown dispatch 
  const handleInstantDispatch = (field, value, troopType = null) => {
    // console.log("handleInstantDispatch values, field: ", field, ", value: ", value, ' troopType: ', troopType);

    if (troopType) {
      dispatch(updateTroopField({ troopType, field, unit: null, value }))
    } else {
      dispatch(updateFieldDayFive({ field, unit: null, value }));
    }

    dispatch(calculateDailyScoreDayFive());
  }

  // updates the local state 
  const handleLocalChange = (field, value, troopType = null, unit = null) => {
    // console.log("handleLocalChange values: field:", field, ", unit:", unit, ", troopType:", troopType, ", value:", value);

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

    // console.log("handleBlur before dispatch values: field: ", field, ', value: ', value, ', unit: ', unit, ', troopType: ', troopType);

    // Conditionally dispatch actions depending on whether TroopType or not 
    if (troopType) {
      dispatch(updateTroopField({ troopType, field, unit, value }));
    } else {
      dispatch(updateFieldDayFive({ field, unit, value }));
    }

    dispatch(calculateDailyScoreDayFive());
  };



  return (
    <DayContainer>
      <FormHeader title={'Day Five'} onClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          <div className='flex flex-row space-x-1 '>
            <FormSubHeader title={'Promotion'} sizeClass={'subheader-lg'} />
            <InfoPopup size='size-5'
              message={'Input the numbers from your Stable & Archery Range etc. Speed-ups will be evenly split between troop types. Leftover speed-up will be automatically used for training'} />
          </div>
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
            <ExpandableHeader title={'Training'} isExpanded={expandedSections.troopTraining} toggleExpansion={() => toggleSection('troopTraining')} />
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
      <Modal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmReset}
        title="Reset"
        description={'Clear all values for day five?'}
      />
    </DayContainer >
  )
}

export default DayFive

