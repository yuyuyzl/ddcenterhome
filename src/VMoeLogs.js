import React from "react";
import socket from "./socket";
import "./VMoeLogs.css"

class VMoeLogs extends React.Component {
    constructor(...args){
        super(...args);
        this.socket=socket;
        this.socket.on("log",(log)=>{
            log=log.split(": UPDATED:");
            if(log.length>=2){
                console.log(log);
                let state={};
                state[log[0].toLocaleUpperCase()]=log[1].match(/ - (.*)/).pop();
                this.setState(state);
                setTimeout(()=>{
                    if(this.state[log[0].toLocaleUpperCase()]===log[1].match(/ - (.*)/).pop())this.setState((state,props)=>{
                        delete state[log[0].toLocaleUpperCase()];
                        return state;
                    })
                },10000);
            }

        });
        this.state={};
    }
    componentDidMount() {
        // this.socket.connect();
    }

    componentWillUnmount() {
        // this.socket.disconnect();
    }

    render() {
        const spiders=Object.keys(this.state).sort().map((spiderName)=>
            <SpiderLog key={spiderName} name={spiderName} log={this.state[spiderName]}/>
        );
        return (
            <div className="logs-root" style={this.props.style}>
                {spiders}
            </div>
        )
    }
}

function SpiderLog(props){
    return(
        <div className="spider">
            <h5>{props.name}</h5>
            <h4 key={props.log}>{props.log}</h4>
        </div>
    )
}

export default VMoeLogs;
