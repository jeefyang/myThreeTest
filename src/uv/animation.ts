import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 9000);
camera.position.z = 2500;


// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建纹理贴图
const textureLoader = new THREE.TextureLoader();
// 加载图片 887*1920
const texture = textureLoader.load("/1.jpg");
// 避免色差
texture.colorSpace = THREE.SRGBColorSpace;
// texture.offset.x += 0.5;
// 设置.wrapS也就是U方向, 纹理映射模式(包裹模式)
texture.wrapS = THREE.RepeatWrapping;
// texture.offset.y += 0.5;
// 设置.wrapT也就是V方向, 纹理映射模式(包裹模式)
texture.wrapT = THREE.RepeatWrapping;
// 重叠
texture.repeat.set(5, 5);



// 方块
const geometry = new THREE.BoxGeometry(100, 1920, 887);
geometry.rotateY(Math.PI / 2);
const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
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
    texture.offset.x += 0.01;
    texture.offset.y += 0.01;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


