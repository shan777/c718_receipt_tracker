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
        console.log('receiptId:',this.props.receiptId);
        const currentUser = [...this.props.data.data.receipts];
        // const mapOfUsers = eachUser.map(item => item.receipts);
        // const receiptUser = mapOfUsers[this.props.currentId];
        let currentReceipt = currentUser[this.props.row]

        this.setState({
            merchantName: currentReceipt.storeName,
            totalAmount: currentReceipt.total,
            dateOfPurchase: currentReceipt.purchaseDate,
            note: currentReceipt.comment,
            receiptId: this.props.receiptId,
            totalAmount: this.props.total/100,
            category: currentReceipt.category

        })
    }

    async handleSubmit(event){
        event.preventDefault();
        const {merchantName, dateOfPurchase, totalAmount, category, note, receiptId, tag, errorMessage} = this.state;
        

        const update = await axios.post('/api/updateReceipt', {
            receiptId: receiptId,
            storeName: merchantName,
            purchaseDate: `${this.formatDate(this.state.dateOfPurchase)}`,
            total: parseInt(totalAmount)*100,
            category: category,
            comment: note
        })
        {this.props.close(this.state.StoreName)}
        console.log('update info:', update);

    }

    formatDate(date){
        let monthArray = [];
        let dayArray = [];
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
            monthArray.push(month);
            monthArray.unshift(0);
            month =  monthArray.join('');
        }
        let day = new Date(date).getDate();
        if(day < 10){
            dayArray.push(day);
            dayArray.unshift(0);
            day =  dayArray.join('');
        }
        let formatDate = `${year}-${month}-${day}`
        console.log(formatDate);
        return formatDate;
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        console.log(this.state.category);
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag, errorMessage} = this.state;
        const categoryArray = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Transportation', 'Lodging', 'Repairs'];
        const categoryChoices = categoryArray.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
            const currentUser = [...this.props.data];
            // const mapOfUsers = eachUser.map(item => item.receipts);
            // const receiptUser = mapOfUsers[this.props.currentId];
            let currentReceipt = currentUser[this.props.row]
            // console.log(receiptUser[this.props.row]);
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
                                    value={this.state.dateOfPurchase.slice(0,10)}
                                />
                                  <label className="input_label">Total Amount:</label>
                                $ <input name='totalAmount' className="amount" onChange={this.handleChange.bind(this)} 
        
                                    type="number" min="0.00" step="0.01"
                                    value={this.state.totalAmount}
                                />
                                <br/>
                                 <label className="input_label">Note:</label>
                                <input name='note' className="note" placeholder="Not specified" onChange={this.handleChange.bind(this)}
                                    type="text"
                                    value={this.state.note}
                                />
                                <br/>
                                <label className="input_label">Category:</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                                <br/>
                                <button className="modalbtn" onClick={this.handleSubmit.bind(this)}>Submit</button>
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

