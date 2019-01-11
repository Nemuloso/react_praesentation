import * as React from "react";
import "../../styles/app.styles.css";
import { Header } from "./header";
import { ThreeScene } from "../threescene/threescene";
import { Footer } from "./footer";
import { Section } from "./section";

export class App extends React.Component {

    private stage: number = 0;
    private sections: any[] = [
        {
            name: "Einleitung",
            sectionTextDiv: <div>HAHA!</div>
     }
    ];

    public constructor(props: any) {
        super(props);
    }

    public render(): any {
        return (
            <div id="app_container" className="app">
                <Header section={this.sections[this.stage].name}
                onClick={() => console.log("lalala")} logo="../../assets/images/logo_V.png"></Header>
                <Section textdiv={this.sections[this.stage].sectionTextDiv}></Section>
                <ThreeScene></ThreeScene>
                <Footer section={this.sections[this.stage].name} onClick={() => console.log("lalala")}></Footer>
            </div>
        );
    }
}