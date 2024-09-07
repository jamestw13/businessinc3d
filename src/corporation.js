export function createCorporation(size) {
  let money = 10000;
  const data = [];

  initialize();

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          terrainId: "ground",
          space: undefined,
          update() {
            if (this.space === "office") {
              money += 1;
            }
          },
        };
        if (Math.random() > 0.9) {
          tile.space = "office";
        }

        column.push(tile);
      }
      data.push(column);
    }
  }

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
    document.getElementById("money").innerHTML = `$${money}`;
  }

  return { size, data, update };

  function createTile(x, y) {
    return;
  }
}
