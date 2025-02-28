import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/addons";


// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1000;

// 添加天空盒子
const cubeTexture = new THREE.CubeTextureLoader().setPath("").load(["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"]);
scene.background = cubeTexture;

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffff00, 0.5);
scene.add(ambient);
const light = new THREE.DirectionalLight(0x00ff00, 1000);
light.position.set(100, 0, 0);
scene.add(light);



// 加载模型
const loader = new GLTFLoader();
loader.load("/dragon.glb", (gltf) => {
    console.log("对象结构", gltf);
    console.log("场景属性", gltf.scene);
    // 模型缩放
    // 模型缩放
    scene.add(gltf.scene);
    light.add(gltf.scene);
    // ambient.add(gltf.scene);
});



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


