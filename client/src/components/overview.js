import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import response from '../dummy_data/dummyList.js';
import {Link} from 'react-router-dom';
import TagPanel from './receipt_tags/tag_panel';

class Overveiw extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: response,
            currentDisplayedUserID: props.match.params.userID !==undefined ? props.match.params.userID : 2
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
        const receiptUser = mapOfUsers[this.state.currentDisplayedUserID];
        const row = receiptUser.map((item, index) => (
        <Accordion key={index}>
            <div className="row">
                <div className="store_name">{item.storeName}</div>
                <br/>
                <div className="date_of_purchase">{item.purchaseDate}</div>
                <div className="amount_of_purchase">${item.total/100}</div>
                <Link className="edit" to='/add_new'><button className='editbtn'>Edit</button></Link>
                
                    <AccordionItem className="panel">
                       <div className="panel_size">
                            <div className="catagory">Merchant name:</div>
                            <div className="data">{item.storeName}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Date of Purchase:</div>
                            <div className="data">{item.purchaseDate}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Total Amount:</div>
                            <div className="data">{item.total}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Catagory:</div>
                            <div className="data">{item.catagory}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Note:</div>
                            <div className="data">{item.comment}</div>
                        </div>
                        <TagPanel tags={item.tags} />
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
                <Footer userID={this.state.currentDisplayedUserID}/>
            </div>

        )
    }
}


export default Overveiw;