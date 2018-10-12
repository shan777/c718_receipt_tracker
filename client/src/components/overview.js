import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import RenderTag from './receipt_tags/render_tag';
import Modal from './modal';
import axios from 'axios';

class Overveiw extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: null,
            currentDisplayedUserID: props.match.params.userID !==undefined ? props.match.params.userID : 3,
            isOpen: false,
            activeButton: null,
            receiptId: null,
            userId: null,
            receiptId: null, 
            total: null
        };
    }
    open = (index, receiptId, total) => this.setState({isOpen: true, activeButton: index, receiptId: receiptId, total: total});

    close = () => this.setState({isOpen: false});

    async componentDidMount(){
        // var urlParams = new URLSearchParams(window.location.search);
        // var values = urlParams.values();
        // const login = await axios.post('/api/login', {userName: 'estherSuh', password: 'estherLfz123'})
        // const checkLogin = await axios.post('/api/checkLoginStatus', {userId: values} )
        // console.log(checkLogin);
        // this.setState({
        //     userId: login.data.userId
        // });
        const axiosResponse = await axios.post('/api/getUserReceipts');
        
        this.setState({
            data: axiosResponse,
        });
        console.log(this.state.data);
    }

    makeRow(){
        const currentUser = [...this.state.data.data.receipts];
        console.log(currentUser);
        const row = currentUser.map((item, index) => (
            console.log(item.ID),
        <Accordion key={index}>
            <div className="row">
                <div className="store_name">{item.storeName}</div>
                <br/>
                <div className="date_of_purchase">{item.purchaseDate.slice(0,10)}</div>
                <div className="amount_of_purchase">${(item.total/100).toFixed(2)}</div>
                <button className='editbtn' onClick={()=> this.open(index, item.ID, item.total)}>
                <i className="material-icons">edit</i></button>
                    <AccordionItem className="panel">
                       <div className="panel_size">
                            <div className="catagory">Merchant name:</div>
                            <div className="data">{item.storeName}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Date of Purchase:</div>
                            <div className="data">{item.purchaseDate.slice(0,10)}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Total Amount:</div>
                            <div className="data">{item.total/100}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Catagory:</div>
                            <div className="data">{item.category}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Note:</div>
                            <div className="data">{item.comment}</div>
                        </div>
                        {/* <RenderTag tags={item.tags} /> */}
                    </AccordionItem>
            </div>
        </Accordion>
        ));
        return row
        }
    render(){
        if(!this.state.data){
            return(
                <h1>loading...</h1>
            )
        }
        const currentUser = [...this.state.data.data.receipts];
        const total = currentUser.map(item => item.total);
        const addTotal = () =>{
            let totalAmount = null;
            for(let i = 0; i< total.length; i++){
                totalAmount+= total[i];
            }
            return totalAmount/100;
        }
        if(this.state.isOpen){
            let id = 2;
            return (
                <Modal row={this.state.activeButton} total={this.state.total} receiptId={this.state.receiptId} data={this.state.data} currentId={id} close={this.close}/>
            )
        }
        return (
            <div>
                <Header title="Overview"/>
                <div className='overview_main_container'>
                    {this.makeRow()}
                    <div className="summary">
                        <p className="number_of_receipts"><b>{currentUser.length}</b> Receipts
                         -- <b>Total:</b> ${addTotal()}</p>
                    </div>
                </div>
                <Footer userID={this.state.currentDisplayedUserID}/>
            </div>

        )
    }
}

export default Overveiw;