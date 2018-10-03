import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Overview from './overview';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import '../assets/css/add_new.css';
import cameraImage from '../assets/images/camera.png';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

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
                <Header/>
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
                        <div className="row content_container">
                            <div className="col s8 offset-s2">
                                <label className="input_title">Receipt Image:</label>
                                <Camera onTakePhoto={(dataUri) => {this.onTakePhoto(dataUri);}}/>
                                <input className="receipt_img_input input_field" placeholder="Upload" onChange={ (e) => this.setState({receiptImageSrc: e.target.value})}
                                    type="text"
                                    value={receiptImageSrc}
                                />
                                <img className="camera_img" src={cameraImage}/>
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