import React, {Component} from 'react';
import './overview.css';
import users from '../dummy_data/dummyList.js';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Header from './header';
import Footer from './footer';

class Overveiw extends Component{
    constructor(props){
        super(props);
    }
    makeRow(){
        const eachUser = [...users];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        const row = receiptUser.map(item => (
        <Accordion>
            <div className="row">
                <h3 className="storeName">{item.storeName}</h3>
                <br/>
                <h4 className="dateOfPurchase">{new Date().toLocaleDateString()}</h4>
                <h3 className="amountOfPurchase">${item.total}</h3>
                    <AccordionItem className="panel">
                        <div className="panelSize">
                            <p className="catagory">Merchant name:</p>
                            <h6 className="data">{item.storeName}</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Date of Purchase:</p>
                            <h6 className="data">{new Date().toLocaleDateString()}</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Total Amount:</p>
                            <h6 className="data">{item.total}</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Catagory:</p>
                            <h6 className="data">{item.catagory}</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Note:</p>
                            <h6 className="data">{item.comment}</h6>
                        </div>
                    </AccordionItem>
            </div>
        </Accordion>
        ));
        return row
     }
    render(){
        
        return (
            <div>
                <Header/>
                <div className='container'>
                    {this.makeRow()}
                    <div className="summary">
                        <p className="numberOfReceipts">3 Receipts</p>
                        <p className="totalAmount">Total goes here</p>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}


export default Overveiw;