import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;


// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 方块
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const cube = new THREE.Mesh(geometry, material);
cube.name = "正宫";
const cloneCube = cube.clone();
cloneCube.name = "副宫";
cloneCube.position.x = 3;
const group = new THREE.Group();
group.position.y = 2;
group.rotation.set(0, 0, 0);
const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.attributes.position = new THREE.BufferAttribute(new Float32Array([
    0, 0, 0,
    3, 0, 0
]), 1);
const line = new THREE.Line(bufferGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
group.add(cube, cloneCube, line);
scene.add(group);
// 遍历
group.traverse(obj => {
    console.log("模型节点=====");
    console.log("名称", obj.name, "类型", obj.type, 'id', obj.id);
});
// 查找
const find = group.getObjectByName("副宫");
console.log('查找结果', find);
// 坐标辨别
console.log("本地坐标", cloneCube.position);
console.log('世界坐标', cloneCube.getWorldPosition(new THREE.Vector3()));

// 坐标
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

// 操控
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
    renderer.render(scene, camera);
});

// 监听缩放
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

});

// 动画帧
function animate() {
    requestAnimationFrame(animate);
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


