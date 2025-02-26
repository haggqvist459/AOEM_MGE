
// Day Five Score calculation 
//distribute the available speed ups in batches across the troop groups
const distributeBatches = (troopGroup, totalBatchesAvailable) => {
    let troopKeys = Object.keys(troopGroup);

    troopKeys.forEach(troopType => {
        const troop = troopGroup[troopType];

        // Reset values so they can be recalculated. 
        troop.maxPromotableBatches = Math.floor(troop.availableTroops / troop.promotedTroopPerBatch);
        troop.promotableBatches = 0; // Reset before assigning

    });

    // Distribute batches evenly among all troop types
    while (totalBatchesAvailable > 0) {
        let distributed = false;

        troopKeys.forEach(troopType => {
            const troop = troopGroup[troopType];

            if (totalBatchesAvailable > 0 && troop.promotableBatches < troop.maxPromotableBatches) {
                troop.promotableBatches += 1;
                totalBatchesAvailable -= 1;
                distributed = true;

            }
        });

        // Stop if no more batches can be distributed
        if (!distributed) break;
    }

    // console.log("Troop group after distribution:", JSON.stringify(troopGroup, null, 2));
    return totalBatchesAvailable; // Return remaining batches for lower tier troops
};

// calculate the number of available batches of troops ready to promote 
const calculateAvailableBatches = (trainingSpeedup, trainingTime) => {

    const totalBatchesAvailable = trainingSpeedup / trainingTime;
    const decimalCarryOver = totalBatchesAvailable % 1; // Extract decimal part
    return {
        totalBatchesAvailable: Math.floor(totalBatchesAvailable),
        decimalCarryOver
    }

}

// convert  the training time back into minutes
const reverseBatchCalculation = (remainingBatches, trainingTime, decimalCarryOver) => {
    return (remainingBatches * trainingTime) + (decimalCarryOver * trainingTime);
}

// reset the batch values
const resetPromotableBatches = (troopGroup) => {
    Object.values(troopGroup).forEach(troop => {
        troop.maxPromotableBatches = Math.floor(troop.availableTroops / troop.promotedTroopPerBatch);
        troop.promotableBatches = 0;
    });
};

export const calculatePromotableBatches = (highestTierTroops, lowerTierTroops, trainingSpeedup) => {
    if (!highestTierTroops || Object.keys(highestTierTroops).length === 0) return { highestTierTroops, remainingSpeedup: trainingSpeedup };

    const highestTierTrainingTime = Object.values(highestTierTroops)[0].trainingTime;
    const lowerTierTrainingTime = lowerTierTroops && Object.keys(lowerTierTroops).length > 0
        ? Object.values(lowerTierTroops)[0].trainingTime
        : 0;
    let totalBatchesAvailable
    let decimalCarryOver

    // Reset batch values for both troop groups at the start of each calculation
    resetPromotableBatches(highestTierTroops);
    if (lowerTierTroops && Object.keys(lowerTierTroops).length > 0) {
        resetPromotableBatches(lowerTierTroops);
    }

    ({ totalBatchesAvailable, decimalCarryOver } = calculateAvailableBatches(trainingSpeedup, highestTierTrainingTime));
    console.log("totalBatchesAvailable: ", totalBatchesAvailable);

    // calculate the number of high-tier batches can be promoted
    totalBatchesAvailable = distributeBatches(highestTierTroops, totalBatchesAvailable);
    console.log('totalBatchesAvailable remaining after high-tier distribution: ', totalBatchesAvailable);

    // reverse speedup calculation to allow for accurate lower tier calculation
    if (totalBatchesAvailable > 0) {
        trainingSpeedup = reverseBatchCalculation(totalBatchesAvailable, highestTierTrainingTime, decimalCarryOver);
    } else {
        trainingSpeedup = 0;
    }

    // proceed with lower tier promotion if speed up time remain
    if (trainingSpeedup > 0) {
        console.log("distribute to lower tiers");
        ({ totalBatchesAvailable, decimalCarryOver } = calculateAvailableBatches(trainingSpeedup, lowerTierTrainingTime));
        totalBatchesAvailable = distributeBatches(lowerTierTroops, totalBatchesAvailable);
    }



    // if there is any remaining speedup, turn it back into minutes
    if (totalBatchesAvailable > 0) {
        trainingSpeedup = reverseBatchCalculation(totalBatchesAvailable, lowerTierTrainingTime, decimalCarryOver)
    }

    return {
        updatedHighestTierTroops: highestTierTroops,
        updatedLowerTierTroops: lowerTierTroops,
        remainingSpeedup: trainingSpeedup
    };
}

export const calculateTroopPromotionScore = (troopGroup) => {
    let totalTroopPromotionScore = 0;
    let updatedTroopGroup = { ...troopGroup };

    Object.entries(updatedTroopGroup).forEach(([troopType, troop]) => {
        if (troop.promotableBatches > 0) {
            // Calculate the score per troop
            const scorePerTroop = (troop.targetTier - troop.baseTier) * troop.promotedTroopPerBatch;
            // Calculate total score for this troop type
            updatedTroopGroup[troopType] = {
                ...troop,
                troopTotalScore: scorePerTroop * troop.promotableBatches
            };
            // Accumulate total score across all troop types
            totalTroopPromotionScore += updatedTroopGroup[troopType].troopTotalScore;
        } else {
            // Reset score if no batches are promoted
            updatedTroopGroup[troopType] = { ...troop, troopTotalScore: 0 };
        }

        // Debugging log (optional)
        console.log(`${troopType} Score Updated: ${updatedTroopGroup[troopType].troopTotalScore}`);
    });

    console.log(`Total Troop Promotion Score: ${totalTroopPromotionScore}`);
    return { 
        updatedTroops: updatedTroopGroup, 
        promotionScore: totalTroopPromotionScore };
};



