import * as React from "react";
import "../../styles/app.styles.css";
import { ThreeScene } from "../threescene/threescene";

export class App extends React.Component {

    public constructor(props: any) {
        super(props);
    }

    public render(): any {
        return (
            <div id="app_container" className="app">
                <div className="three_container three_container_abs_size">
                    <div className="three_container_overlay three_container_abs_size"></div>
                    <div className="three_scene_container">
                        <ThreeScene></ThreeScene>
                    </div>
                </div>
            </div>
        );
    }
}