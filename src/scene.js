import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createCorporation } from "./corporation.js";
import { createAssetInstance } from "./assets.js";

export function createScene() {
  const SIZE = 16;
  const gameWindow = document.getElementById("render-target");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000066);

  const camera = createCamera(gameWindow, SIZE);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight);
  gameWindow.appendChild(renderer.domElement);

  let meshes = [];
  let terrain = [];

  const corp = createCorporation(SIZE);

  function initialize() {
    scene.clear();
    terrain = [];
    meshes = [];

    for (let x = 0; x < corp.size; x++) {
      let column = [];
      for (let y = 0; y < corp.size; y++) {
        const terrainId = corp.data[x][y].terrainId;
        const mesh = createAssetInstance(terrainId, x, y);
        scene.add(mesh);

        column.push(mesh);
        // Office Geometry
        const tile = corp.data[x][y];
        if (tile.space === "office") {
          const mesh = createAssetInstance("office", x, y);
          scene.add(mesh);

          column.push(mesh);
        }
      }

      meshes.push(column);
    }
    setupLights();
  }

  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.2),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
    ];
    scene.add(...lights);
  }

  function update() {}

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function onKeyDown(event) {
    camera.onKeyDown(event);
  }

  function onKeyUp(event) {
    camera.onKeyUp(event);
  }

  function onMouseDown(event) {
    camera.onMouseDown(event);
  }
  function onMouseUp(event) {
    camera.onMouseUp(event);
  }
  function onMouseMove(event) {
    camera.onMouseMove(event);
  }

  function onMouseWheel(event) {
    camera.onMouseWheel(event);
  }
  return {
    draw,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseWheel,
    onKeyDown,
    onKeyUp,
    initialize,
    corp,
    update,
  };
}
