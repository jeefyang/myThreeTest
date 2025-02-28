import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 500;


// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//几何体
//创建一个空的几何体
const geometry = new THREE.BufferGeometry();
// 类型化数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1
    50, 0, 0, //顶点2
    0, 100, 0, //顶点3
    0, 0, 10, //顶点4
    0, 0, 100, //顶点5
    50, 0, 10, //顶点6
]);
//创建属性缓冲区对象
//3个为一组,表示一个顶点的xyz坐标
const attribute = new THREE.BufferAttribute(vertices, 3);
//设置几何体attributes属性的位置属性
geometry.attributes.position = attribute;

// 生成点
const pointMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 10 });
const points = new THREE.Points(geometry, pointMaterial);
scene.add(points);

//生成线
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff });
// const lines = new THREE.Line(geometry, lineMaterial);
// 闭合线
// const lines = new THREE.LineLoop(geometry, lineMaterial);
// 非连续线
const lines = new THREE.LineSegments(geometry, lineMaterial);
scene.add(lines);

// 坐标
const axesHelper = new THREE.AxesHelper(3000);
// scene.add(axesHelper);

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
    // points.rotation.x += 0.01;
    // points.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


