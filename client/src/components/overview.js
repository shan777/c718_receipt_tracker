import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import users from '../dummy_data/dummyList.js';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import response from '../dummy_data/dummyList.js';
import EditRow from './editRow';
class Overveiw extends Component{
    constructor(props){
        super(props);
    }
    editRow (index){
        const eachUser = [...response];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        const storeName = receiptUser[index].storeName;
        console.log(storeName);
        let changeStoreName = prompt("Enter Store Name")
        if(changeStoreName !== currentName){
            currentName.text(changeStoreName);
        }
     }
    makeRow(){
        const eachUser = [...response];
        const mapOfUsers = eachUser.map(item => item.receipts);
        const receiptUser = mapOfUsers[2];
        const row = receiptUser.map((item, index) => (
        <Accordion>
            <div className="row" attr={index}>
                <h3 className="store_name">{item.storeName}</h3>
                <br/>
                <h4 className="date_of_purchase">{item.purchaseDate}</h4>
                <h3 className="amount_of_purchase">${item.total}</h3>
                <button onClick={() => this.editRow(index)} className="edit">Edit</button>
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
            return totalAmount;
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