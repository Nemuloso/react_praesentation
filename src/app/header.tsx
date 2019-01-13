import * as React from "react";
import "../../styles/app.styles.css";

export interface IHeaderProps {
    onClick: () => void;
    section: string;
}

// i know  its a hack, but somehow the browser refused to apply some styles
const logo: any = {
    width:"5%",
    backgroundImage: `url("${"../../assets/images/logo_V.png"}")`,
    backgroundSize: "100%",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  };

export function Header(props: IHeaderProps): any {
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
                <div style={logo}></div>
            </div>
            <hr />
        </div>
    );
}