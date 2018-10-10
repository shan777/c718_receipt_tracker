import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import './add_new.css';
import dummy from '../dummy_data/dummyList';
import TagPanel from './receipt_tags/tag_panel';



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
            totalAmount: '0',
            dateOfPurchase: '',
            category: '',
            note: '',
            errorMessage: {
                forTotalAmount: "'Total Amount' must be a number.",
                forMerchantName: "'Merchant Name' must be entered."
            },
            currentDisplayedUserID: this.props.match ? this.props.match.params.userID : 2,
            //tag: 'None', //will be an array later
            newTags: []
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
    
    handleNewTab = (newTagText) => {
        console.log('new tab adding', newTagText);
        //do axios call to set new tag to user, then get data from user
        this.setState({
            newTags: [...this.state.newTags, newTagText]
        })
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
                                <label className="input_title">Merchant Name</label>
                                <input placeholder="Not specified" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    type="text"
                                    value={merchantName}
                                    name={merchantName}
                                    required
                                />
                        </div>

                        <div className="content_container">
                                <label className="input_title">Date of Purchase</label>
                                <input className="date" onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                        </div>

                        <div className="content_container">
                                <label className="input_title">Total Amount:</label>
                                $ <input className="amount" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 
                                    type="number" min="0.00" step="0.01"
                                    value={totalAmount}
                                />
                        </div> 

                        <div className="content_container">
                                <label className="input_title">Category</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                        </div>

                        <div className="content_container">
                                <label className="input_title">Note</label>
                                <input placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                        </div>
                        <TagPanel tags={this.state.newTags} addCallback={this.handleNewTab}/>
                        {/* <div className="row content_container">
                                <label className="input_title">Tag</label>
                                <input className="input_field" name="tag"  onChange={ (e) => this.setState({tag: e.target.value})}
                                    type="radio"
                                    value={tag}
                                />
                                
                                <input name="tag" type="radio" value="paris"/>
                        </div>  */}
                        
                    </form>
                </div>
                <Footer userID={this.state.currentDisplayedUserID}/>
            </div>

        );
    }
}

export default AddNew;