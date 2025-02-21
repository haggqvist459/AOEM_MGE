export { default as dayOneReducer, 
    // updateField as updateFieldDayOne, 
    calculateDailyScore as calculateDailyScoreDayOne, 
    resetState as resetStateDayOne } from './dayOneSlice';

export { default as dayTwoReducer, 
    // updateField as updateFieldDayTwo, 
    calculateDailyScore as calculateDailyScoreDayTwo, 
    resetState as resetStateDayTwo } from './dayTwoSlice';

export { default as dayThreeReducer, 
    // updateField as updateFieldDayThree, 
    calculateDailyScore as calculateDailyScoreDayThree, 
    resetState as resetStateDayThree, 
    updateMarchField } from './dayThreeSlice';

export { default as dayFourReducer, 
    // updateField as updateFieldDayFour,
    calculateDailyScore as calculateDailyScoreDayFour, 
    resetState as resetStateDayFour } from './dayFourSlice';

export { default as dayFiveReducer, 
    // updateField as updateFieldDayFive, 
    calculateDailyScore as calculateDailyScoreDayFive, 
    resetState as resetStateDayFive,
    updatePromotionField } from './dayFiveSlice';

export { default as daySixReducer, 
    // updateField as updateFieldDaySix, 
    calculateDailyScore as calculateDailyScoreDaySix, 
    resetState as resetStateDaySix } from './daySixSlice';

export { default as daySevenReducer, 
    // updateField as updateFieldDaySeven, 
    calculateDailyScore as calculateDailyScoreDaySeven, 
    resetState as resetStateDaySeven } from './daySevenSlice';

export { default as sharedReducer,
    updateField, updatePreviousEventScore } from './sharedReducers'