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

export type BackgroundInitializer = { envPathName: string; irradiancePathName: string; };

export class ThreeScene extends React.Component {

    private componentRef: any;

    private controls: any;

    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private animationID: any;
    private camera: THREE.PerspectiveCamera;

    private skybox: Skybox;
    private mesh: THREE.Mesh;

    private backgrounds: BackgroundInitializer[] = [
        {
            envPathName: "./assets/textures/sunA/env/environment_04-18_Sun_A_",
            irradiancePathName: "./assets/textures/sunA/irradiance/irradiance_04-18_Sun_A_"
        },
        {
            envPathName: "./assets/textures/nightC/env/environment_04-21_Night_C_",
            irradiancePathName: "./assets/textures/nightC/irradiance/irradiance_04-21_Night_C_"
        },
        {
            envPathName: "./assets/textures/swissA/env/environment_08-21_Swiss_A_",
            irradiancePathName: "./assets/textures/swissA/irradiance/irradiance_08-21_Swiss_A_"
        },
        {
            envPathName: "./assets/textures/forestA/env/environment_10-30_Forest_A_",
            irradiancePathName: "./assets/textures/forestA/irradiance/irradiance_10-30_Forest_A_"
        },
        {
            envPathName: "./assets/textures/arches/env/environment_arches_",
            irradiancePathName: "./assets/textures/arches/irradiance/irradiance_arches_"
        },
        {
            envPathName: "./assets/textures/nightscene/env/environment_test_equirect_",
            irradiancePathName: "./assets/textures/nightscene/irradiance/irradiance_test_equirect_"
        },
        {
            envPathName: "./assets/textures/park/env/environment_05-20_Park_F_",
            irradiancePathName: "./assets/textures/park/irradiance/irradiance_05-20_Park_F_"
        },
        {
            envPathName: "./assets/textures/swissD/env/environment_08-21_Swiss_D_",
            irradiancePathName: "./assets/textures/swissD/irradiance/irradiance_08-21_Swiss_D_"
        }
    ];

    private materialList: CarpaintMaterial[] = [];

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
        this.skybox = new Skybox();
        this.skybox.toneMappingExposure = 1.0;
        this.skybox.loadSkybox(this.backgrounds[0]).then((skybox) => { this.scene.add(skybox); });

        return new Promise((resolve) => {
            this.loadEnvironment(this.backgrounds[0]).then((tex) => {
                let urls: string[] = [];

                for (let i: number = 0; i < 6; i++) {
                    let sideUrl: string = this.backgrounds[0].irradiancePathName + i + ".hdr";
                    urls.push(sideUrl);
                }

                new (THREE as any).HDRCubeTextureLoader()
                    .load(THREE.UnsignedByteType, urls, (irMap) => {
                        let geometry: any = new THREE.SphereBufferGeometry(0.5, 64, 64);
                        let material: any = new CarpaintMaterial(tex, irMap);
                        this.materialList.push(material);
                        let mesh: any = new THREE.Mesh(geometry, material);
                        this.mesh = mesh;
                        this.alternateEnvironments(0);
                        this.scene.add(mesh);
                        this.loadBackgroundsInBackground();
                        resolve();
                        console.log("Irradiancemap loaded!");
                    });
            });
        });
    }

    private loadBackgroundsInBackground(): void {
        let promises: Promise<any>[] = [];
        for (let i: number = 1; i < this.backgrounds.length; i++) {
            let promise: Promise<any> = new Promise<any>((resolve) => {
                let background: BackgroundInitializer = this.backgrounds[i];
                this.loadEnvironment(background).then((tex) => {
                    let urls: string[] = [];

                    for (let i: number = 0; i < 6; i++) {
                        let sideUrl: string = background.irradiancePathName + i + ".hdr";
                        urls.push(sideUrl);
                    }

                    new (THREE as any).HDRCubeTextureLoader()
                        .load(THREE.UnsignedByteType, urls, (irMap) => {
                            let material: any = new CarpaintMaterial(tex, irMap);
                            this.materialList.push(material);
                            resolve();
                            console.log("Irradiancemap loaded!");
                        });
                });
            });
            promises.push(promise);
        }
        Promise.all(promises);
    }

    private loadEnvironment(background: BackgroundInitializer): Promise<THREE.CubeTexture> {
        let hdrUrls: string[][] = [];

        for (let i: number = 0; i < 6; i++) {
            hdrUrls.push([]);
            for (let j: number = 0; j < 6; j++) {
                let sideUrl: string = background.envPathName + i + "_" + j + ".hdr";
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
    sinValue: number = 0;
    cosValue: number = 0;
    sinCosPi: number = 0;
    cosCosPi: number = 0;
    radius: number = 1.75;

    private animateCam(): void {
        this.cosValue = Math.cos(this.counter);
        this.sinCosPi = Math.sin(this.cosValue * 2 * Math.PI);
        this.cosCosPi = Math.cos(this.cosValue * 2 * Math.PI);

        this.camera.position.set(
            this.radius * this.sinCosPi * this.sinCosPi,
            this.radius * this.sinCosPi * this.cosCosPi,
            this.radius * this.cosCosPi);
    }

    private alternateEnvironments(i: number): void {
        if (i === this.materialList.length) {
            i = 0;
        }
        this.mesh.material = this.materialList[i];
        this.mesh.material.needsUpdate = true;
        this.skybox.texture = (this.mesh.material as any).uniforms.envMap;
        setTimeout(() => { this.alternateEnvironments(i+1); }, 30000);
    }

    private renderLoop = () => {
        this.animationID = requestAnimationFrame(this.renderLoop);

        this.counter += 0.00025;
        this.sinValue = Math.abs(Math.sin(this.counter));
        this.animateCam();
        if (this.mesh !== undefined && 0.01 < this.sinValue && 0.99 > this.sinValue) {
            // (this.mesh.material as any).uniforms.roughnessFactor.value = this.value;
        }
        this.renderer.render(this.scene, this.camera);
        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
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