import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import * as _ from "lodash";

const SIZE = 20;
const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const ranDayData = new Array(4);
for (var i = 0; i < SIZE; i++) {
    ranDayData[i] = _.shuffle(week);
}

@observer
export class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h2>{`Rows: ${SIZE}`}</h2>
                <Timmer />
                <TableBody1 />
                <TableBody2 />
            </div>
        );
    }
}

@observer
class Timmer extends React.Component<any, any> {
    @observable timer: string;
    render() {
        return (
            <p>{this.timer}</p>
        );
    }

    componentDidMount() {
        setInterval(
            () => { this.timer = new Date().toLocaleTimeString(); },
            1000
        );
    }
}

@observer
class TableBody1 extends React.Component<any, any> {
    @observable showTable: boolean = false;

    render() {
        return (
            <div className="container">
                <input type="button" value="Start inline fun" onClick={this.onBtnClick} />
                {
                    this.showTable && <TableContentInline />
                }
            </div>
        );
    }

    onBtnClick = () => {
        this.showTable = !this.showTable;
    }
}

@observer
class TableContentInline extends React.Component<{}, any> {
    @observable cellVal: string = "Nothing";

    render() {
        return (
            <div>
                <h3>{this.cellVal}</h3>
                <table className="table table-striped">
                    <thead>
                        <HeaderRow />
                    </thead>
                    <tbody>
                        {
                            ranDayData.map((v, i) =>
                                <tr key={i}>
                                    {
                                        v.map((c, j) => <BodyCell key={i.toString() + j.toString()} value={c} onClick={() => { this.cellVal = c; }} />)
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

@observer
class TableBody2 extends React.Component<any, any> {
    @observable showTable: boolean = false;

    render() {
        return (
            <div style={{ paddingTop: 30 }}>
                <input type="button" value="Start arrow fun" onClick={this.onBtnClick} />
                {
                    this.showTable && <TableContentFun />
                }
            </div>
        );
    }

    onBtnClick = () => {
        this.showTable = !this.showTable;
    }
}

@observer
class TableContentFun extends React.Component<{}, any> {
    @observable cellVal: string = "Nothing";
    render() {
        return (
            <div className="container">
                <h3>{this.cellVal}</h3>
                <table className="table table-striped">
                    <thead>
                        <HeaderRow />
                    </thead>
                    <tbody>
                        {
                            ranDayData.map((v, i) =>
                                <tr key={i}>
                                    {
                                        v.map((c, j) =>
                                            <BodyCell key={i.toString() + j.toString()} value={c} onClick={this.onClick} idx={j} />)
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    onClick = (obj?: any) => {
        this.cellVal = obj;
    }
}

@observer
class HeaderRow extends React.Component<any, any> {
    render() {
        const headerValues = _.range(1, 8);
        return (
            <tr>
                {
                    headerValues.map(i => <HeaderCell key={i} value={i} />)
                }
            </tr>
        );
    }
}

@observer
class HeaderCell extends React.Component<{ value: any }, any> {
    render() {
        return (
            <th>
                <div>{this.props.value}</div>
            </th>
        );
    }
}

@observer
class BodyCell extends React.Component<{ value: any, onClick?(obj?: any): void, idx?: any }, any> {
    render() {
        return (
            <td>
                <div onClick={this.onClick}>{this.props.value}</div>
            </td>
        );
    }

    onClick = () => {
        this.props.onClick(this.props.value);
    }
}