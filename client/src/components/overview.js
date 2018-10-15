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
            total: null,
            date: null
        };
        this.close = this.close.bind(this);
    }
    open = (index, receiptId, total) => this.setState({
        isOpen: true, 
        activeButton: index, 
        receiptId: receiptId, 
        total: total
    });

    async close(){
        this.setState({
            isOpen: false
        });
        const axiosResponse = await axios.post('/api/getUserReceipts');
        
        this.setState({
            data: axiosResponse,
        });
    } 

    formatDate(date){
        let monthArray = [];
        let dayArray = [];
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
            monthArray.push(month);
            monthArray.unshift(0);
            month =  monthArray.join('');
        }
        let day = new Date(date).getDate();
        if(day < 10){
            dayArray.push(day);
            dayArray.unshift(0);
            day = dayArray.join('');
        }
        let formatDate = `${month}-${day}-${year}`
        return formatDate;
    }

    async componentDidMount(){
        const login = await axios.post('/api/login', {userName: 'kylePamintuan', password: 'kyleLfz123'})
        const axiosResponse = await axios.post('/api/getUserReceipts');
        
        this.setState({
            data: axiosResponse,
        });
        console.log('this.state.data inside overview componentDidMount: ', this.state.data);
    }

    makeRow(){
        const currentUsersReceipts = [...this.state.data.data.receipts];
        console.log('currentUsersReceipts:',currentUsersReceipts);
        const row = currentUsersReceipts.map((item, index) => (
        <Accordion key={index}>
            <div className="row">
                <div className="store_name">{item.storeName}</div>
                <br/>
                <div className="date_of_purchase">{`${this.formatDate(item.purchaseDate)}`}</div>
                <div className="amount_of_purchase">${(item.total/100).toFixed(2)}</div>
                    <AccordionItem className="panel">
                       <div className="panel_size">
                            <div className="catagory">Merchant name:</div>
                            <div className="data">{item.storeName}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Date of Purchase:</div>
                            <div className="data">{`${this.formatDate(item.purchaseDate)}`}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Amount:</div>
                            <div className="data">${(item.total/100).toFixed(2)}</div>
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
                        {/* <button className='editbtn' onClick={()=> this.open(index, item.ID, item.total)}> */}
                        <div className='editbtn'>
                            <i className="material-icons" onClick={()=> this.open(index, item.ID, item.total)}>edit</i>
                        </div>
                        
                    </AccordionItem>
            </div>
        </Accordion>
        ));
        return row
    }

    render(){
        const loadingImg = require('../assets/images/loading_squirrel.gif');
        const loadingImgStyle = {
            backgroundColor: 'white',
            padding: '52% 20% 20% 20%',
            backgroundSize: 'contain'
        };

        if(!this.state.data){
            return(
                <img src={loadingImg} style={loadingImgStyle}></img>
            );

        }
        const currentUsersReceipts = [...this.state.data.data.receipts];
        
        console.log('currentUserReceipts: ', currentUsersReceipts);

        const total = currentUsersReceipts.map(item => item.total);
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
                <Modal row={this.state.activeButton} total={this.state.total} receiptId={this.state.receiptId} data={this.state.data} close={this.close}/>
            );
        }
        return (
            <div>
                <Header title="Overview"/>
                <div className='overview_main_container'>
                    {this.makeRow()}
                    <div className="summary">
                        <p className="number_of_receipts"><b>{currentUsersReceipts.length}</b> Receipts 
                        - <b>Total:</b> ${addTotal()}</p>
                    </div>
                </div>
                <Footer userID={this.state.currentDisplayedUserID}/>
            </div>
        );
    }
}

export default Overveiw;
