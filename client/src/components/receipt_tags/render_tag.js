import React, { Component } from 'react';
import ReceiptTag from './receipt_tag';

class RenderTag extends Component {

    renderAllTags(){
        return this.props.tags.length>0 ? this.props.tags.map( (tagInfo,index)=> <ReceiptTag data={tagInfo} key={index}/>) : 'no tags available';
    }

    render(){
        return(
            <div className="tab_panel">
                {this.renderAllTags()}
            </div>
        );
    }
}

export default RenderTag;