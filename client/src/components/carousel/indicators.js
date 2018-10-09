import React from 'react';

export default props => {
    const { count, current } = props;
    const dots = [];

    for(let i = 0; i < count; i++){
        dots.push(
            <div onClick={props.onClick.bind(this, i)} key={i} className={`dot ${current === i ? 'active' : ''}`}></div>
        )
    }

    return (
        <div className="indicators">
            {dots}
        </div>
    )
}
