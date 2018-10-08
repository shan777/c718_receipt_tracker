import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import response from '../dummy_data/dummyList.js';
import {Link} from 'react-router-dom';

class Overveiw extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: response,
        };
    }
    editRow (index){
        const eachUser = [...this.state.data];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        let currentName = receiptUser[index].storeName;
        let changeStoreName = prompt("Enter Store Name")

     }
    makeRow(){
        const eachUser = [...this.state.data];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        const row = receiptUser.map((item, index) => (
        <Accordion>
            <div className="row" attr={index}>
                <h3 className="store_name" attr={index}>{item.storeName}</h3>
                <br/>
                <h4 className="date_of_purchase" attr={index}>{item.purchaseDate}</h4>
                <h3 className="amount_of_purchase" attr={index}>${item.total/100}</h3>
                <Link to='/add_new'><button className="edit">Edit</button></Link>
                
                    <AccordionItem className="panel">
                       <div className="panel_size">
                            <p className="catagory">Merchant name:</p>
                            <h6 className="data">{item.storeName}</h6>
                        </div>
                        <div className="panel_size">
                            <p className="catagory">Date of Purchase:</p>
                            <h6 className="data">{item.purchaseDate}</h6>
                        </div>
                        <div className="panel_size">
                            <p className="catagory">Total Amount:</p>
                            <h6 className="data">{item.total}</h6>
                        </div>
                        <div className="panel_size">
                            <p className="catagory">Catagory:</p>
                            <h6 className="data">{item.catagory}</h6>
                        </div>
                        <div className="panel_size">
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
        const eachUser = [...response];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        const total = receiptUser.map(item => item.total);
        const addTotal = () =>{
            let totalAmount = null;
            for(let i = 0; i< total.length; i++){
                totalAmount+= total[i];
            }
            return totalAmount/100;
        }
        return (
            <div>
                <Header title="Overview"/>
                <div className='overview_main_container'>
                    {this.makeRow()}
                    <div className="summary">
                        <p className="number_of_receipts">{receiptUser.length} Receipts</p>
                        <p className="total_amount">Your total is ${addTotal()}</p>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}


export default Overveiw;