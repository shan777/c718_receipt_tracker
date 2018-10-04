import React from 'react';
import './accordion.css';

export default props => (
    <ul className="accordion-container easy">
        { props.children }
    </ul>
);