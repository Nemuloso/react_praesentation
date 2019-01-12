import * as React from "react";
import "../../styles/app.styles.css";
import { Header, IHeaderProps } from "./header";
import { ThreeScene } from "../threescene/threescene";
import { Footer, IFooterProps } from "./footer";
import { Section } from "./section";

interface IAppProps {
    stage: number;
}

interface IPropsCollection {
    headerProps: IHeaderProps;
    sectionTextDiv: any;
    footProps: IFooterProps;
}

export class App extends React.Component<IAppProps, any> {

    private sections: IPropsCollection[] = [
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Einleitung - Vorstellung",
                logo: "../../assets/images/logo_V.png"
            },
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
                </div>,
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 1
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Einleitung - Titel",
                logo: "../../assets/images/logo_V.png"
            },
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
                </div>,
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 1
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Einleitung - Vorwort",
                logo: "../../assets/images/logo_V.png"
            },
            sectionTextDiv:
                <div>
                    <div className="section_std section_xlarge">
                        <div className="section_text_left">
                            {"\n"
                                + "Worum es geht:\n"
                                + "\n"
                                + "Neues Framework three.js - Anpassungen und Erweiterung\n"
                                + "\n"
                                + "Programm zur Darstellung von Oberflächen - Shader\n"
                                + "\n"
                                + "Ein neues Material - Planung\n"
                                + "Vorbereitung - Begriffserklärungen\n"
                                + "Implementierung - Details und Beispiele\n"
                                + "Ergebnis - Fazit\n"}
                        </div>
                    </div>
                </div>,
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 1
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Planung und Analyse - Projektabgrenzung, Abweichungen vom Projektantrag und Projektphasen",
                logo: "../../assets/images/logo_V.png"
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge">
                        <div className="section_text_left">
                            {"Projektabgrenzung:\n"
                                + "  -Das Fragment-Shader-Programm\n"
                                + "\n"
                                + "Abweichungen vom Projektantrag:\n"
                                + "  -Vorhandener Shader mit Basis Funktionen\n"
                                + "\n"
                                + "Projektphasen:\n"
                                + "  -Anpassungen am Basis Shader\n"
                                + "  -Clear Coat\n"
                                + "  -Flakes (2 Std)\n"
                                + "  -IBL: Diskussion, Implementierung und Testen eines\n"
                                + "   experimentellen Ansatzes\n"
                                + "  -Zweifarbigkeit\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 2
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Planung und Analyse - Ressourcen, Kosten und Nutzen",
                logo: "../../assets/images/logo_V.png"
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge">
                        <div className="section_text_left">
                            {"Benötigte Ressourcen:\n"
                                + "  -Vergütung der Mitarbeiter\n"
                                + "  -Arbeitsplatz und Hardware\n"
                            }
                        </div>
                        <div className="costsDiv">
                            <div className="section_text_left">
                                {"Projektkosten:"}
                            </div>
                            <div className="flexlinetop"></div>
                            <div className="flexlinetop"></div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Vorgang</th>
                                        <th>Zeit</th>
                                        <th>Personal</th>
                                        <th>Kosten pro Stunde</th>
                                        <th>Summe</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="flexlinebottom"></div>
                            <div className="flexlinebottom"></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Entwicklung</td>
                                        <td>70 h</td>
                                        <td>1 x Auszubildender</td>
                                        <td>19,00{"\u20AC"}</td>
                                        <td>1330,00{"\u20AC"}</td>
                                    </tr>
                                    <tr>
                                        <td>Fachgespräch</td>
                                        <td>3 h</td>
                                        <td>1 x Anwendungsentwickler</td>
                                        <td>37,00{"\u20AC"}</td>
                                        <td>111,00{"\u20AC"}</td>
                                    </tr>
                                    <tr>
                                        <td>Abnahme</td>
                                        <td>2 h</td>
                                        <td>1 x Gesellschafter</td>
                                        <td>47,00{"\u20AC"}</td>
                                        <td>94,00{"\u20AC"}</td>
                                    </tr>
                                    <tr>
                                        <td>Belichtungsmodell</td>
                                        <td>24 h</td>
                                        <td>2 x Gesellschafter</td>
                                        <td>47,00{"\u20AC"}</td>
                                        <td>2256,00{"\u20AC"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flexlinetop"></div>
                            <div className="flexlinetop"></div>
                            <table>
                                <tfoot>
                                    <tr>
                                        <th>Vorgang</th>
                                        <th>Zeit</th>
                                        <th>Personal</th>
                                        <th>Kosten pro Stunde</th>
                                        <th>3791,00{"\u20AC"}</th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="flexlinebottom"></div>
                            <div className="flexlinebottom"></div>
                        </div>
                        <div className="section_text_left">
                            {"Nutzen:\n"
                                + "  -Qualität\n"
                                + "  -Wettbewerbsfähigkeit ausbauen und Kunden gewinnen\n"
                                + "  -Zeitersparnis in der Zukunft\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 2
            }
        }
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
                <Header section={this.sections[this.state.stage].headerProps.section}
                    onClick={this.sections[this.state.stage].headerProps.onClick}
                    logo={this.sections[this.state.stage].headerProps.logo}>
                </Header>
                <Section textdiv={this.sections[this.state.stage].sectionTextDiv}></Section>
                <ThreeScene></ThreeScene>
                <Footer stage={this.sections[this.state.stage].footProps.stage}
                    onClick={this.sections[this.state.stage].footProps.onClick}>
                </Footer>
            </div>
        );
    }
}