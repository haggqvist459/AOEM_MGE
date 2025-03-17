import { POINTS_AND_MULTIPLIERS, RESOURCE_FIELD_MAP, RESOURCE_MULTIPLIERS } from "../../../utils"


export const calculateGatheringScore = (march, fieldType) => {

    let gatheredResources = 0;

    if (fieldType === RESOURCE_FIELD_MAP.RICH) {
        // calculate score
        const cappedYield = Math.min(march.loadCapacity, RESOURCE_MULTIPLIERS.RICH);
        gatheredResources = cappedYield * march.completedTurns;
    } else if (fieldType === RESOURCE_FIELD_MAP.ALLIANCE) {
        // alliance centre logic
        gatheredResources = march.loadCapacity * march.completedTurns;
    } else {
        // regular field logic 
        const cappedYield = Math.min(march.loadCapacity, RESOURCE_MULTIPLIERS.REGULAR);
        gatheredResources = cappedYield * march.completedTurns;
    } 

    console.log("calculateGatheringScore gatheredResources before loadMultiplier: ", gatheredResources)

    // Check if the march has a load bonus 
    if (march.loadBonus) {
        // Apply the loadBonus to the gathered resources
        const loadMultiplier = 1 + (march.loadBonus / 100);

        gatheredResources *= loadMultiplier;
    }

    console.log("calculateGatheringScore gatheredResources after loadMultiplier: ", gatheredResources)

    march.score = Math.floor(gatheredResources / POINTS_AND_MULTIPLIERS.RESOURCE_DIVIDER);
    console.log("calculateGatheringScore march.score before fullAtReset: ", march.score)

    // Check if the march is full at the start of the day, if so add the load capacity onto the score
    if (march.fullAtReset) {
        march.score += Math.floor(march.loadCapacity / POINTS_AND_MULTIPLIERS.RESOURCE_DIVIDER);
    }
    console.log("calculateGatheringScore march.score after fullAtReset: ", march.score)

    return;
}