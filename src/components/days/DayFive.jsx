import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateDailyScoreDayFive, resetStateDayFive, updatePromotionField } from '../../redux/slices'
import { FormField, PreviousEventScore, FormButtons, FormHeader, TroopsPromotion } from '../form'
import { DAY_KEYS } from '../../utils'

const DayFive = () => {

  const dispatch = useDispatch();
  const dayFiveData = useSelector((state) => state.dayFive)

  const handleInput = (field, value) => {
    dispatch(updateField({day: DAY_KEYS.DAY_FIVE, field, value }))
  }

  const handleTroopInput = (troopType, field, value) => {
    dispatch(updatePromotionField({ troopType, field, value }))
  }

  const cancelForm = () => {
    dispatch(resetStateDayFive())
  }
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(calculateDailyScoreDayFive());
  }


  return (
    <section className='container bg-neutral-300 mx-auto md:w-3/4 w-11/12 pt-5 border shadow-md rounded-md'>
      <div className='px-5'>
        <div className=''>
          <FormHeader title={'Day Five'} />
          <form onSubmit={submitForm}>
            <div className='flex flex-col md:flex-row md:pr-2'>
              <div className='w-full md:w-1/2 relative md:border-r border-neutral-400 md:pr-2'>
                {/* Input */}
                {Object.keys(dayFiveData.troops).map((troopType, index) => (
                  <TroopsPromotion
                    key={index}
                    troopType={troopType}
                    troopData={dayFiveData.troops[troopType]}
                    onChange={handleTroopInput}
                  />
                ))}
                <FormField
                  labelValue={'Training Speed-up:'}
                  placeholder={'Input in minutes'}
                  id={'initialTrainingSpeedup'}
                  value={dayFiveData.initialTrainingSpeedup}
                  onChange={(value) => handleInput('initialTrainingSpeedup', value)}
                />
                <PreviousEventScore dayKey={DAY_KEYS.DAY_FIVE} />
              </div>
              <div className='w-full md:w-1/2 relative md:pl-2 border-t border-neutral-400 md:border-0 mt-1'>
                {/* Output */}
                <h5 className='font-bold my-1 text-blue-900'>Score potential day 5:</h5>
                <p className='font-semibold my-2 text-neutral-600'>Daily score:</p>
                <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.totalDailyScore.toLocaleString()}</p>
                <h3 className='font-semibold my-1 text-blue-900'>Cavalry: </h3>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Training time:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].trainingTime}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop per batch:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].promotedTroopPerBatch}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Available troops:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].availableTroops}</p>
                  </div>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].promotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Max Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].maxPromotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop score:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Cavalry'].troopTotalScore}</p>
                  </div>
                </div>
                <h3 className='font-semibold my-1 text-blue-900'>Archers: </h3>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Training time:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].trainingTime}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop per batch:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].promotedTroopPerBatch}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Available troops:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].availableTroops}</p>
                  </div>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].promotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Max Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].maxPromotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop score:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Archers'].troopTotalScore}</p>
                  </div>   
                </div>
                <h3 className='font-semibold my-1 text-blue-900'>Pikemen: </h3>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Training time:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].trainingTime}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop per batch:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].promotedTroopPerBatch}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Available troops:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].availableTroops}</p>
                  </div>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].promotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Max Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].maxPromotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop score:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Pikemen'].troopTotalScore}</p>
                  </div>
                </div>
                <h3 className='font-semibold my-1 text-blue-900'>Swordsmen: </h3>
                <div className='flex flex-col md:flex-row w-full'>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Training time:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].trainingTime}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop per batch:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].promotedTroopPerBatch}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Available troops:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].availableTroops}</p>
                  </div>
                  <div className='w-full'>
                    <h5 className='font-bold my-1 text-blue-900'>Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].promotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Max Batches:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].maxPromotableBatches}</p>
                    <h5 className='font-bold my-1 text-blue-900'>Troop score:</h5>
                    <p className='font-semibold my-2 text-neutral-600'>{dayFiveData.troops['Swordsmen'].troopTotalScore}</p>
                  </div>
                </div>
              </div>
            </div>
            <FormButtons onSubmit={submitForm} onCancel={cancelForm} />
          </form>
        </div>
      </div>
    </section>
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


Input: 
    Available T1 troops to promote and to which level it will be promoted 
    
Top 1 score 52,5kk
Top 10 score 11,2kk 

*/