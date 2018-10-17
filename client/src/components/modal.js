import React, {Component} from 'react';
import './modal.css';
import TagPanel from './receipt_tags/tag_panel';
import Overview from './overview';
import axios from 'axios';


class Modal extends Component{
    state = {
        merchantName: '',
        totalAmount: '',
        dateOfPurchase: '',
        category: '',
        note: '',
        newTags:[],
        receiptId: null,
    };

    componentDidMount(){
        const currentUser = [...this.props.data.data.receipts];
        let currentReceipt = currentUser[this.props.row]

        this.setState({
            merchantName: currentReceipt.storeName,
            totalAmount: currentReceipt.total,
            dateOfPurchase: currentReceipt.purchaseDate,
            note: currentReceipt.comment,
            receiptId: this.props.receiptId,
            totalAmount: this.props.total/100,
            category: currentReceipt.category
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        let {merchantName, dateOfPurchase, totalAmount, category, note, receiptId, tag, errorMessage} = this.state;
        const update = await axios.post('/api/updateReceipt', {
            receiptId: receiptId,
            storeName: merchantName,
            purchaseDate: `${this.formatDate(dateOfPurchase)}`,
            total: parseFloat(totalAmount)*100,
            category: category,
            comment: note
        });
        console.log('update]:', update);
        console.log('total', totalAmount);
        {this.props.close(this.state.StoreName)}
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    formatDate(date){
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
           month = "0" + month;
        }
        let day = new Date(date).getUTCDate();
        if(day < 10){
          day = "0" + day;
        }
        let formatDate = `${year}-${month}-${day}`;
        return formatDate;
    }

    render(){
        console.log(this.state.dateOfPurchase);
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag, errorMessage} = this.state;
        const categories = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Transportation', 'Lodging', 'Repairs'];
        const categoryChoices = categories.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
            const currentUser = [...this.props.data];
            let currentReceipt = currentUser[this.props.row]
            return (
                <div className="basic_modal" onClick={this.close}>
                    <div className="basic_modal_content onClick={e => e.stopPropagation()}">
                        <div className="basic_modal_close" onClick={this.props.close}>X</div>
                        <form>  
                        <div className="modal_container">
                            <label className="modal_input_label">Merchant :</label>
                            <input name='merchantName' className="merchant" onChange={this.handleChange.bind(this)}
                                type="text"
                                value = {this.state.merchantName}
                            />

                            <label className="modal_input_label">Date :</label>
                            <input name='dateOfPurchase' className="date" onChange={this.handleChange.bind(this)}
                                type="date"
                                value={this.state.dateOfPurchase.slice(0,10)}
                            />

                            <label className="modal_input_label">Amount :</label>
                            $ <input name='totalAmount' className="amount" onChange={this.handleChange.bind(this)}
                                type="number" min="0.00" step="0.01"
                                value={this.state.totalAmount}
                            />

                            <br/>
                            
                            <label className="modal_input_label">Category :</label>
                            <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                {categoryChoices}
                            </select>
                            <br/>

                            <label className="modal_input_label">Note :</label>
                            <input name='note' className="note" placeholder="Not specified" onChange={this.handleChange.bind(this)}
                                type="text"
                                value={this.state.note}
                            />
                            <br/>
                            <button className="modalbtn" onClick={this.handleSubmit.bind(this)}>Done</button>
                            {/* <label className="input_label">Tag:</label>
                            <TagPanel tags={this.state.newTags} addCallback={this.handleNewTab}/> */}
                        </div>
                    </form>
                    </div>
                </div>
        
            )
        }
        return
}

    export default Modal;

