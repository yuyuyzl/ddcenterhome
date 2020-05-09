import TweenOne from 'rc-tween-one';
import React from 'react';
import ScrollAnim from "rc-scroll-anim";
import "./ProductPack.css"
const ScrollOverPack = ScrollAnim.OverPack;

function ProductJumbotron(props) {
    return (
        <div>
            <ScrollOverPack playScale="96px" className={"product-page product-large"}>
                <TweenOne className={"h anim"} key="-1" animation={{delay:0,opacity: 1 ,y: 0}}>
                    <h1>VTBs.Moe - 环哔哩哔哩虚拟主播圈数据中心</h1><span className={"author-center"}>By Simon3000</span>
                </TweenOne>
                <TweenOne className={"h anim"} key="-1" animation={{delay:200,opacity: 1 ,y: 0}}>
                    <p>分布式爬虫，开放API，数据实时更新真实有效</p>
                    <p>DD风云榜，宏观经济K线图，更多精彩等你发现</p>
                </TweenOne>
                <TweenOne className={"iframe anim"} key="-1" animation={{delay:600,opacity: 1 ,y: 0}}>
                    <div className={"browser-title"}>
                        <a href={"https://vtbs.moe"} target="_blank" rel="noopener noreferrer">
                            <div className={"browser-url"}>
                                https://vtbs.moe
                            </div>
                        </a>
                    </div>
                    <iframe className={"vmoe"} title={"vmoe"} src={"https://vtbs.moe/?noCache=true"}/>
                </TweenOne>
            </ScrollOverPack>

            <ScrollOverPack playScale="96px" className={"product-page product-large vmusic"}>
                <TweenOne className={"h anim"} key="-1" animation={{delay:0,opacity: 1 ,y: 0}}>
                    <h1>VTB-MUSIC 一个收录VTB歌回的网站</h1><span className={"author-center"}>By santiego、</span>
                </TweenOne>
                <TweenOne className={"h anim"} key="-1" animation={{delay:200,opacity: 1 ,y: 0}}>
                    <p>收录vtb的歌回、原创单曲等，提供在线播放</p>
                </TweenOne>
                <TweenOne className={"iframe anim"} key="-1" animation={{delay:600,opacity: 1 ,y: 0}}>
                    <div className={"browser-title"}>
                        <a href={"https://vtbmusic.com"} target="_blank" rel="noopener noreferrer">
                            <div className={"browser-url"}>
                            https://vtbmusic.com
                            </div>
                        </a>
                    </div>
                    <iframe className={"vmoe"} title={"vmoe"} src={"https://santiego.gitee.io/vtb-music/"}/>
                </TweenOne>
            </ScrollOverPack>

            <ScrollOverPack playScale="96px" className={"product-page product-large"}>
                <TweenOne className={"anim"} key="-1" animation={{delay:0,opacity: 1 ,y: 0}}>
                    <h1>BiliChat</h1>
                    <h1>更多主播使用的哔哩哔哩弹幕框</h1>
                    <span className={"author-center"}>By 3Shain</span>
                </TweenOne>
                <TweenOne className={"anim"} key="-1" animation={{delay:200,opacity: 1 ,y: 0}}>
                    <p>YouTube样式直接兼容，样式生成器一并提供</p>
                    <p>企业势B限的第一选择</p>
                </TweenOne>
                <TweenOne className={"anim"} key="-1" animation={{delay:400,opacity: 1 ,y: 0}}>
                    <a href="https://bilichat.3shain.com/" target="_blank" rel="noopener noreferrer">官方网站 >></a>
                    <div style={{height:"64px"}}></div>
                </TweenOne>
                <TweenOne className={"iframe bilichat anim"} key="-1" animation={{delay:0,opacity: 1 ,y: 0}}>
                    <AutoBiliChat></AutoBiliChat>
                </TweenOne>
            </ScrollOverPack>
        </div>
    )
}

class AutoBiliChat extends React.Component{
    constructor(...args){
        super(...args);
        this.state={roomid:null}
    }
    async componentDidMount() {
        try {
            const res = (await (await fetch("https://api.vtbs.moe/v1/info")).json()).sort((a, b) => a.online - b.online);
            this.setState({roomid: res.pop().roomid});
        }catch (e) {

        }
    }

    render() {
        return <iframe title={"bilichat"} src={this.state.roomid?"https://vtbs.moe/BiliChat/?pure=true&room="+this.state.roomid:"about:blank"}/>
    }
}

export default ProductJumbotron;
