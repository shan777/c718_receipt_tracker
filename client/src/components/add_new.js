import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import './add_new.css';
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

        this.categories = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Entertainment', 'Transportation', 'Lodging', 'Repairs'];

        this.state = {
            merchantName: '',
            // dateOfPurchase: this.calcDate().today,
            totalAmount: '',
            dateOfPurchase: '',
            category: this.categories[0],
            note: '',
            currentDisplayedUserID: this.props.match ? this.props.match.params.userID : 2,
            newTags: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const login = await axios.post('/api/login', {userName: 'estherSuh', password: 'estherLfz123'});

    }
     
    clearStates = () => {
        this.setState({
            merchantName: '',
            totalAmount: '',
            dateOfPurchase: '',
            category: this.categories[0],
            note: ''
        });
    }

    async handleSubmit(event) {
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag} = this.state;

        event.preventDefault();
        
        const resp = await axios.post('/api/addReceipt', {
            storeName: merchantName,
            total: totalAmount * 100,
            purchaseDate: `${this.formatDate(dateOfPurchase)}`,
            category: category,
            comment: note
        });       

        console.log('response: ', resp);
        console.log('date: ', this.state);


        this.clearStates();

        this.props.history.push('/overview');
    }

    formatDate = (date) => {
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
        
        const categoryChoices = this.categories.map((option, index) => 
            <option key={index} value={option}>{option}</option>);

        // const tags =    

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
                            <label className="input_label">Merchant :</label>
                            <input className="merchant" placeholder="Required" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                type="text"
                                value={merchantName}
                                name={merchantName}
                                required
                            />
                        </div>

                        <div className="content_container">
                            <label className="input_label">Date :</label>
                            <input className="date" onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                type="date"
                                value={dateOfPurchase}
                            />
                        </div>

                        <div className="content_container">
                            <label className="input_label">Total :</label>
                            $ <input className="amount" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 

                                type="number" min="0.00" step="0.01"
                                value={totalAmount}
                            />
                        </div> 

                        <div className="content_container">
                            <label className="input_label">Category :</label>
                            <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                {categoryChoices}
                            </select>
                        </div>

                        <div className="content_container">
                            <label className="input_label">Note :</label>
                            <input className="note" placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                type="text"
                                value={note}
                            />
                        </div>

                        <div className="content_container">
                            <label className="input_label tag_input">Tag :</label>
                            <TagPanel tags={this.state.newTags} addCallback={this.handleNewTab}/>
                        </div> 

                        
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default AddNew;