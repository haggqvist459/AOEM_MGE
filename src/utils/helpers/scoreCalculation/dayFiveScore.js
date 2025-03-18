import { convertToSeconds, convertFromSeconds, TROOP_TIER_MULTIPLIERS } from '../../../utils';


export const calculatePromotableBatches = (troops, initialTrainingSpeedup) => {
    let remainingTrainingSpeedup = convertToSeconds(initialTrainingSpeedup);

    // Reset batch values before calculations
    resetTroopBatchValues(troops);

    // Sort troops into higher and lower tier groups based on their promotion tier.
    let higherTierTroops = sortTroopsByTier(troops);
    // console.log("troopGroup before batch calculation:", higherTierTroops);
    // console.log("Remaining training speedup:", remainingTrainingSpeedup);
    // Allocate batches for higher-tier troops first.
    remainingTrainingSpeedup = calculateAvailableBatches(higherTierTroops, remainingTrainingSpeedup);

    let convertedRemainingSpeedup = convertFromSeconds(remainingTrainingSpeedup)
    // console.log("remainingTrainingSpeedup after highTier distribution: ", convertedRemainingSpeedup)

    return remainingTrainingSpeedup;
};

const calculateAvailableBatches = (troopGroup, trainingSpeedup) => {
    let remainingSpeedup = trainingSpeedup;


    if (!troopGroup || Object.keys(troopGroup).length === 0) {
        console.warn("Warning: troopGroup is empty or undefined in calculateAvailableBatches");
        return trainingSpeedup; // Return remaining speedup without doing anything
    }
    // Step 1: Compute the max promotable batches per troop
    Object.values(troopGroup).forEach(troop => {
        if (!troop.availableTroops || !troop.promotedTroopsPerBatch || troop.promotedTroopsPerBatch <= 0) {
            troop.maxPromotableBatches = 0;
            return;
        }

        // Calculate max batches based on troop availability
        troop.maxPromotableBatches = Math.floor(troop.availableTroops / troop.promotedTroopsPerBatch);

    });

    // Step 2: Distribute batches evenly across troops
    let troopTypes = Object.keys(troopGroup);
    let distributed = true; // Tracks if at least one troop received a batch in the last round

    while (remainingSpeedup > 0 && distributed) {
        distributed = false; // Reset for each iteration

        for (let troopType of troopTypes) {
            const troop = troopGroup[troopType];
            const trainingTimeInSeconds = convertToSeconds(troop.trainingTime);

            // Skip troops that are already maxed out or have no valid training time
            if (!trainingTimeInSeconds || troop.promotableBatches >= troop.maxPromotableBatches) continue;

            // Assign only **one** batch per iteration (round-robin distribution)
            if (remainingSpeedup >= trainingTimeInSeconds) {
                troop.promotableBatches += 1;
                remainingSpeedup -= trainingTimeInSeconds;
                distributed = true; // Mark that at least one troop received a batch
            }
        }
    }

    return remainingSpeedup; // Return remaining speedup for further processing
};



const sortTroopsByTier = (troops) => {
    // console.log("Initial Troops:", JSON.stringify(troops, null, 2));

    // Step 1: Remove troops with missing or empty values
    let validTroops = Object.entries(troops).filter(([_, troop]) =>
        troop.targetTier && troop.baseTier && troop.availableTroops && troop.promotedTroopsPerBatch
    );

    // console.log("Valid Troops After Filtering:", JSON.stringify(validTroops, null, 2));

    // Step 2: Find the highest target tier dynamically
    const highestTargetTier = Math.max(...validTroops.map(([_, troop]) => troop.targetTier || 0));

    // Step 3: Keep only troops with the highest target tier
    let higherTierTroops = validTroops.filter(([_, troop]) => troop.targetTier === highestTargetTier);

    // console.log("Troops with highest target tier:", JSON.stringify(higherTierTroops, null, 2));

    // // Step 4: Use the object literal to find the valid lower base tier
    // const expectedBaseTier = getLowerTierValue(highestTargetTier);

    // console.log("Expected Base Tier:", expectedBaseTier);

    // // Step 5: Keep only troops where the base tier matches the correct lower tier
    // higherTierTroops = higherTierTroops.filter(([_, troop]) => troop.baseTier === expectedBaseTier);

    // console.log("Final higherTierTroops:", JSON.stringify(higherTierTroops, null, 2));

    return Object.fromEntries(higherTierTroops);
};







// Reset the batch values for each troop before calculations.
const resetTroopBatchValues = (troops) => {
    Object.values(troops).forEach(troop => {
        troop.promotableBatches = 0;
        troop.maxPromotableBatches = 0;
    });
};










export const calculateTroopPromotionScore = (troopGroup) => {
    let totalTroopPromotionScore = 0;
    let updatedTroopGroup = { ...troopGroup };

    // Reset score for each troop before calculations
    Object.values(updatedTroopGroup).forEach(troop => {
        troop.troopTotalScore = 0;
    });


    Object.entries(updatedTroopGroup).forEach(([troopType, troop]) => {
        // Skip troops with 0 promotableBatches
        if (!troop.promotableBatches || troop.promotableBatches <= 0) {
            updatedTroopGroup[troopType] = { ...troop, troopTotalScore: 0 };
            return;
        }

        const scorePerTroop = (troop.targetTier - troop.baseTier) * troop.promotedTroopsPerBatch;

        updatedTroopGroup[troopType] = {
            ...troop,
            troopTotalScore: scorePerTroop * troop.promotableBatches
        };

        totalTroopPromotionScore += updatedTroopGroup[troopType].troopTotalScore;
        console.log(`${troopType} Score Updated: ${updatedTroopGroup[troopType].troopTotalScore}`);
    });

    console.log(`Total Troop Promotion Score: ${totalTroopPromotionScore}`);
    return {
        updatedTroops: updatedTroopGroup,
        promotionScore: totalTroopPromotionScore
    };
};



export const calculateTrainingScore = (troopTier, troopsPerBatch, trainingTime, remainingSpeedup) => {

    // calculate number of completed batches
    const completedBatches = Math.floor(remainingSpeedup / trainingTime);
    // calculate the score per batch
    const scorePerBatch = troopTier * troopsPerBatch
    // multiply with number of batches completed and return the value 
    return scorePerBatch * completedBatches;
}










// Function to find the tier value directly below the given target tier
const getLowerTierValue = (targetTierValue) => {
    const tierEntries = Object.entries(TROOP_TIER_MULTIPLIERS);
    console.log("Sorted Tiers:", Object.entries(TROOP_TIER_MULTIPLIERS));
    console.log("Looking for base tier of:", targetTierValue);

    for (let i = 0; i < tierEntries.length; i++) {
        if (tierEntries[i][1] === targetTierValue) {
            return i < tierEntries.length - 1 ? tierEntries[i + 1][1] : null; // Return the value of the tier directly below
        }
    }
    return null; // No lower tier exists
};
