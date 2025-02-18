export const cleanNumericValue = (value) => {
    const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
    return Number(cleanedValue);

}

export const calculateHighTierPromotableBatches = (highestTierTroops, trainingSpeedup) => {
    if (highestTierTroops.length === 0) return { troopUpdates: {}, remainingSpeedup: trainingSpeedup };

    // console.log("data passed into calculateHighTierPromotableBatches highestTierTroops:", JSON.stringify(highestTierTroops, null, 2));
    // console.log('data passed into calculateHighTierPromotableBatches trainingSpeedup: ', trainingSpeedup)
    // console.log('calculateHighTierPromotableBatches trainingTime: ',highestTierTroops[0].trainingTime)
    // determine how many batches per troop promotion each of the highest tiers can receive based on speed ups available
    const totalBatchesAvailable = Math.floor(trainingSpeedup / highestTierTroops[0].trainingTime);
    
    // console.log("calculateHighTierPromotableBatches totalBatchesAvailable: ", totalBatchesAvailable);
    // determine how many batches each troop type can promote 
    const batchesPerTroopType = Math.floor(totalBatchesAvailable / highestTierTroops.length);
    // console.log("calculateHighTierPromotableBatches batchesPerTroopType: ", batchesPerTroopType);
    let remainingBatches = totalBatchesAvailable;
    // console.log("calculateHighTierPromotableBatches remainingBatches: ", remainingBatches);
    let troopUpdates = {};
    
    highestTierTroops.forEach((troop) => {
        // determine the theoretical max number of promotable batches for each troop
        const maxPromotableBatches = Math.floor(troop.availableTroops / troop.promotedTroopPerBatch);
        // console.log("calculateHighTierPromotableBatches maxPromotableBatches: ", maxPromotableBatches);
        // save the value for future reference 
        troopUpdates[troop.type] = {
            maxPromotableBatches,
            promotableBatches: Math.min(batchesPerTroopType, maxPromotableBatches),
        };
        // console.log("calculateHighTierPromotableBatches troopUpdates: ", troopUpdates);
        // reduce the remaining batches accordingly. 
        remainingBatches -= troopUpdates[troop.type].promotableBatches;
    });
    // console.log("calculateHighTierPromotableBatches remainingBatches- troopUpdates: ", remainingBatches);

    // if there are remaining batches based on speed ups available after each of the highestTierTroops
    // has had promotableBatches assigned, move on to max out the remaining ones. 
    let index = 0;
    while (remainingBatches > 0) {
        const troop = highestTierTroops[index];
        if (troopUpdates[troop.type].promotableBatches < troopUpdates[troop.type].maxPromotableBatches) {
            troopUpdates[troop.type].promotableBatches += 1;
            remainingBatches -= 1;
        }
        // move to the next troop
        index = (index + 1) % highestTierTroops.length;
    }

    // return the speedup value to minutes for future use
    const remainingSpeedup = remainingBatches * highestTierTroops[0].trainingTime;

    console.log('calculateHighTierPromotableBatches returning troopUpdates: ', troopUpdates)
    console.log('calculateHighTierPromotableBatches returning remainingSpeedup: ', remainingSpeedup)
    return { troopUpdates, remainingSpeedup };
}

export const calculateLowTierPromotableBatches = (troop) => {

}
