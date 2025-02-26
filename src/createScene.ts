import * as THREE from "three";
import { OrbitControls } from "three/addons";

// 场景摄像头
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 100);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 立方体
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.lookAt(0, 0, 0);

// 坐标
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
    renderer.render(scene, camera);
});


const sphere = new THREE.SphereGeometry(0.5, 16, 8);

const lights = [0xff0040, 0x0040ff, 0x80ff80, 0xffaa00].map((c) => {
    const light = new THREE.PointLight(c, 400);
    light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: c })));
    scene.add(light);
    return light;
});


const MathList = (() => {
    const start = [Math.sin, Math.sin, Math.sin];
    let arr: ((x: number) => number)[][] = [];
    let loopFunc = (target: ((x: number) => number)[], index: number) => {
        if (index == target.length) {
            return;
        }
        for (let i = index; i < target.length; i++) {
            let clone = [...target];
            clone[i] = Math.cos;
            if (!clone.every(c => c == Math.cos)) {
                arr.push([...clone]);
            }
            loopFunc(clone, index + 1);

        }
    };
    loopFunc(start, 0);
    return arr;
})();

const timeCountList = (() => {
    const start = [0.3, 0.5, 0.7];
    let arr: number[][] = [];
    let loopFunc = (index: number) => {
        if (index == start.length) {
            arr.push([...start]);
            return;
        }

        for (let i = index; i < start.length; i++) {
            [start[index], start[i]] = [start[i], start[index]];
            loopFunc(index + 1);
            [start[index], start[i]] = [start[i], start[index]];
        }
    };
    loopFunc(0);
    return arr;
})();

console.log(timeCountList);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    const time = Date.now() * 0.0005;
    // const delta = clock.getDelta();

    lights.forEach((c, index) => {

        c.position.x = (MathList[index % MathList.length][0])(time * timeCountList[index % timeCountList.length][0]) * 30;
        c.position.y = (MathList[index % MathList.length][1])(time * timeCountList[index % timeCountList.length][1]) * 40;
        c.position.z = (MathList[index % MathList.length][2])(time * timeCountList[index % timeCountList.length][2]) * 30;
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

});

animate();


