import * as React from "react";
import "../../styles/app.styles.css";

export function Footer(props: any): any {
    return (
        <div className="footer_container">
            <hr />
            <div className="footer" onClick={props.onClick}>
                <div className="footer_textfield">
                    <div>
                        <span>
                            Entwicklung eines Shader Programmes für Lackierte Oberflächen
                        </span>
                    </div>
                    <div className="footer_section">
                        {props.section}
                    </div>
                </div>
            </div>
        </div>
    );
}