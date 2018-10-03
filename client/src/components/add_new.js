import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import axios from 'axios';

class AddNew extends Component {
    state = {
        merchantName: '',
        dateOfPurchase: new Date().toDateString(),
        totalAmount: 0.00,
        category: '',
        note: '',
        receiptImageSrc: ''
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, receiptImageSrc} = this.state;
        return (
            <div>
                <form onSubmit={this.handleAddItem}>
                <button type="reset" value="X">X</button>
                <button type="submit" value="Done">Done</button>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Merchant Name:</label>
                            <input onChange={ (e) => this.setState({merchantName: e.target.value})}
                                type="text"
                                value={merchantName}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Date of Purchase:</label>
                            {/* <input onChange={ (e) => this.setState({dateOfPurchase: e.target.value})} */}
                            <input onChange={ (e) => this.setState({dateOfPurchase: new Date().toLocaleDateString()})}
                                type="text"
                                value={dateOfPurchase}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Total Amount:</label>
                            <input onChange={ (e) => this.setState({totalAmount: e.target.value})}
                                type="number"
                                value={totalAmount}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Category:</label>
                            <input onChange={ (e) => this.setState({category: e.target.value})}
                                type="text"
                                value={category}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Note:</label>
                            <input onChange={ (e) => this.setState({note: e.target.value})}
                                type="text"
                                value={note}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Receipt Image:</label>
                            <input onChange={ (e) => this.setState({receiptImageSrc: e.target.value})}
                                type="text"
                                value={receiptImageSrc}
                            />
                        </div>
                    </div>



                </form>
            </div>

        );
    }
}

export default AddNew;