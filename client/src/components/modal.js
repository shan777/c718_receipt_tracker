import React, {Component} from 'react';
import './modal.css';
import TagPanel from './receipt_tags/tag_panel';
import Overview from './overview';


class Modal extends Component{
    

        state = {
            merchantName: '',
            totalAmount: '',
            dateOfPurchase: '',
            category: '',
            note: '',
            newTags:[]
        };

    componentDidMount(){
        const eachUser = [...this.props.data];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[this.props.currentId];
        let currentReceipt = receiptUser[this.props.row]

        this.setState({
            merchantName: currentReceipt.storeName,
            totalAmount: currentReceipt.total,
            dateOfPurchase: currentReceipt.purchaseDate,
            note: currentReceipt.comment
        })
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag, errorMessage} = this.state;
        const categoryArray = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Transportation', 'Lodging', 'Repairs'];
        const categoryChoices = categoryArray.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
            const eachUser = [...this.props.data];
            const mapOfUsers = eachUser.map(item => item.receipts);
            const receiptUser = mapOfUsers[this.props.currentId];
            let currentReceipt = receiptUser[this.props.row]
            console.log(receiptUser[this.props.row]);
            return (
            
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.props.close} className="basic-modal-close">X</div>
                        <form>  
                        <div className="content_container">
                                <label className="input_label">Merchant:</label>
                                <input name='merchantName' className="merchant" onChange={this.handleChange.bind(this)}
                                    type="text"
                                    value = {this.state.merchantName}
                                />
                                <label className="input_label">Date:</label>
                                <input name='dateOfPurchase' className="date" onChange={this.handleChange.bind(this)}
                                    type="date"
                                    value={this.state.dateOfPurchase}
                                />
                                  <label className="input_label">Total Amount:</label>
                                $ <input name='totalAmount' className="amount" onChange={this.handleChange.bind(this)} 
        
                                    type="number" min="0.00" step="0.01"
                                    value={this.state.totalAmount/100}
                                />
                                 <label className="input_label">Note:</label>
                                <input name='note' className="note" placeholder="Not specified" onChange={this.handleChange.bind(this)}
                                    type="text"
                                    value={this.state.note}
                                />
                                <label className="input_label">Category:</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                                <label className="input_label">Tag:</label>
                                <TagPanel tags={this.state.newTags} addCallback={this.handleNewTab}/>
                        </div>
                    </form>
                    </div>
                </div>
        
            )
        }
        return
}

    export default Modal;

