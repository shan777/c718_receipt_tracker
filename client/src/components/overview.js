import React, {Component} from 'react';
import Header from './header';
import './overview.css';
import Accordion from './accordion_container';
import AccordionItem from './accordion_item';
import Footer from './footer';
import RenderTag from './receipt_tags/render_tag';
import Modal from './modal';
import DeleteModal from './delete_modal';
import axios from 'axios';
import FormatDate from './format_date-M-D-Y';
import './/receipt_tags/render_tag.css';

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
            deleteOpen: false
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
            isOpen: false,
            deleteOpen: false
        });
        const axiosResponse = await axios.post('/api/getUserReceipts');
        
        this.setState({
            data: axiosResponse,
        });
    } 

    deleteOpen(receiptId){
        this.setState({
            deleteOpen: true,
            receiptId: receiptId
        })
    }

  

    async componentDidMount(){
        const axiosResponse = await axios.post('/api/getUserReceipts');
        const tagResoponse = await axios.post('/api/manageTags/getUserTags')
        console.log('tags:', tagResoponse);
        this.setState({
            data: axiosResponse,
            tags: tagResoponse
        });
        console.log('this.state/tags', this.state.tags)
    }

    makeRow(){
        const currentUsersReceipts = [...this.state.data.data.receipts];
        const row = currentUsersReceipts.map((item, index) => (
        <Accordion key={index}>
            <div className="row">
                <div className="store_name">{item.storeName}</div>
                <br/>
        <div className="date_of_purchase">{<FormatDate date={item.purchaseDate}/>}</div>
                <div className="amount_of_purchase">${(item.total/100).toFixed(2)}</div>
                    <AccordionItem className="panel">
                       <div className="panel_size">
                            <div className="catagory">Merchant name:</div>
                            <div className="data">{item.storeName}</div>
                        </div>
                        <div className="panel_size">
                            <div className="catagory">Date of Purchase:</div>
                            <div className="data">{<FormatDate date={item.purchaseDate}/>}</div>
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
                        <div className="render_panel">Tags:
                            <div className="tag">{this.state.tags.data.tags[index] ? ' '+ this.state.tags.data.tags[index].tagName : 'No Tags' }</div>
                        </div>
                        {/* <RenderTag tags={item.tags} /> */}
                        {/* <button className='editbtn' onClick={()=> this.open(index, item.ID, item.total)}> */}
                        <div className="deletebtn">
                            <i onClick={() => this.deleteOpen(item.ID)}  className="material-icons">delete</i>
                        </div>
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
        console.log('deleteopen', this.state.deleteOpen);
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
                        <p className="number_of_receipts"><b>{currentUsersReceipts.length}</b> Receipts 
                        - <b>Total:</b> ${addTotal()}</p>
                    </div>
                </div>
                <Footer userID={this.state.currentDisplayedUserID}/>
                {(this.state.isOpen) ?
                <Modal row={this.state.activeButton} total={this.state.total} receiptId={this.state.receiptId} data={this.state.data} close={this.close}/>
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
