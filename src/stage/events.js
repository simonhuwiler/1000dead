var TWEEN = require('@tweenjs/tween.js');
const settings = require('./settings');
var dateFormat = require("dateformat");
dateFormat.i18n = {
  monthNames: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ]
};

// var tweens = []
// const addTween = t => tweens.push(t);

// const stoppAllTweents = () => {
//   tweens.forEach(t => t.stop())
//   tweens = [];
// }

const beforeAnimation = () => {
  TWEEN.removeAll()
}

const tweenDate = (stage, to, time) => {

  const dom = document.querySelector('.daycounter')

  new TWEEN.Tween({c: settings.DayByZ(stage.camera.position.z)})
    .to({c: to}, time)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(e => {
      var result = new Date('2020-03-15');
      result.setDate(result.getDate() + e.c);
      dom.innerHTML = dateFormat(result, "d. mmmm yyyy");
    })
    .start();
}

const moveToDate = (stage, animation, day, rotation, speed) =>
{

  var r = {
    x: rotation.x ? rotation.x : 0,
    y: rotation.y ? rotation.y : 0,
    z: rotation.z ? rotation.z : 0
  }

  // Start Animation
  beforeAnimation();
  animation.startAnimation();

  new TWEEN.Tween(stage.camera.rotation)
    .to({x: r.x, y: r.y, z: r.z}, speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();  

  new TWEEN.Tween(stage.camera.position)
    .to({x: settings.cameraMoving.x, y: settings.cameraMoving.y, z: settings.zByDay(day)}, speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onComplete(() =>animation.stopAnimation())
    .start();

    tweenDate(stage, day, speed); 
}

const chapter_one = (stage, animation) => {
  // Show all coffings
  stage.coffins.forEach(c => c.visible = true);

  // Change Blur
  stage.postprocessing.bokeh.uniforms[ "aperture" ].value = 0.000005;

  // Start Animation
  beforeAnimation();
  animation.startAnimation();
  new TWEEN.Tween(stage.camera.position)
    .to({x: 50, y: 140, z: 120}, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    // .onComplete(animation.stopAnimation())
    .start();

  animation.startAnimation();
  new TWEEN.Tween(stage.camera.rotation)
    .to({x: 0, y: 0, z: 0}, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(() =>animation.stopAnimation())
    .start();  

  document.querySelector('.daycounter').style.display = 'none';
}

const chapter_two = (stage, animation) => {
  
    document.querySelector('.daycounter').style.display = 'inline-block';

    moveToDate(stage, animation, 9, {x: 0}, 3000)
}

const endof1wave = (stage, animation) => {
    
  moveToDate(stage, animation, 46, {y: 0}, 7000)
}

const startof1wave = (stage, animation) => {


  moveToDate(stage, animation, 225, {x: 0}, 5000)
}

const wave2topdayfirstwave = (stage, animation) => {

  moveToDate(stage, animation, 232, {x: 0.2}, 2000)
}

const wave2day253 = (stage, animation) => {

  moveToDate(stage, animation, 253, {x: 0.4, y: -0.1, z: 0.05}, 7000)
}

const wave2day261 = (stage, animation) => {

  moveToDate(stage, animation, 261, {x: 0.5, y: -0.2}, 7000)    
}

const wave2day267 = (stage, animation) => {
  moveToDate(stage, animation, 267, {x: 0}, 3000)    
}

const wave2day285 = (stage, animation) => {
  moveToDate(stage, animation, 285, {x: 0}, 5000)    
}

const wave2day270 = (stage, animation) => {

  moveToDate(stage, animation, 270, {x: 0.6, y: 0.1}, 3000)  
}

const wave2day280 = (stage, animation) => {
  moveToDate(stage, animation, 280, {x: 0.7, y: 0.4, z: -0.2}, 5000)  
}

const wave2day299 = (stage, animation) => {
  moveToDate(stage, animation, 300, {x: -0.5, y: 0, z: 0}, 7000)  
}

const wave2end = (stage, animation) => {
 moveToDate(stage, animation, 297, {x: 0}, 5000) 
}

const stapel = (stage, animation) => {
  beforeAnimation();
  
  stage.postprocessing.bokeh.uniforms[ "aperture" ].value = 0;

  animation.startAnimation();
  new TWEEN.Tween(stage.camera.rotation)
  .to({x: 0.25, y: 0, z: 0}, 1800)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onComplete(() =>animation.stopAnimation())
  .start();   

  const columns = Math.ceil(Math.sqrt(stage.coffins.length));

  const stapelPos = {
    x: -1200,
    y: 0,
    z: settings.zByDay(306)
  }

  var row = 0;
  
  animation.startAnimation();

  const moveCoffin = () => {
    setTimeout(() => {
      for(var i = 0; i < columns - 1; i++)
      {
        var x = i % columns * settings.dimension.x;
        var y = (row + 1) * ( settings.dimension.y + settings.padding.y ) - ( settings.dimension.y + settings.padding.y )
    
        const cofPos = i + (row * columns);
        if(cofPos <= stage.coffins.length - 1)
          stage.coffins[cofPos].position.set(x + stapelPos.x, y + stapelPos.y, stapelPos.z);
      }
      row++;
      if(row < columns)
        moveCoffin();
      else
      {
        console.log("finito")
        
      }
    }, 100)
  }
  moveCoffin();
  
  // setTimeout(() => animation.stopAnimation(), 2500)


  /* Tween-Variante */
  // var tweens = []
  // const stapelPos = {
  //   x: -1200,
  //   y: 0,
  //   z: settings.zByDay(303)
  // }

  // for(var i = 0; i <= stage.coffins.length - 1; i++)
  // {
  //   var x = i % columns * settings.dimension.x;
  //   var y = Math.ceil((i + 1) / columns) * ( settings.dimension.y + settings.padding.y ) - ( settings.dimension.y + settings.padding.y )

  //   var tween = new TWEEN.Tween(stage.coffins[i].position).to({x: x + stapelPos.x, y: y + stapelPos.y, z: stapelPos.z}, 1500);
  //   tweens.push(tween)
  // }
  // console.log("fin")

  // tweens.forEach(t => t.start());

}


module.exports.chapters = {chapter_one, chapter_two, endof1wave, startof1wave, wave2topdayfirstwave, wave2day253,
  wave2day261, wave2day267, wave2day270, wave2day280, wave2day285, wave2day299, wave2end, stapel}