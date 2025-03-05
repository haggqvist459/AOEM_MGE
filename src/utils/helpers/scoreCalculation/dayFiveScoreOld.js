
const sortTroopsByTier = (troops) => {
    console.log("Initial Troops:", JSON.stringify(troops, null, 2));

    // Step 1: Filter out invalid data
    let validTroops = Object.entries(troops)
        .filter(([_, troop]) => troop.targetTier && troop.baseTier);
    
    console.log("After Filtering Invalid Troops:", JSON.stringify(validTroops, null, 2));

    // Step 2: Sort primarily by target tier, then by base tier
    validTroops.sort((a, b) => {
        const troopA = a[1];
        const troopB = b[1];

        // Primary: Sort by highest target tier
        if (troopB.targetTier !== troopA.targetTier) {
            return troopB.targetTier - troopA.targetTier;
        }

        // Secondary: If target tiers match, sort by highest base tier
        return troopB.baseTier - troopA.baseTier;
    });

    console.log("After Sorting by Target & Base Tier:", JSON.stringify(validTroops, null, 2));

    // Step 3: Identify the highest and second-highest target tiers
    const uniqueTargetTiers = [...new Set(validTroops.map(([_, troop]) => troop.targetTier))];
    const highestTargetTier = uniqueTargetTiers[0];
    const secondHighestTargetTier = uniqueTargetTiers[1] || null;

    console.log("Highest Target Tier:", highestTargetTier, "Second Highest:", secondHighestTargetTier);

    // Step 4: Only allow promotions from `targetTier - 1`
    let filteredTroops = validTroops.filter(([_, troop]) => troop.baseTier === troop.targetTier - 1);

    console.log("After Filtering Base Tier Mismatch:", JSON.stringify(filteredTroops, null, 2));

    // Step 5: If two target tiers exist, prioritize the highest target tier
    filteredTroops = filteredTroops.filter(([_, troop]) => troop.targetTier === highestTargetTier || !secondHighestTargetTier);

    console.log("Final Sorted Troops:", JSON.stringify(filteredTroops, null, 2));

    // Convert back to an object
    return Object.fromEntries(filteredTroops);
};
// BREAK,  OLDER CODE UNDER HERE



// calculate the number of available batches of troops ready to promote 
const calculateAvailableBatchesOld = (trainingSpeedup, trainingTime) => {

    const totalBatchesAvailable = trainingSpeedup / trainingTime;
    const decimalCarryOver = totalBatchesAvailable % 1; // Extract decimal part
    return {
        totalBatchesAvailable: Math.floor(totalBatchesAvailable),
        decimalCarryOver
    }

}



// Day Five Score calculation 

// convert  the training time back into minutes
const reverseBatchCalculation = (remainingBatches, trainingTime, decimalCarryOver) => {
    return (remainingBatches * trainingTime) + (decimalCarryOver * trainingTime);
}



export const calculatePromotableBatchesOld = (highestTierTroops, lowerTierTroops, trainingSpeedup) => {
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

// reset the batch values
const resetPromotableBatches = (troopGroup) => {
    Object.values(troopGroup).forEach(troop => {
        troop.maxPromotableBatches = Math.floor(troop.availableTroops / troop.promotedTroopPerBatch);
        troop.promotableBatches = 0;
    });
};




const sortTroopsByTierOld = (troops) => {
    let higherTierTroops = {};
    let lowerTierTroops = {};

    // Determine the highest targetTier among all troops
    const highestTargetTier = Math.max(...Object.values(troops).map(troop => troop.targetTier));

    // Sort troops into higher or lower tier groups
    Object.keys(troops).forEach(troopType => {
        const troop = troops[troopType];

        // Ensure troop data is valid
        if (!troop || typeof troop !== "object") return;

        // Extract required properties
        const { availableTroops, promotedTroopsPerBatch } = troop;

        // Validate troop input data
        if (availableTroops === '' || promotedTroopsPerBatch === '' || isNaN(availableTroops) || isNaN(promotedTroopsPerBatch)) {
            console.log("Skipping troop due to invalid input:", troopType);
            return;
        }

        // Categorize troop based on target tier
        if (troop.targetTier === highestTargetTier && !(troopType in higherTierTroops)) {
            higherTierTroops[troopType] = troop;
            console.log("sortTroopsByTier - Added to higherTierTroops:", troopType);
        } else {
            lowerTierTroops[troopType] = troop;
            console.log("sortTroopsByTier - Added to lowerTierTroops:", troopType);
        }
    });

    return { higherTierTroops, lowerTierTroops };
};
// Determines the number of full troop batches that can be promoted within the given training speedup.
// Also extracts any fractional remainder that may carry over.
const calculateBatchValues = (trainingSpeedup, trainingTime) => {
    if (trainingSpeedup <= 0 || trainingTime <= 0) {
        return { totalBatchesAvailable: 0, decimalCarryOver: 0 };
    }

    const totalBatchesAvailable = Math.floor(trainingSpeedup / trainingTime);
    const decimalCarryOver = (trainingSpeedup / trainingTime) % 1; // Extract decimal part

    return { totalBatchesAvailable, decimalCarryOver };
};



export const calculateTroopPromotionScoreOld = (troopGroup) => {
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
        promotionScore: totalTroopPromotionScore
    };
};
















