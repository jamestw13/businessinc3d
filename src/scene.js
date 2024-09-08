import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createCorporation } from "./corporation.js";
import { createAssetInstance } from "./assets.js";

export function createScene(size) {
  const gameWindow = document.getElementById("render-target");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000066);

  const camera = createCamera(gameWindow, size);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight);
  gameWindow.appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject = undefined;

  let spaces = [];
  let terrain = [];

  let onObjectSelected = undefined;

  function initialize(corp) {
    scene.clear();
    terrain = [];
    spaces = [];

    for (let x = 0; x < size; x++) {
      let column = [];
      for (let y = 0; y < size; y++) {
        const terrainId = corp.data[x][y].terrainId;
        const mesh = createAssetInstance(terrainId, x, y);
        scene.add(mesh);

        column.push(mesh);
        // Office Geometry
        const tile = corp.data[x][y];
        if (tile.space === "office") {
          const mesh = createAssetInstance("office", x, y);
          scene.add(mesh);
        } else if (tile.space === "restroom") {
          const mesh = createAssetInstance("restroom", x, y);
          scene.add(mesh);
        }
        column.push(mesh);
      }

      spaces.push(column);
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

  function update(corp) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const currentSpaceType = spaces[x][y]?.userId;
        console.log(currentSpaceType);
        const newSpaceType = corp.data[x][y].space;

        if (!newSpaceType && currentSpaceType) {
          scene.remove(spaces[x][y]);
          spaces[x][y] = undefined;
        }
        if (newSpaceType && newSpaceType !== currentSpaceType) {
          scene.remove(spaces[x][y]);
          spaces[x][y] = createAssetInstance(newSpaceType, x, y);
          scene.add(spaces[x][y]);
        }
      }
    }
  }

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

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera.camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      if (selectedObject) selectedObject.material.emissive.setHex(0x000000);
      selectedObject = intersections[0].object;
      selectedObject.material.emissive.setHex(0x555555);

      if (this.onObjectSelected) {
        this.onObjectSelected(selectedObject);
      }
    }
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
    onObjectSelected,
    draw,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseWheel,
    onKeyDown,
    onKeyUp,
    initialize,

    update,
  };
}
