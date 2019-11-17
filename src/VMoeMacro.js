import React from "react";
import socket from "./socket";
import "./VMoeMacro.css";
import pako from "pako";
import ReactEcharts from "echarts-for-react";

Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

class VMoeMacro extends React.Component {
    constructor(...args){
        super(...args);
        this.socket=socket;
        this.state={};
    }

    componentDidMount() {
        // this.socket.connect();
        const getWeekData=()=> {
            this.socket.emit('vtbMacroWeekCompressed', undefined, (data) => {
                data = JSON.parse(new TextDecoder().decode(pako.inflate(data))).value;
                let dataSplitted = [];
                const today0600 = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 22);
                for (let line of data) {
                    let i = 0;
                    while (today0600 - i * 24 * 60 * 60 * 1000 > Math.round(line[2]/300000)*300000) i++;
                    if (dataSplitted[i]) dataSplitted[i].push(line); else dataSplitted[i] = [line];
                }
                dataSplitted=dataSplitted.filter(function (el) {
                    return el != null;
                });
                console.log(dataSplitted);
                dataSplitted = dataSplitted.map((data, i) => {
                    return {
                        data: data.map(line => [new Date(Math.round(line[2]/300000)*300000).Format("hh:mm"), line[1]]),
                        type: 'line',
                        smooth: true,
                        symbol: "none",
                        areaStyle: {
                            opacity: i === 0 ? 0.7 : 0.3,
                        },
                        itemStyle:{
                            shadowColor: 'rgba(255, 255, 255, 0.2)',
                            shadowBlur: 10,
                            color:i===0?("rgba(120,213,255,"+(1)+")"):("rgba(255,255,255,"+(0.5-i*0.05)+")")
                        },
                        sampling: "max",
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'}
                            ],
                            label:{
                                textBorderColor:"transparent",
                                textShadowColor: "#000000AA",
                                textShadowBlur: 2
                            }
                        },
                        name: (i <= 2 ? ["今天", "昨天", "前天"][i] : (i + "天前")),
                        z: -i,
                    }
                });
                let xaxdata = [];
                for (let hh = 0; hh < 24; hh++) {
                    for (let mm = 0; mm < 60; mm+=5) {
                        xaxdata.push(("0" + (hh + new Date(today0600).getHours()) % 24).substr(-2) + ":" + ("0" + (mm)).substr(-2));
                    }
                }
                console.log(dataSplitted);
                delete dataSplitted[dataSplitted.length-1];
                var option = {
                    title:{
                        text:"VTB宏观 - B站总人气",
                            left:48,
                            top:16,
                            subtext: '数据源: vtbs.moe',
                            textStyle: {
                            color:"#FFF"
                        }
                    },
                    grid:{
                        left: "0",
                            right:"0",
                            top:32,
                            bottom:60,
                    },
                    tooltip: {
                        trigger: 'axis',
                            axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        data: dataSplitted.map(data => data.name),
                            orient: "vertical",
                            left: 48,
                            top: "middle",
                            textStyle: {
                            color: "#FFF"
                        }
                    },
                    yAxis: {
                        show:false,
                            axisLine: {
                            lineStyle: {
                                color: "#FFF"
                            }
                        },
                        type: 'value',
                            splitLine: {
                            show: false
                        }
                    },
                    xAxis: {
                        axisLine: {
                            lineStyle: {
                                color: "#FFF"
                            },
                        },
                        type: 'category',
                            data: xaxdata,
                            splitLine: {
                            show: false
                        },
                        axisLabel:{
                            showMaxLabel:false,
                                showMinLabel: false
                        }
                    },
                    sort: "none",
                        series: dataSplitted,
                };
                this.setState({option: option});
                console.log(option);
            });
        }
        getWeekData();
        setInterval(getWeekData,100000);
    }

    componentWillUnmount() {
        // this.socket.disconnect();
    }

    render() {
        return (
            <div className="macro-root" style={this.props.style}>
                <div className="macro-container">
                    {this.state.option?(<ReactEcharts option={this.state.option} style={{height: '100%', width: '100%'}}/>):null}
                </div>
            </div>
        )
    }
}




export default VMoeMacro;
