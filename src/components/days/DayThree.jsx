import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayThree, resetStateDayThree, updateMarchField, updateFieldDayThree, addMarch, removeMarch } from '../../redux/slices'
import { DayContainer, FormWrapper, FormButtons, FormHeader, GatherMarch, FormSubHeader, FormInput, FormDropdown, ScoreBoardSection } from '../../components'
import { RESOURCE_FIELD_MAP } from '../../utils'

const DayThree = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.dayThree)
  const [localState, setLocalState] = useState(dailyData);
  const [richFieldOptions, setRichFieldOptions] = useState({})
  const [allianceCentreOptions, setAllianceCentreOptions] = useState({})

  useEffect(() => {
    // console.log("data received from redux: ", dailyData);
    setLocalState(dailyData);
  }, [dailyData]);

  useEffect(() => {

    const richOptions = {
      "Select a march": "0",
      ...dailyData.marches
        .filter(march => march.id !== dailyData.allianceCentre)  // remove the alliance centre march
        .reduce((options, march) => {
          options[march.marchName] = march.id;
          return options;
        }, {})
    };

    const allianceOptions = {
      "Select a march": 0,
      ...dailyData.marches
        .filter(march => march.id !== dailyData.richField)  // Remove the selected rich march
        .reduce((options, march) => {
          options[march.marchName] = march.id;
          return options;
        }, {})
    };

    setRichFieldOptions(richOptions);
    setAllianceCentreOptions(allianceOptions);

  }, [localState.marches, dailyData.richField, dailyData.allianceCentre])

  const handleAddMarch = () => {
    if (localState.marches.length >= 5) return;

    dispatch(addMarch());
  };

  const handleRemoveMarch = (id) => {
    console.log("handleRemoveMarch ID to remove: ", id)
    dispatch(removeMarch({ id }));
  };


  const handleInstantDispatch = (field, value, id = null) => {
    console.log("handleInstantDispatch values, field: ", field, ", value: ", value, ', id: ', id);

    if (id) {
      dispatch(updateMarchField({ id, field, value }));
      dispatch(calculateDailyScoreDayThree({ id }));
    } else {
      dispatch(updateFieldDayThree({ field, value }));
      dispatch(calculateDailyScoreDayThree({ id: Number(value) }));
    }
  }

  const handleBlur = (field, unit = null, id = null) => {
    let value;

    if (id) {
      const march = localState.marches.find(m => m.id === id);
      if (!march) {
        console.error(`March with ID ${id} not found`);
        return;
      }
      value = march[field];
    } else {
      value = unit ? localState[field][unit] : localState[field];
    }

    console.log("handleBlur before dispatch values: field: ", field, ', id: ', id, ', value: ', value);

    if (id) {
      dispatch(updateMarchField({ id, field, value }));
    } else {
      dispatch(updateFieldDayThree({ field, unit, value }));
    }

    if (id) {
      dispatch(calculateDailyScoreDayThree({ id }));
    } else if (field === 'empireCoins') {
      dispatch(calculateDailyScoreDayThree({ id: 999 }));
    }
  };

  const handleLocalChange = (field, value, id = null, unit = null) => {
    // console.log("handleLocalChange values: field:", field, ", id:", id, ", value:", value);

    setLocalState(prev => ({
      ...prev,
      ...(id
        ? {
          marches: prev.marches.map(march =>
            march.id === id ? { ...march, [field]: value } : march
          )
        }
        : { [field]: unit ? { ...prev[field], [unit]: value } : value }
      )
    }));
  };

  const cancelForm = () => {
    dispatch(resetStateDayThree())
  }


  return (
    <DayContainer>
      <FormHeader title={'Day Three'} onClick={cancelForm} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 md:border-r border-neutral-400 md:pr-2'>
          {/* Input */}
          {localState.marches.map((march, index) => (
            <GatherMarch
              title={dailyData.marches.find(m => m.id === march.id)?.marchName}
              key={index}
              march={march}
              marchId={march.id}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              onDelete={handleRemoveMarch}
              handleInstantDispatch={handleInstantDispatch}
            />
          ))}
          {/* Add button */}
          <div className='w-full flex items-center'>
            <button
              type='button'
              onClick={handleAddMarch}
              disabled={localState.marches.length >= 5}
              className={'my-2 w-1/2 lg:w-1/3 mx-auto px-4 rounded border-2 border-blue-950 font-semibold text-blue-50 bg-blue-950 hover:bg-blue-900 hover:border-blue-50 disabled:opacity-50 disabled:hover:border-none'}
            >
              Add March
            </button>
          </div>
          <FormWrapper>
            <FormDropdown
              id={'richFieldDropdown'}
              title={'Rich Resource'}
              value={localState.richField}
              options={richFieldOptions}
              onChange={(newValue) => handleInstantDispatch('richField', newValue)}
            />
            <FormDropdown
              id={'allianceFieldDropdown'}
              title={'Alliance Centre'}
              value={localState.allianceCentre}
              options={allianceCentreOptions}
              onChange={(newValue) => handleInstantDispatch('allianceCentre', newValue)}
            />
          </FormWrapper>
          <FormInput
            title={'Empire Coins'}
            id={'empireCoins'}
            placeholder={'0'}
            value={localState.empireCoins}
            onChange={(newValue) => handleLocalChange('empireCoins', newValue)}
            onBlur={() => handleBlur('empireCoins')}
          />
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

        <div className='w-full md:w-1/2 md:pl-2 border-t border-neutral-400 md:border-0 mt-1 md:mt-0'>
          {/* Output */}
          <FormSubHeader title={'Day Three Score '} sizeClass='subheader-lg' />
          <ScoreBoardSection title={'Daily score total: '} sizeClass={'subheader-md'} value={dailyData.totalDailyScore.toLocaleString()} />
          <ScoreBoardSection title={'Advent wheel score: '} sizeClass={'subheader'} value={dailyData.score.spins.toLocaleString()} />
          <div className='grid grid-cols-1 xs:grid-cols-2 xs:gap-1 md:grid-cols-3'>
            {dailyData.marches.map((march, index) => (
              <div key={index}>
                <ScoreBoardSection title={march.marchName} value={march.score.toLocaleString()} />
              </div>
            ))}
          </div>
          <FormSubHeader title={'Previous Event Scores'} sizeClass={'subheader-md'} />
          <FormWrapper>
            <ScoreBoardSection title={'1st place: '} value={dailyData.previousEventScore.first.toLocaleString()} />
            <ScoreBoardSection title={'10th place: '} value={dailyData.previousEventScore.tenth.toLocaleString()} />
          </FormWrapper>
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