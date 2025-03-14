import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayThree, resetStateDayThree, updateMarchField, updateFieldDayThree, addMarch, removeMarch } from '../../redux/slices'
import { DayContainer, PreviousEventScore, FormButtons, FormHeader, GatherMarch, ExpandableHeader, ExpandableSection, FormSubHeader, FormInput, FormDropdown } from '../../components'
import { DAY_KEYS, RESOURCE_FIELD_MAP } from '../../utils'

const DayThree = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayThree)
  const [localState, setLocalState] = useState(dailyData);
  const [richFieldOptions, setRichFieldOptions] = useState({})
  const [allianceCentreOptions, setAllianceCentreOptions] = useState({})

  useEffect(() => {
    console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  useEffect(() => {

    const richOptions = {
      "Select a march": "0",  // Default option
      ...localState.marches
        .filter(march => march.id !== localState.allianceCentre)  // Remove the selected alliance march
        .reduce((options, march) => {
          options[march.marchName] = march.id;  // Use march.marchName instead of "March X"
          return options;
        }, {})
    };

    const allianceOptions = {
      "Select a march": "0",  // Default option
      ...localState.marches
        .filter(march => march.id !== localState.richField)  // Remove the selected rich march
        .reduce((options, march) => {
          options[march.marchName] = march.id;  // Use march.marchName instead of "March X"
          return options;
        }, {})
    };

    setRichFieldOptions(richOptions);
    setAllianceCentreOptions(allianceOptions);

  }, [localState.marches, localState.richField, localState.allianceCentre])



  const handleAddMarch = () => {
    if (localState.marches.length >= 5) return;

    dispatch(addMarch());
  };

  const handleRemoveMarch = (id) => {
    console.log("handleRemoveMarch ID to remove: ", id)
    dispatch(removeMarch({ id })); // Redux handles filtering, useEffect syncs localState
  };

  // Array based inputs 
  const handleMarchLocalChange = (id, field, value) => {
    console.log("handleMarchLocalChange triggered: id:", id, "field:", field, "value:", value);

    setLocalState(prev => ({
      ...prev,
      marches: [...prev.marches.map(march =>
        march.id === id ? { ...march, [field]: value } : march
      )],
    }));

  };


  // Array based inputs 
  const marchInputBlur = (id, field) => {

    if (id === '0') {
      console.log("default dropdown option selected. ")
      return
    }

    const march = localState.marches.find(m => m.id === id);

    if (!march) {
      console.error(`March with ID ${id} not found`);
      return;
    }

    console.log("marchInputBlur values, id: ", id, ', field: ', field, ', value: ', march[field]);

    dispatch(updateMarchField({ id, field, value: march[field] }));
    dispatch(calculateDailyScoreDayThree({ id }));
  }

  // Non-array based inputs
  const handleLocalChange = (field, value, unit = null) => {
    console.log("handleLocalChange values: field: ", field, ', unit: ', unit, ', value: ', value);
    setLocalState((prev) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }));
  };

  // Non-array based inputs
  const handleBlur = (field, unit = null) => {
    console.log("handleBlur before dispatch values: field: ", field, ', unit: ', unit, ', value: ', localState[field]);
    const value = unit
      ? localState[field][unit]
      : localState[field];

    let id; 
    if (field === RESOURCE_FIELD_MAP.RICH || field === RESOURCE_FIELD_MAP.ALLIANCE) {
      id = value; 
    } else if (field === 'empireCoins') {
      id = '999'
    } 

    dispatch(updateFieldDayThree({ field, unit, value }));
    if (id !== undefined) {
      dispatch(calculateDailyScoreDayThree({ id }));
    }
  };



  const cancelForm = () => {
    dispatch(resetStateDayThree())
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Three'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row md:pr-2'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          {/*  */}
          {localState.marches.map((march, index) => (
            <GatherMarch
              title={march.marchName}
              key={index}
              march={march}
              marchId={march.id}
              onChange={handleMarchLocalChange}
              onBlur={marchInputBlur}
              onDelete={handleRemoveMarch}
            />
          ))}
          {/* Add button */}

          <div className='w-full flex items-center'>
            <button
              type='button'
              onClick={handleAddMarch}
              disabled={localState.marches.length >= 5}
              className={'my-2 w-1/3 mx-auto px-4 rounded border-2 border-blue-950 font-semibold text-blue-50 bg-blue-950 hover:bg-blue-900 hover:border-blue-50 disabled:opacity-50 disabled:hover:border-none'}
            >
              Add March
            </button>
          </div>

          <div className='flex flex-row space-x-1'>
            {/* Dropdowns for the Rich and Alliance field selection */}
            <FormDropdown
              id={'richFieldDropdown'}
              title={'Rich Resource'}
              value={localState.richField}
              options={richFieldOptions}
              onChange={(newValue) => handleLocalChange('richField', newValue)}
              onBlur={() => handleBlur('richField')}
            />
            <FormDropdown
              id={'allianceFieldDropdown'}
              title={'Alliance Centre'}
              value={localState.allianceCentre}
              options={allianceCentreOptions}
              onChange={(newValue) => handleLocalChange('allianceCentre', newValue)}
              onBlur={() => handleBlur('allianceCentre')}
            />
          </div>
          <FormSubHeader title={'Empire Coins'} />
          <FormInput
            id={'empireCoins'}
            placeholder={'0'}
            value={localState.empireCoins}
            onChange={(newValue) => handleLocalChange('empireCoins', newValue)}
            onBlur={() => { handleBlur('empireCoins') }}
          />
          <PreviousEventScore dayKey={DAY_KEYS.DAY_THREE} />
        </div>

        <div className='w-full md:w-1/2'>
          {/* Output */}
        </div>
      </div>
      <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
    </DayContainer>
  )
}

export default DayThree

/**
 
Gather 100 resources = 1 point

Legendary advent spin = 1000
    5x spins = 4200 empire coins
    1x spin = 900 coins


Input gather marches resource gather boosts, their load capacity and potential bonuses 
Input amount of empire coins available for spins 

Gather info:  
  load capacity
  load bonus %



Display max available score based on gathering
    Include rich resources, and alliance resource center 
    Include full marches waiting to be deposited at reset

Feb 17 start:
1st: 1595000
10th: 1299220

Feb 10 start:
Top 1 score 1,8kk, 
Top 10 score 1,1kk


 */ 