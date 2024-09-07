import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  office: (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x7777777 });

    const mesh = new THREE.Mesh(boxGeometry, material);
    mesh.userData = { id: "office", x, y };
    mesh.scale.set(3, 1, 3);
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  bathroom: (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x7777777 });
    const mesh = new THREE.Mesh(boxGeometry, material);
    mesh.userData = { id: "bathroom", x, y };
    mesh.scale.set(1, 1, 2);
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  ground: (x, y) => {
    // Ground Geometry
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "ground", x, y };
    mesh.rotateX(-Math.PI / 2);
    mesh.position.set(x, 0, y);

    return mesh;
  },
};

export function createAssetInstance(assetId, x, y) {
  if (assetId in assets) {
    return assets[assetId](x, y);
  } else {
    console.warn("Unknown asset: " + assetId);
    return undefined;
  }
}
