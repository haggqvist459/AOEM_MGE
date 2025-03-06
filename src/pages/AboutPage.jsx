import React from 'react'
import { DayContainer, FormHeader, FormSubHeader } from '../components'


const AboutPage = () => {
  return (
    <DayContainer>
      <FormHeader title={'<aboutTitle>'} />
      <div className='w-full md:w-1/2 mx-auto flex flex-col text-center pb-3'>
        <FormSubHeader size={'text-md lg:text-lg'} title={'The calculators'} />
        <p>
          The daily calculators on this website are based on observations from the game.
        </p>
        <p>
          Every effort is made to keep the calculators up-to-date and accurate, no guarantee can be given for the results.
        </p>
        <FormSubHeader size={'text-md lg:text-lg'} title={'The data'} className={'mt-2'} />
        <p>
          This website does not use cookies, and does not gather any data about you or your usage aside from what you input into the calculators.
        </p>
        <p>
          The website utilises a web API called  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target='_blank' className='underline text-s text-blue-950'>localStorage</a> to store the data between sessions.
        </p>
        <p>
          This means that your calculator data is stored in your browser.
          If you want to clear the data, you can erase your browser history or head over to the admin page and hit delete.
        </p>
        <p>You can move your calculator data between devices by exporting it into a .txt file on the admin page, and then import it again on the next device. </p>
        <FormSubHeader size={'text-md lg:text-lg'} title={'The website'} className={'mt-2'} />
        <p>
          This website is player-made and is not in any way affilated or sponsored by any official developer entity, or party related to Age of Empires Mobile.
        </p>
        <p>
          All trademarks and game content belong to their respective owners.
        </p>
      </div>
    </DayContainer>
  )
}

export default AboutPage

