import React, {Component} from 'react';
import './overview.css';
import AddNew from './add_new';
import { Link, Route } from 'react-router-dom';
import Splash from './splashPage';

class Overveiw extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let accordion = document.getElementsByClassName('panel');
        let accordionParent = document.getElementsByClassName('row')

        for(let i = 0; i< accordionParent.length; i++){
            accordionParent[i].addEventListener('click', function(){
                console.log(this);
                // let panel = this.nextElementSibling;
                if(accordion[i].style.display === 'block'){
                    accordion[i].style.display = 'none';
                }else{
                    accordion[i].style.display = 'block';
                }
            })
        }
    }
    render(){
        return (
            <div className='container'>
                <div className="row">
                    <h3 className='storeName'>target</h3>
                    <br/>
                    <h4 className="dateOfPurchase">Friday, 28 Sep 2018</h4>
                    <h3 className="amountOfPurchase">$16.99</h3>
                    <div className="panel">
                        <div className="panelSize">
                            <p className="catagory">Merchant Name:</p>
                            <h6 className="data">target</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Date of Purchase:</p>
                            <h6 className="data">28 September 2018</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Total Amount:</p>
                            <h6 className="data">$16.99</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Catagory:</p>
                            <h6 className="data">Grocery</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Note:</p>
                            <h6 className="data">For Next week</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Reciept Image:</p>
                            <h6 className="data">Picture</h6>
                        </div>
                        <div className="summary">
                            <p className="numberOfReceipts">3 Receipts</p>
                            <p className="totalAmount">Total goes here</p>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <h3 className='storeName'>target</h3>
                    <br/>
                    <h4 className="dateOfPurchase">Friday, 28 Sep 2018</h4>
                    <h3 className="amountOfPurchase">$16.99</h3>
                    <div className="panel">
                        <div className="panelSize">
                            <p className="catagory">Merchant Name:</p>
                            <h6 className="data">target</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Date of Purchase:</p>
                            <h6 className="data">28 September 2018</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Total Amount:</p>
                            <h6 className="data">$16.99</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Catagory:</p>
                            <h6 className="data">Grocery</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Note:</p>
                            <h6 className="data">For Next week</h6>
                        </div>
                        <div className="panelSize">
                            <p className="catagory">Reciept Image:</p>
                            <h6 className="data">Picture</h6>
                        </div>
                        <div className="summary">
                            <p className="numberOfReceipts">3 Receipts</p>
                            <p className="totalAmount">Total goes here</p>
                        </div>

                    </div>
                </div>
           
            </div>

        )
    }
}


export default Overveiw;