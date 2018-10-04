import React, { Component } from 'react';
import users from '../dummy_data/dummyList.js';

class AccordionItem extends Component {
    state = {
        visible: false
    }
    
    toggleVisible = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
    
    render(){
        const { children, title } = this.props;
        const { visible } = this.state;
        
        return (
            <li className="accordion-item" onClick={this.toggleVisible}>
                <div className="collapsible-header">{title} <i className={`material-icons ${visible && 'open'}`}>View Details</i></div>
                <div className={`collapsible-body ${visible && 'visible'}`}>{children}</div>
            </li>
        );
    }
}

export default AccordionItem;