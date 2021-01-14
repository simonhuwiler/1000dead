import React, { useState, useEffect } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

import events from './events.js'
import settings from './settings.js'

const TWEEN = require('@tweenjs/tween.js');
require('./styles.scss');

// Data of the death
const data = require('../data/data.json');

const mesh3d = 'closed_coffin2.gltf';

function Stage(props) {

  const [stageSettings, setStageSettings] = useState(null);
  const [resize, setResize] = useState(null);
  const runAnimation = React.useRef(false);

  const animate = () => {
    render();
    if(runAnimation.current)
      requestAnimationFrame(animate);
  }

  useEffect(() => {
    const postprocessing = {};

    // Prepare Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 3000, 6000 );
    
    // Prepare Camera
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

    // Prepare Renderer
    let renderer;
    // If Renderer exists (Hotreload on React)
    if(document.querySelector("#three canvas"))
      renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#three canvas"), antialias: true});
    else
    {
      renderer = new THREE.WebGLRenderer({antialias: true});
      document.getElementById("three").appendChild( renderer.domElement );
    }
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true;

    // Remove autoclear for post processing
    renderer.autoClear = false;

    // Add Hemilight
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffcc00 );
    hemiLight.position.set( 0, 1000, 0 );
    scene.add( hemiLight );
    
    // Add Directional Light
    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( 1500, 1000, 0 );
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 8192; // default
    // dirLight.shadow.mapSize.height = 8192; // default
    // dirLight.shadow.camera.top = 1500;
    // dirLight.shadow.camera.bottom = -1500;
    // dirLight.shadow.camera.left = -2000;
    // dirLight.shadow.camera.right = 60000;
    // dirLight.shadow.camera.near = 20;
    // dirLight.shadow.camera.far = 10000;
    scene.add( dirLight );

    // scene.add( new THREE.DirectionalLightHelper( dirLight ) );
    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // Spotlight for Initial Coffin
    const spotLight = new THREE.SpotLight( 0x666666 );
    spotLight.power = 5;
    spotLight.angle = 0.4;
    spotLight.penumbra = 1;
    spotLight.position.set( 300, 150, 200 );
    
    spotLight.castShadow = true;    
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.top = 1000;
    spotLight.shadow.camera.bottom = -1000;
    spotLight.shadow.camera.left = - 1000;
    spotLight.shadow.camera.right = 1000;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 10000;
    scene.add( spotLight.target );
    
    scene.add( spotLight );
    // scene.add( new THREE.SpotLightHelper( spotLight ) );    

    // Add Ground
    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(100000, 200000), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );// 0x999999
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
      
    // Prepare Post Processing
    const renderPass = new RenderPass( scene, camera );
    const bokehPass = new BokehPass( scene, camera, {
      focus: 1.0,
      aperture: 0.025,
      maxblur: 0.01,

      width: window.innerWidth,
      height: window.innerHeight
    } );

    const composer = new EffectComposer( renderer );
    composer.addPass( renderPass );
    composer.addPass( bokehPass );

    postprocessing.composer = composer;
    postprocessing.bokeh = bokehPass;

    postprocessing.bokeh.uniforms.focus.value = settings.effectControllerDefault.focus;
    postprocessing.bokeh.uniforms.aperture.value = settings.effectControllerDefault.aperture;
    postprocessing.bokeh.uniforms.maxblur.value = settings.effectControllerDefault.maxblur;

    // Load Model
    const loader = new GLTFLoader();    
    const coffins = [];
    loader.load(
      mesh3d,
      gltf => {

        // Blueprint
        const blueprint = gltf.scene.children[0];
        blueprint.castShadow = true;
        blueprint.rotation.x = -1.57;
        blueprint.traverse( object => object.isMesh ? object.castShadow = true : null);

        // Create Coffin for each death
        for(const i in data)
        {
          for(let j = 0; j <= data[i].death - 1; j++)
          {
            // Copy blueprint
            let coffin = new THREE.Object3D();
            coffin = blueprint.clone();
      
            coffin.position.x = i % 2 === 0 ? settings.street.left : settings.street.right;
            coffin.position.y = (j + 1) * ( settings.dimension.y + settings.padding.y ) - ( settings.dimension.y + settings.padding.y )
            coffin.position.z = (settings.dimension.z + settings.padding.z) * -i;
      
            coffin.material.opacity = 0;
            coffin.material.transparent = true;

            // Add       
            scene.add(coffin);
            coffins.push(coffin)
          }
        }

        // Reposition first Coffin
        coffins[0].material = blueprint.material.clone()
        coffins[0].material.opacity = 1;
        coffins[0].rotation.z = Math.PI / 2;
        coffins[0].position.x = 0;
    
        // Reposition last Coffin
        coffins[coffins.length - 1].rotation.z = Math.PI / 2;
        coffins[coffins.length - 1].position.x = 0;
        coffins[coffins.length - 1].position.y = 0;
        coffins[coffins.length - 1].position.z = coffins[coffins.length - 1].position.z - 300;

        const y = 50;
        
        camera.position.set(0, y, 330);
        postprocessing.composer.render( 0.1 );
      }
    );

    // Set Hook
    setStageSettings({
      camera,
      scene,
      renderer,
      coffins,
      postprocessing,
      lng: props.lng
    })

    // Register Window Resize
    window.addEventListener( 'resize', () => setResize(Date.now()) );
    
  }, [])

  // Hack for Window Resize
  useEffect(() => {
    if(stageSettings)
    {
      const width = window.innerWidth;
      const height = window.innerHeight;
      stageSettings.camera.aspect = width / height;
      stageSettings.camera.updateProjectionMatrix();
      stageSettings.renderer.setSize( width, height );
      stageSettings.postprocessing.composer.setSize( width, height );
      render();
    }
  }, [resize])

  // Animation Functions
  const startAnimation = () => {
    if(!runAnimation.current)
    {
      runAnimation.current = true;
      animate();
    }
  }

  const stopAnimation = () => {
    runAnimation.current = false;
  }

  const render = () => {
    TWEEN.update();
    stageSettings.postprocessing.composer.render( 0.1 );
  }

  // Event-Manager
  const animationSettings = {startAnimation, stopAnimation, render};
  if(props.callEvent)
  {
    events.setLanguage(props.lng)
    events.chapters[props.callEvent](stageSettings, animationSettings)
  }

  return (
    <div id='three' />
  );
}

export default Stage
