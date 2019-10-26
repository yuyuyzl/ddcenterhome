import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import './ProductPack.css';
const ScrollOverPack = ScrollAnim.OverPack;

function ProductPack(props) {
    const content=props.content.split("\n").map((item,i)=><TweenOne className="content" animation={{delay:150*(i+1),opacity: 1 ,x: 0}} key={i}><p>{item}</p></TweenOne>);
    return (<ScrollOverPack
        id={props.id}
        className="product-page"
        replay
        playScale="30vh"
    >
        <TweenOne className="title" key="-1" animation={{opacity: 1 ,x: 0}}>
            {props.title}
            <span className="author"> by {props.author}</span>
            <a className="more" href={props.link} target="_blank" rel="noopener noreferrer">详情 >></a>
        </TweenOne>
        {content}
    </ScrollOverPack>)
}

export default ProductPack;