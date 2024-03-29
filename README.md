# 1000 Dead

This is the code for the visual web project: [1000 dead | How the virus raged in Zurich, Switzerland](https://www.journalist.sh/1000dead/). See and scroll through it [here](https://www.journalist.sh/1000dead/).

[![See the (artificial) visualisation](_others/preview.png)](https://youtu.be/LfqSyp0lcNM)

## Be aware
You may use this project as you wish with one limitation: **You need to licence the 3d model (coffin) or build/buy your own**. I am not the owner of this mesh! [You will find it on cgtrader.com](https://www.cgtrader.com/3d-models/various/various-models/closed-coffin).
  
Stay healthy!  
Simon  
[journalist.sh](https://www.journalist.sh)

## Installation
```
git clone git@github.com:simonhuwiler/1000dead.git
npm install
```

## Adapt
* Add your 3d-mesh: Replace `public/closed_coffin2.gltf` or change it in `src/stage/index.js`
* Change days and height of staples in `src/data/data.json`
* Change chapters in `src/App.js`
* Add your animation event to `src/stage/events.js` and add it to `module.exports.chapters`
* Reference your event in `<Event id='wave2start' event={() => setCallEvent('MyFunctionName')}>`. Be aware: Each `Event` needs a unique id.
