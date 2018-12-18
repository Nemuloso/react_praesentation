import * as React from "react";
import * as THREE from "three";
require("../../extern/loader/GLTFLoader")(THREE);
require("../../extern/loader/RGBELoader")(THREE);
require("../../extern/loader/HDRCubeTextureLoader")(THREE);
require("../../extern/pmrem/PMREMGenerator")(THREE);
require("../../extern/pmrem/PMREMCubeUVPacker")(THREE);
require("../../extern/OrbitControls")(THREE);

export class ThreeScene extends React.Component {

    private componentRef: any;

    private controls: any;

    private vs: string = "";
    private fs: string = "";

    public get fragmentShader(): string { return this.fs; }

    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private cubeMapRenderer: THREE.WebGLRenderer;
    private animationID: any;
    private camera: THREE.PerspectiveCamera;

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        this.init();
        this.loadsomething();
        this.renderLoop();
    }

    private init(): void {
        console.log("init");
        let textureLoader: any = new THREE.TextureLoader();
        // const texturePath: string = HASH + "/textures/rustediron1-alt2-Unreal-Engine/";

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(4, 4, 4);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // for the mipmap lod
        this.renderer.context.getExtension("EXT_shader_texture_lod");

        this.renderer.context.canvas.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.log("lost webgl main context");
            cancelAnimationFrame(this.animationID);
        }, false);

        this.renderer.setClearColor(0xd3d3d3);

        this.componentRef.appendChild(this.renderer.domElement);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.5;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 16;

        window.addEventListener("resize", this.onWindowResize, false);
        this.onWindowResize();
    }


    private loadsomething(): Promise<any> {
        return new Promise((resolve) => {
            let geometry: any = new THREE.SphereBufferGeometry(0.5, 64, 64);
            let material: any = new THREE.MeshBasicMaterial();
            let mesh: any = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            resolve();
        });
    }


    private onWindowResize(event: any = null): void {
        let container: any = this.componentRef;
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    private renderLoop = () => {
        this.animationID = requestAnimationFrame(this.renderLoop);
        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        this.renderer.render(this.scene, this.camera);
    }

    public render(): any {
        return (
            <div id="scene-container" ref={(mount) => { this.componentRef = mount; }}></div>
        );
    }
}