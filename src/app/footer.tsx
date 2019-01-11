import * as React from "react";
import "../../styles/app.styles.css";

interface IFooterProps {
    onClick: () => void;
    section: number;
}

interface IStageProps {
    active: boolean;
    name: string;
}

class Stage extends React.Component<IStageProps, any> {

    public constructor(props: IStageProps) {
        super(props);
        this.state = {
            active: props.active,
            name: props.name
        };
    }

    public render(): any {
        let classString: string = "stage";
        if (this.state.active) {
            classString += " stage_active";
        }
        return (
            <div className={classString}>
                <span className="stage_span">{this.state.name}</span>
            </div>
        );
    }
}

export class Footer extends React.Component<IFooterProps, any> {

    private stages: IStageProps[] = [
        { active: true, name: "Einleitung" },
        { active: false, name: "Planung und Analyse" },
        { active: false, name: "Thematische Einführung" },
        { active: false, name: "Implementierung" },
        { active: false, name: "Auswertung und Fazit" }
    ];

    public constructor(props: IFooterProps) {
        super(props);
        this.state = {
            stage: 0,
            onClick: props.onClick,
            section: props.section
        };
    }

    private renderStage(i: number): any {
        return (
            <Stage key={i} name={this.stages[i].name}
                active={this.stages[i].active}
            />);
    }

    private renderStages(): any[] {
        let result: any[] = [this.renderStage(0)];
        for (let i: number = 1; i < this.stages.length; i++) {
            result.push(<div key={-i} className="line"></div>);
            result.push(this.renderStage(i));
        }
        return result;
    }

    public render(): any {
        return (
            <div className="footer_container">
                <hr />
                <div className="footer" onClick={this.state.onClick}>
                    {this.renderStages()}
                </div>
            </div>
        );
    }
}