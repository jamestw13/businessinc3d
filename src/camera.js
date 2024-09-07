import * as THREE from 'three';

export function createCamera(gameWindow, size) {
  const DEG2RAD = Math.PI / 180;

  const LEFT_MOUSE_BUTTON = 0;
  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;

  const MIN_CAMERA_RADIUS = 10;
  const MAX_CAMERA_RADIUS = 50;
  const MIN_CAMERA_ELEVATION = 30;
  const MAX_CAMERA_ELEVATION = 85;

  const ROTATION_SENSITIVITY = 0.5;
  const ZOOM_SENSITIVITY = 0.01;
  const PAN_SENSITIVITY = -0.05;

  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  const camera = new THREE.PerspectiveCamera(75, gameWindow.clientWidth / gameWindow.clientHeight, 0.1, 1000);
  let cameraOrigin = new THREE.Vector3(size / 2, 0, size / 2);
  let cameraRadius = 25;
  let cameraAzimuth = 135;
  let cameraElevation = 45;
  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;

  let isLeftButtonDown = false;
  let isRightButtonDown = false;
  let isUpButtonDown = false;
  let isDownButtonDown = false;
  let isRotateLeftKeyDown = false;
  let isRotateRightKeyDown = false;

  let prevMouseX = 0;
  let prevMouseY = 0;
  updateCameraPosition();

  function onKeyDown(event) {
    if (event.key === 'w') {
      isUpButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(0, 0, -0.2).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }
    if (event.key === 's') {
      isDownButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(0, 0, 0.2).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }
    if (event.key === 'a') {
      isLeftButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(-0.2, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }
    if (event.key === 'd') {
      isRightButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(0.2, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }
    if (event.key === 'd') {
      isRightButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(0.2, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }
    if (event.key === 'd') {
      isRightButtonDown = true;
      // cameraOrigin.add(new THREE.Vector3(0.2, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD));
    }

    updateCameraPosition();
  }

  function onKeyUp(event) {
    if (event.key === 'w') {
      isUpButtonDown = false;
    }
    if (event.key === 's') {
      isDownButtonDown = false;
    }
    if (event.key === 'a') {
      isLeftButtonDown = false;
    }
    if (event.key === 'd') {
      isRightButtonDown = false;
    }
    if (event.key === 'q') {
      isRotateLeftKeyDown = false;
    }
    if (event.key === 'e') {
      isRotateRightKeyDown = false;
    }
  }

  function onMouseDown(event) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
  }
  function onMouseUp(event) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
  }
  function onMouseMove(event) {
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;
    if (isRightMouseDown) {
      cameraAzimuth += -deltaX * ROTATION_SENSITIVITY;
      cameraElevation -= deltaY * ROTATION_SENSITIVITY;
      cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
      updateCameraPosition();
    }

    if (isMiddleMouseDown) {
      event.preventDefault();
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
      cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
      updateCameraPosition();
    }
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  function onMouseWheel(event) {
    event.preventDefault();
    cameraRadius += event.deltaY * ZOOM_SENSITIVITY;
    cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
    updateCameraPosition();
  }

  function updateCameraPosition() {
    camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
    camera.updateMatrix();
  }

  return { camera, onMouseDown, onMouseUp, onMouseMove, onMouseWheel, onKeyDown, onKeyUp };
}
