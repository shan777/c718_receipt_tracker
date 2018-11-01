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
            return <div className='noTags'>No tags</div>
        }
        const render = data.map((item, index) => (
                <button className="custom_tag" type="button" key={index}><i className="material-icons custom_tag_icon">local_offer</i>{data[index].tagName}</button>
        ))
        return render;
    }


    
    render(){
        const { children, title } = this.props;
        const { visible } = this.state;
        console.log('data:', this.state.data);
        
        return (
            <li className="accordion_item" onClick={this.toggleVisible.bind(this)}>
                <div className="collapsible_header">{title} <i className={`material_icons ${visible && 'open'}`}>View Details</i></div>
                <div className={`collapsible_body ${visible && 'visible'}`}>{children}
                    <div className="render_panel">
                        <div className="tag_text">Tags:</div> 
                        <br/>
                        {this.state.data ? this.renderTags(): null}
                        <br/>
                        <div className="deletebtn">
                            <i onClick={() => this.props.deleteOpen(this.props.receiptId)}  className="material-icons">delete</i>
                        </div>
                        <div className='editbtn'>
                            <i className="material-icons" onClick={()=> this.props.open(this.props.index, this.props.receiptId, this.props.total)}>edit</i>
                        </div>
                    </div>
                 </div>
                
            </li>
        );
    }
}

export default AccordionItem;