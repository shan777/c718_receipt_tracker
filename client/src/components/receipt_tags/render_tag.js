import React, { Component } from 'react';
import ReceiptTag from './receipt_tag';
import './render_tag.css';

class RenderTag extends Component {

    renderAllTags(){
        return this.props.tags.length>0 ? 
            this.props.tags.map((tagInfo, index)=> <ReceiptTag data={tagInfo} key={index}/>) : '';
    }

    render(){
        return(
            <div className="render_panel">
                {this.renderAllTags()}
            </div>
        );
    }
}

export default RenderTag;