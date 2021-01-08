import React, { useState, useEffect } from 'react'

import { ScrollEvents, Event } from './scrollevent/component';
import Chapter from './chapter/component';
import Stage from './stage/index'

import './styles.scss'

function App() {
  const [callEvent, setcallEvent] = useState(null);

  return (
    <div>

      <header>
        <div className='title'>
          <h1>1000 Dead</h1>
          <h2>Am 15. März stirbt in Zürich die erste Person an Corona. Diese Woche meldet der Kanton das tausendste Corona-Opfer. So wütete Corona.</h2>
        </div> 
      </header>

      <div className='daycounter'>13. März</div>

      <div className='content'>

        {/* Spacer */}
        <div style={{width: '100%', height: '50px'}} />

        <ScrollEvents 
          eventParams={[]}
          options={{ fireOnce: false, active: true }}>
          <Event id='bla'  event={() => setcallEvent('chapter_one')}>
            <Chapter style={{paddingTop: 0}}>
              Coronas erstes Zürcher Opfer: Männlich, 88-jährig, vorerkrankt, Behandlung auf eigenen Wunsch nur Palliativ. 300 Tage später fordert Corona das tausendste Zürcher Opfer. Wir zeigen visuell, wie sich die Todeszahlen über die Zeit entwickelt haben. Jeder Sarg entspricht einer verstorbenen Person, jeder Turm einem Tag. Was Sie im Hintergrund sehen: Der Beginn der ersten Welle.
            </Chapter>
          </Event>

          <Event id='wave1start' event={() => setcallEvent('chapter_two')}>
            <Chapter>
              Corona bereitete sich zuerst in den Köpfen und den Zeitungsseiten aus, zu beginn wurden nur einzelne Todesfälle gemeldet oder entdeckt. Das ändert sich neun Tage nach dem ersten Zürcher Fall. Die erste Welle bricht über Zürich hinein.
            </Chapter>
          </Event>

          <Event id='wave1end' event={() => setcallEvent('endof1wave')}>
            <Chapter>
              Die erste Welle dauerte je nach Messung bis Anfang Mai und forderte das Leben von rund 126 Zürcherinnen und Zürcher. Trotzdem atmet der Kanton auf, das gröbste schien überstanden zu sein. Bald schon begannen sich Strassen wieder zu füllen, Geschäfte öffneten ihre Türen und aus Restaurants dringen wieder die Geräusche des Lebens. Während des Sommers blieb es ruhig, nur vereinzelte Todesopfer wurden gemeldet.
            </Chapter>
          </Event>
          
          <Event id='wave2start' event={() => setcallEvent('startof1wave')}>
            <Chapter>
              Die Lage ändert sich Ende Oktober schlagartig. Während die Temperaturen fallen steigen die Infektionszahlen. Und auf die Neuinfektionen folgen die Spitalaufenthalte. Und auf die Spitalaufenthalte die Toten. Die zweite Welle bricht über den Kanton herein und sie sollte die erste bei weitem übertreffen.
            </Chapter>
          </Event>

          <Event id='wave2topdayfirstwave' event={() => setcallEvent('wave2topdayfirstwave')}>
            <Chapter>
              Bereits nach wenigen Wochen, am 2. November, überschreiten wir den Höchstwert aus der erste Welle – neun Personen sterben an einem einzigen Tag. Es ist ebenfalls jene Woche, in der die statistisch erwartbare Sterblichkeit der über 65-jährigen im zweiten Halbjahr zum ersten mal überschritten wird. Menschen sterben auch ohne Corona, im Winter mehr als im Sommer. Doch das überschreiten der Übersterblichkeit zeigt an, dass weit mehr Menschen als Normal sterben.
            </Chapter>
          </Event>
          
          <Event id='wave2day253' event={() => setcallEvent('wave2day253')}>
            <Chapter>
              23. November: Erneut ein neuer Höchststand, 15 Menschen sterben an diesem Tag.
            </Chapter>
          </Event>
          
          <Event id='wave2day261' event={() => setcallEvent('wave2day261')}>
            <Chapter>
              Acht Tage später: 19 Todesfälle.
            </Chapter>
          </Event>

          <Event id='wave2day267' event={() => setcallEvent('wave2day267')}>
            <Chapter>
              Am Montag, 7. Dezember beginnt jene Woche, an der die Übersterblichkeit am deutlichsten zu Tage kommt. 139 mehr Menschen sterben in dieser Woche, als der statistisch errechnete Maximalwert, geht aus den Zahlen des Mortalitätsmonitoring des BFS hervor.
            </Chapter>
          </Event>
          
          <Event id='wave2day270' event={() => setcallEvent('wave2day270')}>
            <Chapter>
              Draussen leuchten die Adventslichter, in den Notaufnahmen werden die Betten knapp.  Am 10. Dezember erreichen wir wieder einen neuen Höchststand: 21 Todesopfer.
            </Chapter>
          </Event>
          
          <Event id='wave2day280' event={() => setcallEvent('wave2day280')}>
            <Chapter>
              Vier Tage vor Heiligabend meldet der Kanton den vorläufigen Höhepunkt: 25 Todesopfer. Auch die gesamte Sterblichkeit ist mit 332.5 deutlich über dem normalen Wert.
            </Chapter>
          </Event>
          
          <Event id='wave2day285' event={() => setcallEvent('wave2day285')}>
            <Chapter>
              Weihnachten und Neujahr folgen. Die Infektionszahlen gehen zurück. Auch sterben durchschnittlich weniger Menschen.
            </Chapter>
          </Event>

          <Event id='wave2day299' event={() => setcallEvent('wave2day299')}>
            <Chapter>
              Freitag, der 8. Januar. An diesem Tag stirbt der 1000enste Zürcher. Erst drei Tage später, nach dem Wochenende, wissen dies die Behörden. Gleichzeitig kommuniziert der Kanton, wie in Pflege- und Altersheimen geimpft werden soll. Es keimt Hoffnung in Form von Spritzen auf.
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
