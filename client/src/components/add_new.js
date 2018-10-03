import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import '../assets/css/add_new.css';
import camera from '../assets/images/camera.png';

class AddNew extends Component {    
    state = {
        merchantName: '',
        dateOfPurchase: new Date().toDateString(),
        totalAmount: '0.00',
        category: '',
        note: '',
        receiptImageSrc: ''
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, receiptImageSrc} = this.state;
        return (
            <div>
                <Header/>
                <div className="main_container">
                    <form>
                        <button className="cancelBtn" type="reset" value="X">X</button>
                        <button className="doneBtn"  type="submit" value="Done" onSubmit={this.handleAddItem}>Done</button>
                        
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
                                <input onChange={ (e) => this.setState({dateOfPurchase: new Date().toLocaleDateString()})}
                                    type="text"
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
                                <input className="merchName input_field" placeholder="Not specified" onChange={ (e) => this.setState({category: e.target.value})}
                                    type="text"
                                    value={category}
                                />
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
                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Receipt Image:</label>
                                <input className="receiptImgInput input_field" placeholder="Upload" onChange={ (e) => this.setState({receiptImageSrc: e.target.value})}
                                    type="text"
                                    value={receiptImageSrc}
                                />
                                <img className="cameraImg" src={camera}/>
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