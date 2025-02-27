import * as THREE from "three";
import { OrbitControls } from "three/addons";
import { GUI } from "dat.gui";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 方块
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 20;

// 点光源
const pointLight = new THREE.PointLight(0x00ff00, 100);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLight);
scene.add(pointLightHelper);

// 环境光
const ambient = new THREE.AmbientLight(0x0000ff, 0.4);
scene.add(ambient);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xff0000, 10);
directionalLight.target = cube;
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLight);
scene.add(directionalLightHelper);

// 坐标
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

// 操控
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
    renderer.render(scene, camera);
});


// 其他参数
const rotateObj = {
    cube: true,
    light: true,
};

// ui控制面板
const gui = new GUI();
gui.domElement.style.right = '0';
gui.domElement.style.width = '200px';
gui.add(cube.position, 'x', 0, 20, 0.1);
gui.add(cube.position, 'y', 0, 20, 0.1);
gui.add(cube.position, 'z', 0, 20, 0.1);
gui.addColor({ color: ambient.color.getHex() }, "color").name("环境光").onChange(v => {
    ambient.color.set(v);
});
gui.addColor({ color: pointLight.color.getHex() }, 'color').name("点光源").onChange(v => {
    pointLight.color.set(v);
});
gui.addColor({ color: directionalLight.color.getHex() }, 'color').name("平行光").onChange(v => {
    directionalLight.color.set(v);
});
gui.add(rotateObj, 'cube').name("方块旋转");
gui.add(rotateObj, 'light').name("灯光旋转");

// 监听缩放
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

});

let angle = 90;

// 动画帧
function animate() {
    requestAnimationFrame(animate);
    if (rotateObj.cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    if (rotateObj.light) {
        angle += 0.5;
        const radians = angle * (Math.PI / 180);
        pointLight.position.x = Math.sin(radians) * 5;
        pointLight.position.z = Math.cos(radians) * 5;
        pointLightHelper.update();
        directionalLight.position.x = Math.sin(-radians) * 5;
        directionalLight.position.z = Math.cos(-radians) * 5;
        directionalLightHelper.update();
    }
    renderer.render(scene, camera);
}

animate();


