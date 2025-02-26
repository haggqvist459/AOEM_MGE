import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldDayOne, updateFieldDayTwo, updateFieldDayThree, updateFieldDayFour } from '../../redux/slices'
import { FormField, FormSubHeader, FormInput, FormWrapper } from '../form'

const updateActions = {
  dayOne: updateFieldDayOne,
  dayTwo: updateFieldDayTwo,
  dayThree: updateFieldDayThree,
  dayFour: updateFieldDayFour,
  // dayFive: updateFieldDayFive,
  // daySix: updateFieldDaySix,
  // daySeven: updateFieldDaySeven,
};


const PreviousEventScore = ({ dayKey }) => {

  const dispatch = useDispatch();
  const previousEventScore = useSelector((state) => state[dayKey].previousEventScore);

  const [localState, setLocalState] = useState(previousEventScore);

  useEffect(() => {
    setLocalState(previousEventScore);
  }, [previousEventScore]);

  const handleLocalChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    // dispatch(updateFieldDayOne({ field, value: localState[field] }));

    if (!updateActions[dayKey]) {
      console.error(`Invalid dayKey: ${dayKey}`);
      return;
    }
    console.log("dayKey: ", dayKey, ", field: ", field, ', value: ', localState[field]);
    dispatch(updateActions[dayKey]({ field, value: localState[field] }));
  };

  return (
    <div className='my-2 px-1 '>
      <FormSubHeader title={'Previous event scores: '} size={'text-md'} />
      <div className='flex flex-col xs:flex-row space-x-2'>
        <FormWrapper>
          <FormSubHeader title={'1st place:'} />
          <FormInput
            id={`${dayKey}-topOne`}
            placeholder={'0'}
            value={localState.topOne}
            onChange={(value) => handleLocalChange('topOne', value)}
            onBlur={() => handleBlur('topOne')}
          />
        </FormWrapper>
        <FormWrapper>
          <FormSubHeader title={'10th place:'} />
          <FormInput
            id={`${dayKey}-topTen`}
            placeholder={'0'}
            value={localState.topTen}
            onChange={(value) => handleLocalChange('topTen', value)}
            onBlur={() => handleBlur('topTen')}
          />
          </FormWrapper>
        </div>
      </div>
  )
}

export default PreviousEventScore