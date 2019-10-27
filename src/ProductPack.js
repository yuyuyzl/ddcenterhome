import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import './ProductPack.css';
const ScrollOverPack = ScrollAnim.OverPack;

function ProductPack(props) {
    const content=typeof props.content ==="string"?
        (props.content.split("\n").map((item,i)=><TweenOne className="content" animation={{delay:150*(i+2),opacity: 1 ,x: 0}} key={i}><p>{item}</p></TweenOne>)):
        props.content.map((obj,i)=><TweenOne className="content" animation={{delay:150*(i+2),opacity: 1 ,x: 0}} key={i}>{obj}</TweenOne>);
    const quoteLines=(props.quote)?props.quote.split("\n").map((item,i)=><p key={i}>{item}</p>):null;
    return (<ScrollOverPack
        id={props.id}
        className="product-page"
        playScale="96px"
    >
        <TweenOne className="title" key="-1" animation={{opacity: 1 ,x: 0}}>
            {props.title}
            {props.author?<span className="author"> by {props.author}</span>:null}
            {props.link?<a className="more" href={props.link} target="_blank" rel="noopener noreferrer">详情 >></a>:null}
        </TweenOne>
        {quoteLines?<TweenOne className="quote" key="-1" animation={{delay:150,opacity: 1 ,x: 0}}>
            {quoteLines}
        </TweenOne>:null}
        {content}
    </ScrollOverPack>)
}

export default ProductPack;