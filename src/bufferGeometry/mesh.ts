import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 300;


// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 模型
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    // side:THREE.FrontSide //默认正面可见
    side: THREE.DoubleSide //双面可见
    // side:THREE.BackSide //反面可见
});
// 定义矩形
const vertices = new Float32Array([
    0, 0, 0, // 顶点1
    80, 0, 0, // 顶点2
    80, 80, 0, // 顶点3

    // 0, 0, 0, //顶点4=顶点1
    // 80, 80, 0, //顶点5=顶点3
    0, 80, 0, //顶点6
]);

// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3
]);

const geometry = new THREE.BufferGeometry();
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3); //3个为一组
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 3;
scene.add(mesh);


// 坐标
const axesHelper = new THREE.AxesHelper(300);
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
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


