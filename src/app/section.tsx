import * as React from "react";
import "../../styles/app.styles.css";

export function Section(props: any): any {
    return (
        <div className="section_container">
            <div className="section">
                <div className="section_textfield">
                    {
                        props.textdiv
                    }
                </div>
            </div>
        </div>
    );
}