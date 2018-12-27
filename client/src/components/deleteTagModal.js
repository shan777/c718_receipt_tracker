import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';

class DeleteTagModal extends Component {

    async deleteTag(receiptId, tagId){
        let deleteTagCall = await axios.post('/api/manageTags/deleteReceiptTag', {receiptId: receiptId, tagId: tagId})
        let tagsForReceipt = await axios.post('/api/manageTags/getTagsForReceipt', {receiptId: receiptId})
        this.props.close(tagsForReceipt.data.tags)
    }

    render(){
            return (
                <div className="basic_modal" onClick={this.close}>
                    <div className="basic_modal_content onClick={e => e.stopPropagation()}">
                        <div className="basic_modal_close" onClick={this.props.close}></div>
                        <div className="delete_modal_container">
                            <div className="sure">You are about to delete this tag.<br/>Do you wish to continue?</div>
                            <button className="modalbtn cancel" onClick={this.props.cancel}>Cancel</button>
                            <button className="modalbtn update-color" onClick={() => this.deleteTag(this.props.receiptId, this.props.tagId)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
}

export default DeleteTagModal;