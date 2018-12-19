import * as React from "react";
import "../../styles/app.styles.css";

export function Header(props: any): any {
    return (
        <div className="header_container">
            <div
                className="header"
                onClick={props.onClick}>
                {props.value}
                <img src={props.logo} className="logo"></img>
            </div>
            <hr />
        </div>
    );
}