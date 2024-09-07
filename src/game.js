import { createScene } from "./scene.js";
import { createCorporation } from "./corporation.js";

export function createGame() {
  let tick = 0;
  let time = 0;

  let gameSpeed = 5;
  const scene = createScene(100);

  const corp = createCorporation(100);

  scene.initialize();

  scene.onObjectSelected = (selectedObject) => {
    let { x, y } = selectedObject.userData;
    const tile = corp.data[x][y];
    console.log(tile);
  };

  document.addEventListener("keydown", scene.onKeyDown.bind(scene));
  document.addEventListener("keyup", scene.onKeyUp.bind(scene));
  document.addEventListener("mousedown", scene.onMouseDown.bind(scene));
  document.addEventListener("mouseup", scene.onMouseUp.bind(scene));
  document.addEventListener("mousemove", scene.onMouseMove.bind(scene), {
    passive: false,
  });
  document.addEventListener("wheel", scene.onMouseWheel.bind(scene), {
    passive: false,
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const gameLoop = () => {
    tick++;

    if (tick % gameSpeed === 0) {
      corp.update();

      time++;
      document.getElementById("time").innerHTML = `${formatTime(time)}`;
      // scene.update(time);
    }

    scene.draw();

    window.requestAnimationFrame(gameLoop);
  };

  function setGameSpeed(speed) {
    gameSpeed = speed;
  }

  function formatTime(time) {
    const seconds = Math.floor(time / 2);
    const minutes = seconds % 60;
    const hours = Math.floor(seconds / 60) % 24;
    const day = Math.floor(seconds / (60 * 24));
    if (seconds % (60 * 24) === 0) {
      setGameSpeed(0);
    }
    return `Day ${day} - ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  gameLoop();

  return {
    setGameSpeed,
    tick,
  };
}
