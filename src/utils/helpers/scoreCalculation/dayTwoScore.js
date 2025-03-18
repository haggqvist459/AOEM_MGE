import { convertToSeconds, convertFromSeconds } from '../../../utils'

// Day Two Score calculation
export const calculateForgingScore = (blueprints, blueprintMultiplier, forgingTime, forgingSpeedup) => {

    console.log("calculateForgingScore blueprints: ",blueprints );
    console.log("calculateForgingScore blueprintMultiplier: ", blueprintMultiplier);
    console.log("calculateForgingScore forgingTime: ", forgingTime);
    console.log("calculateForgingScore forgingSpeedup: ", forgingSpeedup);


    //determine the number of blueprints that can be completed based on the available speedups
    let completedBlueprints = Math.min(blueprints, Math.floor(forgingSpeedup / forgingTime));
    console.log("calculateForgingScore completedBlueprints: ", completedBlueprints);



     // Calculate remaining blueprints and remaining speed-up time
     const remainingBlueprints = blueprints - completedBlueprints;
     forgingSpeedup -= completedBlueprints * forgingTime;

     console.log("calculateForgingScore remainingBlueprints: ", remainingBlueprints);
     console.log("calculateForgingScore forgingSpeedup: ", forgingSpeedup);
 
     // Convert remaining minutes back to time format
     const remainingSpeedup = forgingSpeedup > 0 ? convertFromSeconds(forgingSpeedup) : { days: 0, hours: 0, minutes: 0 };
 
     console.log("calculateForgingScore remainingSpeedup: ", remainingSpeedup);

     // Calculate the total score
     const score = completedBlueprints * blueprintMultiplier;
     console.log("calculateForgingScore  score: ", score);
 
     return { score, completedBlueprints, remainingBlueprints, remainingSpeedup };
    
    
}