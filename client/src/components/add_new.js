import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import './add_new.css';
import dummy from '../dummy_data/dummyList';



class AddNew extends Component {    
//     calcDate() {
//         var curr = new Date();
//         curr.setDate(curr.getDate());
//         var today = curr.toISOString().substr(0,10);
//         return {today};
// {/* <input id="dateRequired" type="date" name="dateRequired" defaultValue={date} />  */}
//     }
    constructor(props) { 
        super(props);

        this.state = {
            merchantName: '',
            // dateOfPurchase: this.calcDate().today,
            totalAmount: '',
            dateOfPurchase: '',
            category: '',
            note: '',
            errorMessage: {
                forTotalAmount: "'Total Amount' must be a number.",
                forMerchantName: "'Merchant Name' must be entered."
            }
            //tag: 'None', //will be an array later
        }
    }

    handleSubmit = (event) => {
        console.log('dummy: ',{dummy});
    
        //how do i find the user? 
        
        event.preventDefault();

        const {merchantName, dateOfPurchase, totalAmount, category, note, tag, errorMessage} = this.state;
        console.log('totalAmount: ', totalAmount);
        


        //this.props.history.push('/overview');
    }

    // addNewTag = (event) => {
    //     //add new tag to the tag array
    //     event.preventDefault();
    // }

    handleCancel = () => {
        this.props.history.push('/overview');
    }

    
    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag} = this.state;
        const categoryArray = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Transportation', 'Lodging', 'Repairs'];
        const categoryChoices = categoryArray.map((option, index) => 
            <option key={index} value={option}>{option}</option>);

        return (
            <div>
                <Header title="Add New"/>
                <div className="main_container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="btn_container">
                            <button className="cancel_btn" type="reset" value="Cancel" onClick={this.handleCancel}>Cancel</button>
                            <button className="done_btn"  type="submit" value="Done">Done</button>
                        </div>    
                        <div className="content_container">
                                <label className="input_label">Merchant:</label>
                                <input className="merchant" placeholder="Required" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    type="text"
                                    value={merchantName}
                                    name={merchantName}
                                    required
                                />
                        </div>

                        <div className="content_container">
                                <label className="input_label">Date:</label>
                                <input className="date" onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                        </div>

                        <div className="content_container">
                                <label className="input_label">Total Amount:</label>
                                $ <input className="amount" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 

                                    type="number" min="0.00" step="0.01"
                                    value={totalAmount}
                                />
                        </div> 

                        <div className="content_container">
                                <label className="input_label">Category:</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                        </div>

                        <div className="content_container">
                                <label className="input_label">Note:</label>
                                <input className="note" placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                        </div>

                        <div className="row content_container">
                                <label className="input_label">Tag:</label>
                               
                        </div> 
                        
                    </form>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default AddNew;