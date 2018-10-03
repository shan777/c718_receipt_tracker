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
                            <input onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                type="datetime-local"
                                value={dateOfPurchase}
                            />
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default AddNew;