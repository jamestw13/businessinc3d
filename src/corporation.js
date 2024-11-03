export default class Corporation {
  constructor(size) {
    this.size = size;
    this.money = 10000;
    this.data = [];
    this.initialize();
  }
  initialize() {
    for (let x = 0; x < this.size; x++) {
      const column = [];
      for (let y = 0; y < this.size; y++) {
        let tile = {
          x,
          y,
          terrainId: "ground",
          space: undefined,
          update() {
            if (this.space === "office") {
              this.money += 1;
            }
          },
        };
        const random = Math.random();
        if (random > 0.9) {
          tile.space = "office";
        } else if (random < 0.05) {
          tile.space = "restroom";
        }

        column.push(tile);
      }
      this.data.push(column);
    }
  }

  update() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        this.data[x][y].update();
      }
    }
    document.getElementById("money").innerHTML = `$${this.money}`;
  }

  createTile(x, y) {
    return;
  }
}
