import React, { useState, useEffect } from 'react'

import { ScrollEvents, Event } from './scrollevent/component';
import Chapter from './chapter/component';
import Stage from './stage/index'

import './styles.scss'

var dateFormat = require("dateformat");


function T(props)
{
  if(props.lng === 'de')
    return props.de
  else
    return props.en;
}

function App() {
  const [callEvent, setcallEvent] = useState(null);
  const [lng, setLng] = useState('en');

  useEffect(() => {
    // Set  Language
    var language = window.navigator.userLanguage || window.navigator.language;
    if(['de-ch', 'de-de', 'de-at', 'de-li', 'de-lu', 'de'].includes(language.toLowerCase()))
      setLng('de')
  }, []);

  useEffect(() => {
    if(lng === 'de')
    {
      dateFormat.i18n = {
        monthNames: [
          "Jan", "Feb", "Mär","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
          "Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"
        ]
      };
    }
    else
    {
      dateFormat.i18n = {
        monthNames: [
          "Jan", "Feb", "Mär","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
          "January","Feburary","March","April","May","June","July","August","September","October","November","December"
        ]
      };
    }
  }, [lng])

  return (
    <div>
      <div className='language'>
        <span id='lng_de' onClick={() => setLng('de')}>de</span> | <span id='lng_en'  onClick={() => setLng('en')}>en</span>
      </div>

      <header>
        <div className='title'>
          <h1>
            <T lng={lng}
              de="1000 Tote"
              en="1000 Dead"
            />
          </h1>
          <h2>
            <T lng={lng}
              de="Am 15. März stirbt in Zürich die erste Person an Corona. Diese Woche meldet der Kanton das tausendste Corona-Opfer. So wütete das Virus."
              en="March 15th: The first Zurich citizen dies of covid-19. This week the State reports the thousandth victim. This is how the virus raged here."
            />
          </h2>
        </div> 
      </header>

      <div className='daycounter'>13. März</div>

      <div className='content'>

        {/* Spacer */}
        <div style={{width: '100%', height: '50px'}} />

        <ScrollEvents 
          eventParams={[]}
          options={{ fireOnce: false, active: true }}>

          <Chapter style={{paddingTop: 0}}>
            <T lng={lng}
              de="Coronas erstes Zürcher Opfer: Männlich, 88-jährig, vorerkrankt, Behandlung auf eigenen Wunsch nur Palliativ."
              en="First victim of corona: Male, 88 years old, pre-existing conditions, no life prolonging measures as he requested."
            />
          </Chapter>

          <Event id='chapter_one'  event={() => setcallEvent('chapter_one')}>
            <Chapter>
              <T lng={lng}
                de="Er sollte nicht lange das einzige Opfer bleiben. In bisher zwei Wellen brach Corona über Zürich herein. Was Sie hier sehen: Jede verstorbene Person. Ein Turm entspricht dabei einem Tag. Beginnen wir mit der ersten Welle."
                en="He would not be the only victim for a long time. Zurich had to deal with two waves - so far. Here you are able to see each of the 1000 victims. Each pile represents one day. But let us start with the first wave."
              />
            </Chapter>
          </Event>

          <Event id='wave1start' event={() => setcallEvent('chapter_two')}>
            <Chapter>
              <T lng={lng}
                de="Die erste Welle lief langsam an. Zuerst nur vereinzelte Todesfälle, neun Tage nach dem ersten Fall steigt die Kurve plötzlich an. Einschneidende Massnahmen werden beschlossen. Die Ansteckungskette ist gebrochen. Vorerst."
                en="It started slowly. At first there were only a few casualties. But nine days after the first victim, the curve starts rising. Drastic restrictions are set in place, followed by a lockdown. The chain of contagion is interrupted. For the time being."
              />              
            </Chapter>
          </Event>

          <Event id='wave1end' event={() => setcallEvent('endof1wave')}>
            <Chapter>
              <T lng={lng}
                de="Die erste Welle dauerte bis Anfang Mai und forderte das Leben von rund 126 Zürcherinnen und Zürcher. Der Kanton atmete auf, man schien mit einem blauen Auge davongekommen zu sein. Strassen füllen sich wieder, Geschäfte öffneten ihre Türen und aus Restaurants dringen die Geräusche des Lebens. Während des Sommers blieb es ruhig, nur vereinzelte sterben Menschen am Coronavirus."
                en="The first wave lasted until the beginning of May and claimed the lives of around 126 Zurich residents. The canton breathed a sigh of relief; it seemed to have escaped with a black eye. Streets filled up again, stores opened their doors and the sounds of life emanated from restaurants. During the summer, things remained quiet with only a few people dying from the coronavirus."
              />               
            </Chapter>
          </Event>
          
          <Event id='wave2start' event={() => setcallEvent('startof1wave')}>
            <Chapter>
              <T lng={lng}
                de="Das ändert sich Ende Oktober schlagartig. Während die Temperaturen fallen steigen die Infektionszahlen. Und auf die Neuinfektionen folgen die Spitalaufenthalte. Und auf die Spitalaufenthalte die Toten. Die zweite Welle bricht erbarmungslos über den Kanton herein und sie sollte die erste bei weitem übertreffen."
                en="This changes abruptly at the end of october. As temperatures fall, the number of infections rises. And the new infections are followed by hospitalizations. And the hospitalizations are followed by deaths. The second wave breaks mercilessly over the canton and it should exceed the first by far."
              />               
            </Chapter>
          </Event>

          <Event id='wave2topdayfirstwave' event={() => setcallEvent('wave2topdayfirstwave')}>
            <Chapter>
              <T lng={lng}
                de="Bereits nach wenigen Wochen, am 2. November, überschreiten wir den Höchstwert aus der erste Welle – neun Personen sterben an einem einzigen Tag. Es ist ebenfalls jene Woche, in der die statistisch erwartbare Sterblichkeit der über 65-jährigen erneut überschritten wird. Ein Zeichen, dass Corona keine normale Grippe ist."
                en="After just a few weeks, on November 2nd, the peak value from the first wave is exceeded. Nine people die in one single day. This is also the week in which the statistically expected mortality of those over 65 is exceeded. Again. One sign that Corona is not «just like a normal flu»."
              /> 
            </Chapter>
          </Event>
          
          <Event id='wave2day253' event={() => setcallEvent('wave2day253')}>
            <Chapter>
              <T lng={lng}
                de="23. November: Erneut ein neuer Rekord, 15 Menschen sterben alleine an diesem Tag."
                en="23th of november: Once again a new sad record: 15 people die on this day."
              /> 
            </Chapter>
          </Event>
          
          <Event id='wave2day261' event={() => setcallEvent('wave2day261')}>
            <Chapter>
              <T lng={lng}
                de="Acht Tage später: 19 Todesfälle an einem Tag."
                en="Eight days later: 19 people die in a single day."
              />
            </Chapter>
          </Event>
          
          <Event id='wave2day270' event={() => setcallEvent('wave2day270')}>
            <Chapter>
              <T lng={lng}
                de="Draussen leuchten die Adventslichter, in den Notaufnahmen werden die Betten knapp.  Am 10. Dezember wird der Rekord erneut gebrochen: 21 Todesopfer an einem Tag."
                en="Outside the Advent lights are shining, in the emergency rooms beds are getting scarce.  On December 10, the record is broken again: 21 fatalities in one day."
              />
            </Chapter>
          </Event>
          
          <Event id='wave2day280' event={() => setcallEvent('wave2day280')}>
            <Chapter>
              <T lng={lng}
                de="Vier Tage vor Heiligabend meldet der Kanton den vorläufigen Höhepunkt: 25 Todesopfer. Auch die statistische Sterblichkeit ist mit 332.5 Todesfällen pro Woche deutlich über dem normalen Wert."
                en="Four days before Christmas Eve, the canton reports the preliminary peak: 25 fatalities. Moreover the total mortality of 332.5 is well above normal."
              />
            </Chapter>
          </Event>
          
          <Event id='wave2day299' event={() => setcallEvent('wave2day299')}>
            <Chapter>
              <T lng={lng}
                de="Freitag, der 8. Januar. An diesem Tag stirbt der tausendste Zürcher. Erst drei Tage später, nach dem Wochenende, wissen dies die Behörden. Gleichzeitig kommuniziert der Kanton, wie in Pflege- und Altersheimen geimpft werden soll. Ein Hoffnungsschimmer."
                en="Friday, 8th of january: Covid-19 causes the death of the thousandth Zurich resident. It will be three days later, after the weekend, when the administration will communicate it. At the same time, the canton communicates how vaccination is to be carried out in nursing and old people's homes. A glimmer of hope."
              />
            </Chapter>
          </Event>

        </ScrollEvents>
      </div>

      <footer>
        Contact: <a href='https://www.journalist.sh'>journalist.sh</a><br />
        Source Code: <a href='https://github.com/simonhuwiler/1000dead'>GitHub</a>
      </footer>

      
      <Stage callEvent={callEvent}/>

    </div>);
}

export default App;
