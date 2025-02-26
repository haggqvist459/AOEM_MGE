import { convertToSeconds, convertFromSeconds, validateInputForCalculation } from '../../../utils'

// Day Two Score calculation
export const calculateForgingScore = (blueprints, blueprintMultiplier, forgingTime, forgingSpeedup) => {

    console.log("calculateForgingScore blueprints: ",blueprints );
    console.log("calculateForgingScore blueprintMultiplier: ", blueprintMultiplier);
    console.log("calculateForgingScore forgingTime: ", JSON.parse(JSON.stringify(forgingTime)) );
    console.log("calculateForgingScore forgingSpeedup: ", JSON.parse(JSON.stringify(forgingSpeedup)));

    //convert the time values into minutes for calculation
    const forgingTimeMinutes = convertToSeconds(forgingTime);
    let forgingSpeedupMinutes = convertToSeconds(forgingSpeedup);

    console.log("calculateForgingScore forgingTimeMinutes: ", forgingTimeMinutes);
    console.log("calculateForgingScore forgingSpeedupMinutes: ", forgingSpeedupMinutes);

    //  validate the inputs 
    if (isNaN(blueprints) || isNaN(blueprintMultiplier) || forgingTimeMinutes <= 0) {
        console.error("Invalid input values for forging score calculation.");
        return { score: 0, completedBlueprints: 0, remainingBlueprints: blueprints, remainingSpeedup: forgingSpeedup };
    }

    //determine the number of blueprints that can be completed based on the available speedups
    let completedBlueprints = Math.min(blueprints, Math.floor(forgingSpeedupMinutes / forgingTimeMinutes));
    console.log("calculateForgingScore completedBlueprints: ", completedBlueprints);



     // Calculate remaining blueprints and remaining speed-up time
     const remainingBlueprints = blueprints - completedBlueprints;
     forgingSpeedupMinutes -= completedBlueprints * forgingTimeMinutes;

     console.log("calculateForgingScore remainingBlueprints: ", remainingBlueprints);
     console.log("calculateForgingScore forgingSpeedupMinutes: ", forgingSpeedupMinutes);
 
     // Convert remaining minutes back to time format
     const remainingSpeedup = forgingSpeedupMinutes > 0 ? convertFromSeconds(forgingSpeedupMinutes) : { days: 0, hours: 0, minutes: 0 };
 
     console.log("calculateForgingScore remainingSpeedup: ", remainingSpeedup);

     // Calculate the total score
     const score = completedBlueprints * blueprintMultiplier;
     console.log("calculateForgingScore  score: ", score);
 
     return { score, completedBlueprints, remainingBlueprints, remainingSpeedup };
    
    
}