import React from 'react'

class ScrollEvents extends React.Component {
  // Init vars
  positionArray = []
  currentEvent = null

  constructor(props) {
    super(props)

    // Register Events
    window.addEventListener('scroll', this.onScroll.bind(this))
    window.addEventListener('resize', this.readPosition.bind(this))
  }

  readPosition()
  {
    this.positionArray = []

    const recursiveMap = (children, positionArray) => {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child;
        }
    
        if (child.props.children) {
          child = React.cloneElement(child, {
            children: recursiveMap(child.props.children, positionArray)
          });
        }

        if(child.type === Event)
        {
          const key = child.props.id;
          const dom = document.querySelector(`#${key}`)
    
          positionArray.push({
            container: dom,
            event: child.props.event,
            top: Math.round(this.getOffset(dom) - window.innerHeight),
            triggered: false
            });
        }
      });
    }

    recursiveMap(this.props.children, this.positionArray)
  }

  onScroll() {
    
    if(!this.positionArray)
      return;

    if('active' in this.props.options && !this.props.options.active)
      return
  
    const pos = document.body.scrollTop || document.documentElement.scrollTop;
  
    for(let i = this.positionArray.length - 1; i >= 0; i--)
    {
      if(pos >= this.positionArray[i].top)
      {
        if(this.currentEvent !== this.positionArray[i].event)
        {
          this.currentEvent = this.positionArray[i].event;

          // Check if fireOnce active and already triggered
          if('fireOnce' in this.props.options && this.props.options.fireOnce && this.positionArray[i].triggered)
          {
            break
          }
          this.positionArray[i].triggered = true;
          this.positionArray[i].event(...this.props.eventParams);
        }
        break;
      }
    }
  }

  getOffset(element) {
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = element.getBoundingClientRect()
    return elemRect.top - bodyRect.top
  }

  componentDidMount() {
    this.readPosition()
  }

  render() {
    return <>{this.props.children}</>
  }
}

function Event(props)
{
  const style = 'style' in props ? props.style : {}
  return <div id={props.id} className='scrollevent_trigger' style={style}>{props.children}</div>;
}


export { ScrollEvents, Event }
