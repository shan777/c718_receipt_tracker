import React, { Component } from 'react';
import users from '../dummy_data/dummyList.js';
import axios from 'axios';

class AccordionItem extends Component {
    state = {
        visible: false,
        receiptId: null, 
        data: null
    }
    
    async toggleVisible() {
        let receiptId = this.props.receiptId;
        const receipt_tags = await axios.post('/api/manageTags/getTagsForReceipt', {receiptId: receiptId})
        this.setState({
            visible: !this.state.visible,
            data: receipt_tags
        });
        
    }

    renderTags(){
        const data = this.state.data.data.tags;
        const render = data.map((item, index) => (
                <div className="tag">{data[index].tagName ? ' '+ data[index].tagName : 'No Tags' }</div>
            
        ))
        return render;
    }


    
    render(){
        const { children, title } = this.props;
        const { visible } = this.state;
        
        return (
            <li className="accordion_item" onClick={this.toggleVisible.bind(this)}>
                <div className="collapsible_header">{title} <i className={`material_icons ${visible && 'open'}`}>View Details</i></div>
                <div className={`collapsible_body ${visible && 'visible'}`}>{children}
                    <div className="render_panel">
                    <div className="tag_text">Tags:</div> 
                    {this.state.data ? this.renderTags() : null}
                    </div>
                 </div>
                
            </li>
        );
    }
}

export default AccordionItem;