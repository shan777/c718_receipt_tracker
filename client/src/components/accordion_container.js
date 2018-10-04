import React from 'react';
import './accordion.css';

export default props => (
    <ul className="accordion_container easy">
        { props.children }
    </ul>
);