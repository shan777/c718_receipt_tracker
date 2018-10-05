import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import './add_new.css';
import Dummy from '../dummy_data/dummyList';



class AddNew extends Component {    
    calcDate() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var today = curr.toISOString().substr(0,10);
        return {today};
{/* <input id="dateRequired" type="date" name="dateRequired" defaultValue={date} />  */}
    }
    
    state = {
        merchantName: '',
        dateOfPurchase: this.calcDate().today,
        totalAmount: '0.00',
        category: '',
        note: '',
        receiptImageSrc: ''
    }

    onTakePhoto(dataUri) {
        console.log('takePhoto');
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, receiptImageSrc} = this.state;

        return (
            <div>
                <Header title="Add New"/>
                <div className="main_container">
                    <form action="#">
                        <div className="btn_container">
                            <button className="cancel_btn" type="reset" value="X">X</button>
                            <button className="done_btn"  type="submit" value="Done" onSubmit={this.handleAddItem}>Done</button>
                        </div>    
                        <div className="row content_container">
                            <div>
                                <label className="input_title">Merchant Name:</label>
                                <input className="merchName input_field" placeholder="Not specified" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    type="text"
                                    value={merchantName}
                                />
                            </div>
                        </div>

                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Date of Purchase:</label>
                                {/* <input onChange={ (e) => this.setState({dateOfPurchase: e.target.value})} */}
                                <input onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                            </div>
                        </div>

                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Total Amount:</label>
                                $ <input className="merchName input_field" onChange={ (e) => this.setState({totalAmount: e.target.value})}
                                    type="text"
                                    value={totalAmount}
                                />
                            </div>
                        </div>
                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Category:</label>
                                <select name="category">
                                    <option value={category}>Dining</option>
                                    <option value={category}>Groceries</option>
                                    <option value={category}>Beauty</option>
                                    <option value={category}>Health</option>
                                </select>
                                {/* <input className="merchName input_field" placeholder="Not specified" onChange={ (e) => this.setState({category: e.target.value})}
                                    type="text"
                                    value={category}
                                /> */}
                            </div>
                        </div>
                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Note:</label>
                                <input className="noteInput input_field" placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                            </div>
                        </div>
                        
                    </form>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default AddNew;