import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 方块
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const cube = new THREE.Mesh(geometry, material);

// 创建一个欧拉对象,表示绕着xyz轴分别旋转45度,0度,90度
const Euler = new THREE.Euler(Math.PI / 4, 0, Math.PI / 2);
cube.rotation.set(Euler.x, Euler.y, Euler.z);
scene.add(cube);

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
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


