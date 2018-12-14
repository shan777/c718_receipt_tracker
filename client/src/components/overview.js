import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import Modal from './modal';
import DeleteModal from './delete_modal';
import axios from 'axios';
import FormatDate from './format_date-M-D-Y';

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
            date: null, 
            tags: null,
            deleteOpen: false,
            modalTags: null
        };
        this.close = this.close.bind(this);
    }
    open = (index, receiptId, total, tags) => this.setState({
        isOpen: true, 
        activeButton: index, 
        receiptId: receiptId, 
        total: total,
        modalTags: tags
    });

    async close(){
        this.setState({
            isOpen: false,
            deleteOpen: false
        });
        const axiosResponse = await axios.post('/api/manageReceipts/getUserReceipts');
        
        this.setState({
            data: axiosResponse,
        });
    } 

    deleteOpen = (receiptId) => this.setState({
            deleteOpen: true,
            receiptId: receiptId
        })

    async componentDidMount(){
        const axiosResponse = await axios.post('/api/manageReceipts/getUserReceipts');
        const tagResoponse = await axios.post('/api/manageTags/getUserTags')
        this.setState({
            data: axiosResponse,
            tags: tagResoponse
        });
    }

    makeRow(){
        const currentUsersReceipts = [...this.state.data.data.receipts];
        const row = currentUsersReceipts.map((item, index) => (
        <Accordion key={index}>
            <div className="row">
                {(item.storeName).includes('&') && (item.storeName).includes(';') ?
                <div className="store_name" dangerouslySetInnerHTML={{__html: `${item.storeName}`}}/>
                 : <div className="store_name">{item.storeName}</div>
                }
                
                <br/>
                <div className="date_of_purchase">{<FormatDate date={item.purchaseDate}/>}</div>
                <div className="amount_of_purchase">${(item.total/100).toFixed(2)}</div>
                    <AccordionItem receiptId={item.ID} index={index} total={item.total} className="panel" open={this.open} deleteOpen={this.deleteOpen}>
                       <div className="panel_size">
                        <div className="category">Merchant :</div>
                        <div className="data" dangerouslySetInnerHTML={{__html: `${item.storeName}`}}/>
                        </div>
                        <div className="panel_size">
                            <div className="category">Date :</div>
                            <div className="data">{<FormatDate date={item.purchaseDate}/>}</div>
                        </div>
                        <div className="panel_size">
                            <div className="category">Amount :</div>
                            <div className="data">${(item.total/100).toFixed(2)}</div>
                        </div>
                        <div className="panel_size">
                            <div className="category">Category :</div>
                            <div className="data">{item.category}</div>
                        </div>
                        <div className="panel_size">
                            <div className="category">Note :</div>
                            {(item.comment) ?
                            <div className="data">{item.comment}</div>
                            : <div className="data noNote"> — </div>
                            }
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
        const total = currentUsersReceipts.map(item => item.total);
        const addTotal = () =>{
            let totalAmount = 0;
            for(let i = 0; i< total.length; i++){
                totalAmount+= total[i];
            }
            totalAmount = (totalAmount.toFixed(2)/100);
            return totalAmount.toLocaleString();
        }

        return (
            <div>
                <Header push={this.props.history.push} title="OVERVIEW"/>
                <div className="overview_main_container">
                    {this.makeRow()}
                    {currentUsersReceipts.length === 0 ? 
                        <div className="no_receipts">Start by adding some receipts. You can do this by navigating to Add New in the menu.</div>
                    : null
                    }
                    <div className="summary">
                    {(currentUsersReceipts.length <= 1) ?
                        <p className="number_of_receipts"><b>{currentUsersReceipts.length}</b> Receipt &nbsp;&nbsp;&nbsp; <b>Total:</b> ${addTotal()}</p>
                        : <p className="number_of_receipts"><b>{currentUsersReceipts.length}</b> Receipts &nbsp;&nbsp;&nbsp; <b>Total:</b> ${addTotal()}</p>
                        
                    }    
                    </div>
                </div>
                <Footer userID={this.state.currentDisplayedUserID}/>
                {(this.state.isOpen) ?
                <Modal row={this.state.activeButton} total={this.state.total} receiptId={this.state.receiptId} modalTags={this.state.modalTags} data={this.state.data} close={this.close}/>
                 : null 
                }
                {(this.state.deleteOpen) ?
                <DeleteModal receiptId={this.state.receiptId} close={this.close}/>
                : null
                }
            </div>
        );
    }
}
export default Overveiw;
