import * as React from "react";
import "../../styles/app.styles.css";
import { Header } from "./header";
import { ThreeScene } from "../threescene/threescene";
import { Footer } from "./footer";
import { Section } from "./section";

interface IAppProps {
    stage: number;
}

export class App extends React.Component<IAppProps, any> {

    private sections: any[] = [
        {
            name: "Einleitung",
            sectionTextDiv:
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text">
                            {"\n"
                                + "Fachinformatiker für Anwendungsentwicklung\n"
                                + "\n"
                                + "Stefan Hermes\n"
                                + "\n"
                                + "VisCircle GmbH\n"
                                + "Vahrenwalder Str. 207a\n"
                                + "30165 Hannover"}
                        </div>
                    </div>
                </div>
        },
        {
            name: "Einleitung",
            sectionTextDiv:
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text">
                            {"\n"
                                + "Autolack Shader\n"
                                + "\n"
                                + "Entwicklung eines Shader Programmes zur\n"
                                + "Darstellung von Autolacken im Rahmen der\n"
                                + "Abschlußprüfung der Ausbildung zum\n"
                                + "Fachinformatiker\n"
                                + "\n"}
                        </div>
                    </div>
                </div>
        },
    ];

    public constructor(props: any) {
        super(props);
        this.state = {
            stage: 0
        };
    }

    private increaseStage(): void {
        let state: any = this.state;

        let newStage: number = state.stage + 1;
        if (newStage === this.sections.length) {
            newStage = 0;
        }

        this.setState({
            stage: newStage
        });
    }

    public render(): any {
        return (
            <div id="app_container" className="app">
                <Header section={this.sections[this.state.stage].name}
                    onClick={() => this.increaseStage()} logo="../../assets/images/logo_V.png"></Header>
                <Section textdiv={this.sections[this.state.stage].sectionTextDiv}></Section>
                <ThreeScene></ThreeScene>
                <Footer section={this.sections[this.state.stage].name} onClick={() => alert("lalala")}></Footer>
            </div>
        );
    }
}