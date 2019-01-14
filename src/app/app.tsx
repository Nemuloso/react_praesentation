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
            },
            sectionTextDiv:
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text">
                            {"\n"
                                + "\n"
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
                                + "Einleitung - Vorstellung\n"
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
                section: "Planung und Analyse - Vorgehensweise",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text_left" style={{marginTop:"2vh"}}>
                            {"Vorgehensweise:\n"
                                + "  -agile Entwicklung\n"
                                + "\n"
                                + "Begründung:\n"
                                + "  -kleine Projekte\n"
                                + "  -keine klassische Validierung\n"
                                + "  -individuelle Anforderungen durch die Szene\n"
                                + "  -visuelle Darstellung\n"
                                + "  -subjektives Schönheitsempfinden\n"
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
                section: "Planung und Analyse - Projektabgrenzung, Abweichungen vom Projektantrag und Projektphasen",
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
                                + "  -Flakes\n"
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
                            <table>
                                <thead>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                    </tr>
                                    <tr>
                                        <th>Vorgang</th>
                                        <th>Zeit</th>
                                        <th>Personal</th>
                                        <th>Kosten pro Stunde</th>
                                        <th>Summe</th>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                    </tr>
                                </thead>
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
                                <tfoot>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinetop"></div></td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>3791,00{"\u20AC"}</th>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                    </tr>
                                    <tr style={{ background: "white" }}>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                        <td style={{ padding: "0" }}><div className="flexlinebottom"></div></td>
                                    </tr>
                                </tfoot>
                            </table>
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
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Einführung - Grundlagen: Begriffe",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge">
                        <div className="section_text_left">
                            {"Shader:\n"
                                + "  -Ausführung auf der GPU\n"
                                + "  -mindestens zwei Programme\n"
                                + "  -Vertex-Shader für die Geometrie\n"
                                + "  -Fragment-Shader für \"Farben\"\n"
                                + "\n"
                                + "GLSL (OpenGL Shading Language):\n"
                                + "  -Sprach-Spezifikation der Khronos Group\n"
                                + "  -C ähnlich\n"
                                + "  -hoch optimiert\n"
                                + "  -kompiliert zur Laufzeit\n"
                                + "  -Attribute, Uniform, Varying\n"
                                + "  -int, float, vecX, matX, sampler (Texturen)"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 3
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Einführung - Genutzte Technologien",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge">
                        <div className="section_text_left">
                            {"three.js:\n"
                                + "  -umfangreiche 3D-Bibliothek\n"
                                + "  -intuitiver Zugang\n"
                                + "  -Klassen und Funktionen\n"
                                + "  -open source\n"
                                + "  -nutzt WebGL\n"
                                + "\n"
                                + "WebGL (Web Graphics Library):\n"
                                + "  -Schnittstellen-Spezifikation der Khronos Group\n"
                                + "  -basiert auf OpenGL ES 2.0(OpenGL Embeded Systems)\n"
                                + "  -low level API (Application Programming Interface)\n"
                                + "  -3D Darstellung im Web Browser\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 3
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - PBR",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text_left">
                            {"PBR (Physically Based Rendering):\n"
                                + "  -Beleuchtungsmodell\n"
                                + "  -Mikrostruktur der Oberfläche\n"
                                + "  -Energieerhaltung\n"
                                + "  -physically based BRDF (bidirectional\n"
                                + "   reflective distribution function)\n"
                                + "\n"
                                + "\n"
                            }
                        </div>
                        <div style={{ fontSize: "120%" }} className="section_text_left">
                            {"      Das Metallic-Roughness-Modell\n"}
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - Der Basis-Shader",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text_left">
                            {"Mikrostruktur:\n"}
                        </div>
                        <div style={{ backgroundImage: `url("${"../../assets/images/microfacets.png"}")` }}
                            className="microstructure background_image"></div>
                        <div className="section_text_left">
                            {"Energieerhalt:\n"}
                        </div>
                        <div style={{ fontSize: "90%", padding: "0.5vh 0 2vh 0" }} className="section_text_left">
                            {"Das ausgehende Licht darf nicht heller sein als das\n"
                                + "eingehende.\n"
                                + "Dies ist durch die Mikrostrukur bereits gegeben.\n"
                            }
                        </div>
                        <div className="section_text_left">
                            {"      Spiegelung (reflected specular light)\n"
                                + "      Absorbtion  (refracted diffuse light)\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - BRDF",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge" style={{ marginTop: "2vh" }}>
                        <div className="section_text_left">
                            {"Die Cook-Torrance-BRDF"}
                        </div>
                        <div className="ct_flex">
                            <div className="background_image ct_size" style={{
                                width: "30vw",
                                backgroundImage: `url("${"./assets/images/cook_torrance_01.PNG"}")`
                            }}>
                            </div>
                            <div className="background_image ct_size" style={{
                                width: "25vw",
                                backgroundImage: `url("${"./assets/images/cook_torrance_02.PNG"}")`
                            }}>
                            </div>
                        </div>
                        <div style={{ fontSize: "80%", marginLeft: "2vw" }} className="section_text_left">
                            {"Normal distribution function:\n"
                                + "    Abweichung des Normalenvektors durch\n"
                                + "    Roughness der Mikrostruktur\n"
                                + "  Fresnel Gleichung:\n"
                                + "      Anteil des reflektierten Lichtes aus\n"
                                + "      unterschiedlichen Winkeln\n"
                                + "    Geometrie Funktion:\n"
                                + "        Selbstbeschattungs-Eigenschaft der\n"
                                + "        Oberfläche"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - IBL",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge" style={{ marginTop: "1vh" }}>
                        <div className="section_text_left">
                            {"Image Based Lighting:\n"
                                + "  -Vorberechnung der Beleuchtung\n"
                                + "  -Ergebnisse in Umgebungs-Texturen\n"
                                + "  -eine Textur für diffuses Licht\n"
                            }
                        </div>
                        <div className="ct_flex">
                            <div className="background_image" style={{
                                width: "40vw", height: "20vh",
                                backgroundImage: `url("${"./assets/images/ibl_irradiance.png"}")`
                            }}>
                            </div>
                        </div>
                        <div className="section_text_left">
                            {"  -mehrere Texturen für Reflektionen bei\n"
                                + "   unterschiedlich rauer Oberfläche\n"
                            }
                        </div>
                        <div className="ct_flex">
                            <div className="background_image" style={{
                                width: "40vw", height: "20vh",
                                backgroundImage: `url("${"./assets/images/ibl_prefilter_map.png"}")`
                            }}>
                            </div>
                        </div>
                        <div className="section_text_left">
                            {"  - High Dynamic Range Images (HDR-Bilder)\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - IBL",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_xlarge" style={{ fontSize: "125%", marginTop: "1vh" }}>
                        <div className="section_text_left">
                            {"Ein Experiment:\n"
                                + "Eine Tonwertkorrektur auf einen geringeren Farbereich erzeugt eine Stauchung\n"
                                + "des Farbraumes. Dadurch sind keine extrem hohen Farbwerte mehr vorhanden.\n"
                                + "Dies ermöglicht die vorhandenen Werte mit geringerer Bittiefe darzustellen und\n"
                                + "zu speichern. Die Umgebung wird im JPG Format abgelegt.\n"
                                + "Der Shader rechnet Farben wieder auf den ursprünglichen Umfang hoch.\n"
                                + "\n"
                            }
                            <div className="ct_flex">
                                <div className="background_image" style={{
                                    width: "40vw", height: "20vh",
                                    backgroundImage: `url("${"./assets/images/arches_ldr_orig.jpg"}")`
                                }}>
                                </div>
                            </div>
                            <div className="section_text_left">
                                {"Original Bild der Umgebung\n"}
                            </div>
                            <div className="ct_flex">
                                <div className="background_image" style={{
                                    width: "40vw", height: "20vh",
                                    backgroundImage: `url("${"./assets/images/arches_FAKE_HDR.jpg"}")`
                                }}>
                                </div>
                            </div>
                            <div className="section_text_left">
                                {"Bild der Umgebung im gestauchtem Farbraum\n"}
                            </div>
                            <div className="section_text_left">
                                {"\nFarbnuancen gehen verloren. Oft zu stark sichtbare Übergänge."}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - Klarlack",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text_left">
                            {"\n"
                                + "Klarlack:\n"
                                + "  -Transparente Lackschicht über der Farbe\n"
                                + "  -Spiegelung der Umgebung\n"
                                + "  -Erneute Berechnung mit der\n"
                                + "   Cook-Torrance-Funktion\n"
                                + "  -Addition des Ergebnisses auf den bisherigen\n"
                                + "   Farbvektor\n"
                                + "  -Ausgabe der Werte zwischen 0 und 1\n"
                                + "\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Implementierung - Effektlacke",
            },
            sectionTextDiv: (
                <div style={{ width: "50vw" }}>
                    <div className="section_std section_xlarge">
                        <div style={{ display: "flex", marginTop: "2vh" }}>
                            <div className="section_text_left" style={{ width: "33vw" }}>
                                {"\n"
                                    + "Flakes:\n"
                                    + "  -Spiegelnde Metallplättchen im Lack\n"
                                    + "  -Darstellung mit Noise Texturen\n"
                                    + "  -Prozedural Erzeugt\n"
                                    + "\n"
                                }
                            </div>
                            <div className="background_image" style={{
                                width: "175px", marginTop: "6%",
                                backgroundImage: `url("${"./assets/images/flakes.PNG"}")`
                            }}>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="section_text_left" style={{ width: "33vw" }}>
                                {"Mehrfarbigkeit:\n"
                                    + "  -Blenden zwischen zwei Vektoren\n"
                                    + "  -Abhängig vom Blickwinkel\n"
                                    + "  -Errechnung mit Hilfe des\n"
                                    + "   Skalarprodukts\n"
                                    + "\n"
                                }
                            </div>
                            <div className="background_image" style={{
                                width: "180px", marginTop: "2%",
                                backgroundImage: `url("${"./assets/images/twocolors.PNG"}")`
                            }}>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 4
            }
        },
        {
            headerProps: {
                onClick: () => this.increaseStage(),
                section: "Auswertung - Fazit",
            },
            sectionTextDiv: (
                <div>
                    <div className="section_std section_huge">
                        <div className="section_text_left">
                            {"Abschließende Betrachtung:\n"
                                + "  -Test Experimenteller Verfahren\n"
                                + "  -Basis zukünftiger Shader Entwicklungen\n"
                                + "\n"
                                + "Ausblick:\n"
                                + "  -IBL Bildformate und Kompressions-\n"
                                + "   verfahren\n"
                                + "  -Flakes mit Noise Texturen und\n"
                                + "   triplanarem Mapping\n"
                                + "  -Mehrfarbigkeit Optimierungen\n"
                            }
                        </div>
                    </div>
                </div>
            ),
            footProps: {
                onClick: () => console.log(this.state.stage),
                stage: 5
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
                    onClick={this.sections[this.state.stage].headerProps.onClick}>
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