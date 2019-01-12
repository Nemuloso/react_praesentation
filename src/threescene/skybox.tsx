import * as THREE from "three";
import { Utils } from "./utils";
import { BackgroundInitializer } from "./threescene";
require("../../extern/loader/HDRCubeTextureLoader")(THREE);

export class Skybox {
    private _skybox: THREE.Mesh;
    public get skybox(): THREE.Mesh { return this._skybox; }
    private _toneMappingExposure: number = 1.0;
    public get toneMappingExposure(): number { return this._toneMappingExposure; }
    public set toneMappingExposure(value: number) {
        if (0 <= value && value <= 1) {
            this._toneMappingExposure = value;
            if (this._skybox !== undefined) {
                (this._skybox.material as any).uniforms.toneMappingExposure.value = this._toneMappingExposure;
                (this._skybox.material as any).needsUpdate = true;
            }
        }
    }

    public set texture(texture: THREE.CubeTexture) {
        (this._skybox.material as any).uniforms.envMap = texture;
        (this._skybox.material as any).needsUpdate = true;
    }

    public loadSkybox(bg: BackgroundInitializer): Promise<THREE.Mesh> {
        return new Promise<THREE.Mesh>((resolve) => {
            const equirectToCubeVert: string = "./src/shader/skybox.vert.glsl";
            const equirectToCubeFrag: string = "./src/shader/skybox.frag.glsl";

            let hdrUrls: string[] = [];
            for (let i: number = 0; i < 6; i++) {
                let sideUrl: string = bg.envPathName + "0_" + i + ".hdr";
                hdrUrls.push(sideUrl);
            }

            new (THREE as any).HDRCubeTextureLoader()
                .load(THREE.UnsignedByteType, hdrUrls, (texture) => {
                    const uniforms: any = { envMap: { value: texture }, toneMappingExposure: { value: this._toneMappingExposure } };
                    Utils.instance.loadShaderPair(equirectToCubeVert, equirectToCubeFrag).then((shader) => {
                        let geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(1024, 1024, 1024);
                        let material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
                            uniforms: uniforms,
                            vertexShader: shader.vert,
                            fragmentShader: shader.frag
                        });
                        material.side = THREE.BackSide;
                        console.log(material);
                        this._skybox = new THREE.Mesh(geometry, material);
                        resolve(this._skybox);
                    });
                });
        }
        );
    }
}