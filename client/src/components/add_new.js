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
    
    state = {
        merchantName: '',
        // dateOfPurchase: this.calcDate().today,
        totalAmount: '0.00',
        dateOfPurchase: '',
        category: '',
        note: '',
        tag: true,
    }

    //newTag???????????????????????????????????????

    handleSubmit = (event) => {
        console.log('dummy: ',{dummy});
    
        //how do i find the user? 
        //isn't it better 
        event.preventDefault();

        const {merchantName, dateOfPurchase, totalAmount, category, note, tag} = this.state;
        console.log('merchantName: ', merchantName);

        if(tag) {
            console.log('tag:', tag);
        }

        this.props.history.push('/overview');
    }

    addNewTag = (event) => {
        //add new tag to the tag array
        event.preventDefault();
    }

    clearForm() {
        console.log('clear form');
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag} = this.state;
        const categoryArray = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Transportation', 'Lodging', 'Repairs'];
        const categoryChoices = categoryArray.map((option) => 
            <option key={option} value={category}>{option}</option>);

        return (
            <div>
                <Header title="Add New"/>
                <div className="main_container">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <div className="btn_container">
                            <button className="cancel_btn" type="reset" value="X" onSubmit={this.clearForm}>X</button>
                            <button className="done_btn"  type="submit" value="Done">Done</button>
                        </div>    
                        <div className="row content_container">
                                <label className="input_title">Merchant Name</label>
                                <input className="merchName input_field" placeholder="Not specified" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    type="text"
                                    value={merchantName}
                                />
                        </div>

                        <div className="row content_container">
                                <label className="input_title">Date of Purchase</label>
                                <input onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                        </div>

                        <div className="row content_container">
                                <label className="input_title">Total Amount:</label>
                                $ <input className="merchName input_field" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 
                                // e.target.value * 100 --> sending in pennies to server -----> GOTTA DO THIS!!!!!!!!!!
                                    type="number" min="0.00" step="0.01"
                                    value={totalAmount}
                                />
                        </div> 

                        <div className="row content_container">
                                <label className="input_title">Category</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                        </div>

                        <div className="row content_container">
                                <label className="input_title">Note</label>
                                <input className="noteInput input_field" placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                        </div>

                        <div className="row content_container">
                                <label className="input_title">Tag</label>
                                <input className="input_field" name="None" type="checkbox" checked={this.state.tag} onChange={ (e) => this.setState({tag: e.target.value})}
                                    type="text"
                                    value={tag}
                                />
                                {/* <label>New Tag<input name="newTag" type="text" value={newTag} onChange={this.addNewTag}/></label> */}
                        </div>
                        
                    </form>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default AddNew;