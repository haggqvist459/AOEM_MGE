import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldDayOne, updateFieldDayTwo, updateFieldDayThree, updateFieldDayFour, updateFieldDayFive, updateFieldDaySix, updateFieldDaySeven } from '../redux/slices'
import { FormSubHeader, FormInput, FormWrapper } from '../components/form';
import { DAY_KEYS } from '../utils';

const updateActions = {
  dayOne: updateFieldDayOne,
  dayTwo: updateFieldDayTwo,
  dayThree: updateFieldDayThree,
  dayFour: updateFieldDayFour,
  dayFive: updateFieldDayFive,
  daySix: updateFieldDaySix,
  daySeven: updateFieldDaySeven,
};


const PreviousEventScore = ({ dayKey }) => {

  const dispatch = useDispatch();
  const dailyState = useSelector((state) => state[dayKey]);

  const [localState, setLocalState] = useState(dailyState)

  useEffect(() => {
    // console.log("previousEventScore useEffect state: ", dailyState);
    setLocalState(dailyState);
  }, [dailyState]);

  const handleLocalChange = (field, unit, value) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: { ...prev[field], [unit]: value },
    }));
  };

  const handleBlur = (field, unit) => {

    if (!updateActions[dayKey]) {
      console.error(`Invalid dayKey: ${dayKey}`);
      return;
    }
    console.log("handleBlur before dispatch dayKey: ", dayKey, ", field: ", field, ', unit: ', unit, ', value: ');
    dispatch(updateActions[dayKey]({ field, unit, value: localState[field][unit] }));
  };

  return (
    <div className='my-2'>
      <FormSubHeader title={'Previous event scores'} size={'text-lg md:text-xl'}/>
      <div className='flex flex-row space-x-2'>
        <FormWrapper>
          <FormSubHeader title={'1st place:'} />
          <FormInput
            id={`${dayKey}-previousEventScore-topOne`}
            placeholder={'0'}
            value={localState.previousEventScore.topOne}
            onChange={(value) => handleLocalChange('previousEventScore', 'first', value)}
            onBlur={() => handleBlur('previousEventScore', 'topOne')}
          />
        </FormWrapper>
        <FormWrapper>
          <FormSubHeader title={'10th place:'} />
          <FormInput
            id={`${dayKey}-previousEventScore-topTen`}
            placeholder={'0'}
            value={localState.previousEventScore.topTen}
            onChange={(value) => handleLocalChange('previousEventScore', 'tenth', value)}
            onBlur={() => handleBlur('previousEventScore','topTen')}
          />
          </FormWrapper>
        </div>
      </div>
  )
}

export default PreviousEventScore


/*

          <div className='my-1'>
            <FormSubHeader title={'Previous event scores'} sizeClass={'subheader-lg'} />
            <div className='flex flex-col xs:flex-row xs:space-x-1'>
              <div>
                <FormSubHeader title={'1st place:'} />
                <FormInput
                  id={'previousEventScoreFirst'}
                  placeholder={'0'}
                  value={localState.previousEventScore.first}
                  onChange={(newValue) => handleLocalChange('previousEventScore', newValue, null, 'first')}
                  onBlur={() => handleBlur('previousEventScore', 'first')}
                />
              </div>
              <div>
                <FormSubHeader title={'10th place:'} />
                <FormInput
                  id={'previousEventScoreTenth'}
                  placeholder={'0'}
                  value={localState.previousEventScore.tenth}
                  onChange={(newValue) => handleLocalChange('previousEventScore', newValue, null, 'tenth')}
                  onBlur={() => handleBlur('previousEventScore', 'tenth')}
                />
              </div>
            </div>
          </div>

*/