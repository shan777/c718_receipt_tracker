import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';

class DeleteModal extends Component {

    async delete(receiptId){
        const deletReceipt = await axios.post('/api/manageReceipts/deleteReceipt',{receiptId: receiptId})
        this.props.close()
    }

    render(){
            return (
                <div className="basic_modal" onClick={this.close}>
                    <div className="basic_modal_content onClick={e => e.stopPropagation()}">
                        <div className="basic_modal_close" onClick={this.props.close}>X</div>
                        <div className="modal_container">
                            <h4 className="sure">Are you sure you want to delete this entry?</h4>
                            <button className="modalbtn cancel" onClick={this.props.close}>Cancel</button>
                            <button className="modalbtn update-color" onClick={() => this.delete(this.props.receiptId)}>I am Sure</button>
                        </div>
                    </div>
                </div>
            )
        }
}

export default DeleteModal;
