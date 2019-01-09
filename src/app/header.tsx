import * as React from "react";
import "../../styles/app.styles.css";

export function Header(props: any): any {
    return (
        <div className="header_container">
            <div className="header" onClick={props.onClick}>
                <div className="header_textfield">
                    <div>
                        <span className="vc_font">VisCircle GmbH</span>
                        <span>
                            , Stefan Hermes
                        <br />
                            Entwicklung eines Shader Programmes für Lackierte Oberflächen
                        </span>
                    </div>
                    <div className="header_section">
                        {props.section}
                    </div>
                </div>
                <div>
                    <img src={props.logo} className="logo"></img>
                </div>
            </div>
            <hr />
        </div>
    );
}