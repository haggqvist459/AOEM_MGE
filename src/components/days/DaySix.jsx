import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_KEYS } from '../../utils';
import { calculateDailyScoreDaySix, resetStateDaySix } from '../../redux/slices';
import { DayContainer, PreviousEventScore, FormButtons, FormHeader } from '../../components';


const DaySix = ({ activeDay, setActiveDay }) => {

  const dispatch = useDispatch();
  const dailyData = useSelector((state) => state.daySix);
  const [localState, setLocalState] = useState(dailyData);

  useEffect(() => {
    setLocalState(dailyData);
  }, [dailyData]);

  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleInput = (field, value) => {
    dispatch(updateField({ day: DAY_KEYS.DAY_SIX, field, value }))
  }

  const cancelForm = () => {
    dispatch(resetStateDaySix());
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDaySix());
  }

  return (
    <DayContainer>
      <FormHeader title={'Day Six'} onClick={cancelForm} />
      <form onSubmit={submitForm}>
        <div className='flex flex-col md:flex-row md:pr-2'>
          <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
            {/* Input */}
            <PreviousEventScore dayKey={DAY_KEYS.DAY_SIX} />
          </div>
          <div className='w-full md:w-1/2 relative'>
            {/* Output */}
          </div>
        </div>
        <FormButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      </form>
    </DayContainer>
  )
}

export default DaySix


/*

Power increase
Citadel building 1x power = 3 
Research tech 1x power = 6
Unit training power = 3

Input needed: 
Building, how much power increase it yields
Research, how much power increase it yields
Troop training total potential 




*/