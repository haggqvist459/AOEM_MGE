export const LOCALSTORAGE_KEY = 'aoem_mge_calc';

export const ROUTES = {
    HOME: '/',
    TOTAL_SCORE: '/totalScore',
    ADMIN: '/admin',
    ABOUT: '/about',
    ERROR: '/*',
}

export const NAVBAR_OPTIONS = {
    HOME: {
        route: ROUTES.HOME,
        id: 1,
        text: 'Calculators'
    },
    TOTAL_SCORE: {
        route: ROUTES.TOTAL_SCORE,
        id: 2,
        text: 'Total Score'
    },
    ADMIN: {
        route: ROUTES.ADMIN,
        id: 4,
        text: 'Admin'
    },
    ABOUT: {
        route: ROUTES.ABOUT,
        id: 5,
        text: 'About'
    },

}



export const DAY_KEYS = {
    DAY_ONE: 'dayOne',
    DAY_TWO: 'dayTwo',
    DAY_THREE: 'dayThree',
    DAY_FOUR: 'dayFour',
    DAY_FIVE: 'dayFive',
    DAY_SIX: 'daySix',
    DAY_SEVEN: 'daySeven'
}

export const TROOP_POWER_MULTIPLIER = {
    'Tier 7': 0,
    'Tier 6': 4,
    'Tier 5': 3,
    'Tier 4': 2,
    'Tier 3': 1,
    'Tier 2': 1,
    'Tier 1': 1,
}

// Tier 4 Power: 
// 1x = 2 
// 5x = 11
// 10x = 22 
// 50x = 110
// 100x = 220
// 500x = 1100

// Tier 5 Power: 
// 1x = 3  
// 5x = 15
// 10x = 29 
// 50x = 145
// 100x = 290
// 500x = 1450
// 1000x = 2900
// 2000x = 5800

// Tier 6 Power: 
// 1x = 4
// 5x = 21
// 10x = 42 
// 50x = 210
// 100x = 420
// 500x = 2100
// 2000x = 



export const TRIBE_LEVEL_MULTIPLIERS = {
    'Level 29-30': 300,
    'Level 25-28': 260,
    'Level 21-24': 220,
    'Level 17-20': 180,
    'Level 13-16': 150,
    'Level 9-12': 100,
    'Level 5-8': 80,
    'Level 1-4': 50,
}

export const TROOP_TIER_MULTIPLIERS = {
    'Tier 7': 100,
    'Tier 6': 50,
    'Tier 5': 20,
    'Tier 4': 10,
    'Tier 3': 5,
    'Tier 2': 3,
    'Tier 1': 2,
}

export const RESOURCE_MULTIPLIERS = {
    LEVEL_SIX_SPEED: 210000,
    LEVEL_SIX_CAP: 3780000,
    RICH_LEVEL_SIX_SPEED: 420000,
    RICH_LEVEL_SIX_CAP: 12600000,
    ALLIANCE_CENTER_SPEED: 250000
}

export const RESOURCE_MULTIPLIER_MAP = {
    hammers: "FINE_CRAFT",
    copperSand: "COPPER_SAND",
    silverSand: "SILVER_SAND",
    fineGold: "FINE_GOLD",
    meteorSteel: "METEOR_STEEL"
};

export const POINTS_AND_MULTIPLIERS = {
    STAMINA_PER_TRIBE: 5,
    STAMINA_DAILY_BOOST: 50,
    STAMINA_DAILY_PREV: 45,
    LEGENDARY_BLUEPRINT: 30000,
    EPIC_MEDAL: 500,
    LEGENDARY_MEDAL: 2500,
    EPIC_SCROLL: 350,
    LEGENDARY_SCROLL: 2500,
    RESOURCE_DIVIDER: 100,
    FIVE_SPIN_COST: 4200,
    SINGLE_SPIN_COST: 900,
    SPEEDUP_BUILDING: 30,
    SPEEDUP_UNIVERSAL: 30,
    SPEEDUP_RESEARCH: 30,
    FINE_CRAFT: 2000,
    COPPER_SAND: 400,
    SILVER_SAND: 1000,
    FINE_GOLD: 3000,
    METEOR_STEEL: 20000,
    POWER_BUILDING: 3,
    POWER_RESEARCH: 6,
    POWER_TRAINING: 3
}


