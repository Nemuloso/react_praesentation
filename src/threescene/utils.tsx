
export type ShaderPair = { vert: any, frag: any };

export class Utils {

    private static _instance:Utils = null;

    private constructor() {}

    public static get instance():Utils {
        if(Utils._instance === null) {
            Utils._instance = new Utils;
        }
        return Utils._instance;
    }

    public loadShaderPair(vertPath: string, fragPath: string): Promise<ShaderPair> {
        let shader: ShaderPair = { vert: null, frag: null };

        return new Promise<ShaderPair>((resolve) => {
            let vertRequest: XMLHttpRequest = new XMLHttpRequest();
            vertRequest.open("GET", vertPath);
            vertRequest.onreadystatechange = () => {

                if (vertRequest.readyState === 4 && vertRequest.status === 200) {
                    shader.vert = vertRequest.responseText;

                    let fragRequest: XMLHttpRequest = new XMLHttpRequest();
                    fragRequest.open("GET", fragPath);
                    fragRequest.onreadystatechange = () => {

                        if (fragRequest.readyState === 4 && fragRequest.status === 200) {
                            shader.frag = fragRequest.responseText;
                            resolve(shader);
                        }
                    };
                    fragRequest.send();
                }
            };
            vertRequest.send();
        });
    }
}