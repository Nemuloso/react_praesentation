import * as THREE from "three";
import { ShaderPair, Utils } from "./utils";

export class CarpaintMaterial extends THREE.RawShaderMaterial {

    public constructor(env: THREE.CubeTexture, irradianceMap: THREE.CubeTexture) {
        super({
            uniforms: {
                albedo1: { value: new THREE.Color(0.8, 0.0, 0.0) },
                albedo2: { value: new THREE.Color(0.8, 0.0, 0.0) },

                toneMappingExposure: { value: 1.0 },

                colorRatio: { value: 0.5 },
                metallicFactor: { value: 0.95 },
                roughnessFactor: { value: 0.59 },
                aoFactor: { value: 1.0 },

                albedoMap: { value: null },
                normalMap: { value: null },
                metallicMap: { value: null },
                roughnessMap: { value: null },
                aoMap: { value: null },

                envMap: { value: env },
                envMipmaps: { value: null },
                diffuseIBLMap: { value: irradianceMap },
                brdfLUTMap: { value: new THREE.TextureLoader().load("./assets/textures/ibl_brdf_lut.jpg") },

                clearCoat: { value: 1.0 },
                clearCoatRoughness: { value: 0.01 }
            },
            vertexShader: "void main(){ gl_Position = vec4(0.0, 0.0, 0.0, 1.0);}",
            fragmentShader: "void main(){ gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}"
        });
        this.uniforms.envMipmaps.value = env.mipmaps;
        this.initShader();
    }

    private initShader(): void {
        const vertPath: string = "./src/shader/base_raw.vert.glsl";
        const fragPath: string = "./src/shader/carpaint_hdrLod.glsl";

        Utils.instance.loadShaderPair(vertPath, fragPath).then((shader: ShaderPair) => {
            this.vertexShader = shader.vert;
            this.fragmentShader = shader.frag;
            this.needsUpdate = true;
        });
    }
}