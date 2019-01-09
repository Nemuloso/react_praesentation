import * as THREE from "three";
import { Utils, ShaderPair } from "./utils";
import { resolve } from "dns";
require("../../extern/loader/HDRCubeTextureLoader")(THREE);

export class Skybox {
    private _skybox: THREE.Mesh;
    private _toneMappingExposure: number = 1.0;

    public loadSkybox(): Promise<THREE.Mesh> {
        return new Promise<THREE.Mesh>((resolve) => {
            const equirectToCubeVert: string = "./src/shader/skybox.vert.glsl";
            const equirectToCubeFrag: string = "./src/shader/skybox.frag.glsl";

            let hdrUrls: string[] = [];
            for (let i: number = 0; i < 6; i++) {
                let sideUrl: string = "./assets/textures/env/environment_test_equirect_0_" + i + ".hdr";
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
                        this._skybox = new THREE.Mesh(geometry, material);
                        resolve(this._skybox);
                    });
                    console.log("Success... so I hope!");
                });
        }
        );
    }
}