import React from 'react'
import { DayContainer, FormHeader, FormSubHeader } from '../components'

const Strategy = () => {
    return (
        <DayContainer className={'pb-5'}>
            <FormHeader title={'M.G.E. Strategy'} showTrash={false} />
            <div className='w-full md:w-3/5 mx-auto'>
                <p className='text-sm lg:text-lg text-neutral-900 font-medium text-center'>
                    This page contains some basic strategy tips on how to maximise your points. <br />
                    As a free-to-play in Age of Empires Mobile, getting a good score in M.G.E is all about squeezing
                    every bit of free point from every day in order to secure a hero you otherwise can not obtain.
                    At the end of the week, the difference between 8th place and 12th may just be a few million points,
                    and if you have maximised, you may be the person who ends up in the higher spot.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
                <div>
                    <FormSubHeader title={'Day one'} size='text-lg lg:text-xl' />
                    <p>Tribe hunting is quite simple, the only tips for today is to remember to use the limited time assignment for citizens for 50 free stamina</p>
                    <p>The second tip for day one, is to ensure your stamina is full just before the day starts. Hunt one tribe and claim the daily stamina supply.</p>
                    <p>This will take your stamina to 45 past the limit, ensuring you can hunt 9 more tribes at the start of the day.</p>
                </div>
                <div>
                    <FormSubHeader title={'Day two'} size='text-lg lg:text-xl' />
                    <p>
                        Day two is a day that can be greatly maximised with a bit of patience.
                        Saving all epic and legendary medals for heroes that are not used is a great option.
                        This can be taken very far, by saving all skill scrolls and medals the score here can be increased greatly.
                    </p>
                    <p>
                        With a bit of simple calculation, you can also figure out when to start forging for free points.
                        For example, if it takes around 24 hours for you to complete a legendary blueprint and you have 4 slots,
                        by starting forging on Friday or Thursday the week before and only claiming the completed equipment pieces on the second day of M.G.E,
                        You'll get some free points before spending those hoarded speed-ups.
                    </p>
                </div>
                <div>
                    <FormSubHeader title={'Day three'} size='text-lg lg:text-xl' />
                    <p>
                        There's not much to say for day three. With a great deal of discipline and several times on your phone,
                        if you restart your gathering troops without them returning to your citadel, you can fill them up in the field by walking from resource point to resource point.
                        Depending on your troops load capacities, you could potentially get up to a million points at the start of the day before sending the troops out to gather again.
                    </p>
                    <p>
                        Save your empire coins for today. And spend them all. Do not use the medals you obtain right away though, you can receive points for them on day seven. 
                    </p>
                </div>
                <div>
                    <FormSubHeader title={'Day four'} size='text-lg lg:text-xl' />
                    <p>
                        Spend all those hoarded speed-ups. Big note to remember, is that the bonus from a financial officer title will only
                        apply in the region of the city where you are appointed. Don't stay in Kingsland if you have been appointed in Tinir.
                    </p>
                    <p>
                        Depending again on discipline, there are loads of points obtainable by saving planishing hammers and copper/silver sand for ring upgrades.
                        Saving hammers for a month or two, crafting and upgrading rings can also yield between half a million or up to a million points, depending on for how long you have saved.
                    </p>
                    <p>
                        One very important note here is to not finish the last research, and the last couple of buildings. Make sure to leave them with a day or two remaining,
                        to get points for their completion on day six or seven. And remember to leave your trained or promoted troops in their buildings, don't claim too many on this day. As with everything in the game,
                        points are calculated when you claim the troops, building or research, not when they complete.
                    </p>
                </div>
                <div>
                    <FormSubHeader title={'Day five'} size='text-lg lg:text-xl' />
                    <p>
                        Get that instructor title, hop to the region you're appointed in and start training. Hopefully your barracks and other buildings had full batches of promoted troops ready to be claimed.
                    </p>
                    <p>
                        The most efficient path to score points on day five is to promote troops from one tier below your max tier. For example, if you have tier seven troops, promoting form tier six will be most efficent.
                        The same goes if your max tier is six, promoting from tier five is most efficient.
                    </p>
                    <p>
                        The second most efficient scoring path on day five is to train fresh troops to your max tier. In other words, when you are not participating in M.G.E. for a shot at top ten, train troops
                        at one tier below your maximum, in order to get the most points. And remember, if you at the end of your training spree are left with troops that will not fully complete, do not claim them until day 6,
                        for that extra next day boost.
                    </p>
                </div>
                <div>
                    <FormSubHeader title={'Day six and seven'} size='text-lg lg:text-xl' />
                    <p>
                        M.G.E. is mostly determined on day five, with day four being the second msot important day. Hopefully the prior week of maximising has given you a great chance at a top ten spot, and Hopefully
                        you left your building and research queues unclaimed until these days. Since tribe hunting gives score again on day seven, remember to use the stamina trick from day one again on day six.
                        Day six is also all about resource gathering, fill up your troops again by walking from resource field to resource field without returning, and you can gain another serious amount of points for day seven.
                    </p>
                    <p>
                        If you spun the wheel on day three, and hopefully obtain a bunch of medals, day seven is the day to use them. 
                    </p>
                </div>
            </div>

        </DayContainer>
    )
}

export default Strategy