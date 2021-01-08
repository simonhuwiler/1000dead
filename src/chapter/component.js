
import React from 'react'

import './style.scss'

function Chapter(props)
{
  const style = props.style ? props.style : {};

  return (
    <div className={`chapter ${props.className ? props.className : null}`} style={style} id={props.id ? props.id : null}>
      <div className='inner'>
        {props.children}
      </div>
    </div>
  )
}

export default Chapter;