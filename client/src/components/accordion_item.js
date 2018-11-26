import React, { Component } from 'react';
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
        if(data.length === 0){
            return <div className='noTags'> — </div>
        }
        const renderTags = data.map((item, index) => (
            <button className="custom_tag" type="button" key={index}># {data[index].tagName}</button>
        ))
        return renderTags;
    }


    
    render(){
        const { children, title } = this.props;
        const { visible } = this.state;
        
        return (
            <li className="accordion_item" onClick={this.toggleVisible.bind(this)}>
                <div className="collapsible_header">{title} <i className={`material_icons ${visible && 'open'}`}>View Details</i></div>
                <div className={`collapsible_body ${visible && 'visible'}`}>{children}
                    <div className="render_panel">
                        <label className="tag_text">Tags :</label> 
                        <div className="accordion_tag_buttons">
                        {this.state.data ? this.renderTags(): null}
                        </div>

                        <div className="accordion_buttons_container">
                            <i className="material-icons accordion_icon delete_btn" onClick={() => this.props.deleteOpen(this.props.receiptId)}>delete</i>
                            <i className="material-icons accordion_icon edit_btn" onClick={() => this.props.open(this.props.index, this.props.receiptId, this.props.total, this.state.data.data.tags)}>edit</i>
                        </div>
                    </div>
                 </div>
                
            </li>
        );
    }
}

export default AccordionItem;