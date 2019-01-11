import * as React from "react";
import * as THREE from "three";
import { Skybox } from "./skybox";
import { CarpaintMaterial } from "./carpaintMaterial";
require("../../extern/loader/GLTFLoader")(THREE);
require("../../extern/loader/RGBELoader")(THREE);
require("../../extern/loader/HDRCubeTextureLoader")(THREE);
require("../../extern/pmrem/PMREMGenerator")(THREE);
require("../../extern/pmrem/PMREMCubeUVPacker")(THREE);
require("../../extern/OrbitControls")(THREE);

export type BackgroundInitializer = { envPathName:string;  irradiancePathName:string; };

export class ThreeScene extends React.Component {

    private componentRef: any;

    private controls: any;

    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private animationID: any;
    private camera: THREE.PerspectiveCamera;

    private mesh: THREE.Mesh;

    private _background_env_path: string = "./assets/textures/forestA/env/environment_10-30_Forest_A_";
    private _background_irradiance_path: string = "./assets/textures/forestA/irradiance/irradiance_10-30_Forest_A_";

    public get background(): BackgroundInitializer {
        return { envPathName: this._background_env_path, irradiancePathName: this._background_irradiance_path };
    }
    public set background(value: BackgroundInitializer) {
        this._background_env_path = value.envPathName;
        this._background_irradiance_path = value.irradiancePathName;
    }

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        this.init();
        this.loadsomething();
        this.renderLoop();
    }

    private init(): void {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(1, 1, 1);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });

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
        this.controls.maxDistance = 4;

        window.addEventListener("resize", () => { this.onWindowResize(); }, false);
        this.onWindowResize();
    }


    private loadsomething(): Promise<any> {
        let sb: Skybox = new Skybox();
        sb.toneMappingExposure = 1.0;
        sb.loadSkybox(this.background).then((skybox) => { this.scene.add(skybox); });
        return new Promise((resolve) => {
            this.loadEnvironment().then((tex) => {
                let urls: string[] = [];

                for (let i: number = 0; i < 6; i++) {
                    let sideUrl: string = this._background_irradiance_path + i + ".hdr";
                    urls.push(sideUrl);
                }

                new (THREE as any).HDRCubeTextureLoader()
                    .load(THREE.UnsignedByteType, urls, (irMap) => {
                        let geometry: any = new THREE.SphereBufferGeometry(0.5, 64, 64);
                        let material: any = new CarpaintMaterial(tex, irMap);
                        let mesh: any = new THREE.Mesh(geometry, material);
                        this.mesh = mesh;
                        this.scene.add(mesh);
                        resolve();
                        console.log("Irradiancemap loaded!");
                    });
            });
        });
    }

    private loadEnvironment(): Promise<THREE.CubeTexture> {
        let hdrUrls: string[][] = [];

        for (let i: number = 0; i < 6; i++) {
            hdrUrls.push([]);
            for (let j: number = 0; j < 6; j++) {
                let sideUrl: string = this._background_env_path + i + "_" + j + ".hdr";
                hdrUrls[i].push(sideUrl);
            }
        }

        return new Promise((resolve) => {
            let hdrCubeMap: THREE.CubeTexture = new (THREE as any).HDRCubeTextureLoader()
                .load(THREE.UnsignedByteType, hdrUrls[0], (texture: THREE.CubeTexture) => {
                    console.log("Environment Level 0 loaded!");
                    let promises: Promise<any>[] = [];
                    for (let i: number = 0; i < 6; i++) {
                        // store an object at the right place before asyncronous loading and replace afterwards
                        let tmp: any;
                        texture.mipmaps.push(tmp);
                        promises.push(new Promise((resolve) => {
                            new (THREE as any).HDRCubeTextureLoader()
                                .load(THREE.UnsignedByteType, hdrUrls[i], (tex: THREE.CubeTexture) => {
                                    (texture.mipmaps as any)[i] = tex; // here is the typing actually wrong
                                    console.log("Environment Level " + i + " loaded!");
                                    resolve();
                                });
                        }));
                    }
                    Promise.all(promises).then(() => { resolve(hdrCubeMap); });
                });
        });

    }

    private onWindowResize(event: any = null): void {
        let container: any = this.componentRef;
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    counter: number = 0;
    value: number = 0;
    private renderLoop = () => {
        this.animationID = requestAnimationFrame(this.renderLoop);
        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        this.counter += 0.002;
        this.value = Math.abs(Math.sin(this.counter));
        if (this.mesh !== undefined && 0.01 < this.value && 0.99 > this.value) {
            // (this.mesh.material as any).uniforms.roughnessFactor.value = this.value;
        }
        this.renderer.render(this.scene, this.camera);
    }

    public render(): any {
        return (
            <div className="three_container three_container_abs_size">
                <div className="three_container_overlay three_container_abs_size"></div>
                <div className="three_scene_container"></div>
                <div id="scene-container" style={{ height: "100%" }} ref={(mount) => { this.componentRef = mount; }}></div>
            </div>
        );
    }
}