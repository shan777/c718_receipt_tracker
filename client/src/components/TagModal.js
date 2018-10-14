import React, {Component} from 'react';
import './modal.css';
import TagPanel from './receipt_tags/tag_panel';
import Overview from './overview';
import axios from 'axios';


class TagModal extends Component{

    // componentDidMount(){
    //     console.log('receiptId:',this.props.receiptId);
    //     const currentUser = [...this.props.data.data.receipts];
    //     // const mapOfUsers = eachUser.map(item => item.receipts);
    //     // const receiptUser = mapOfUsers[this.props.currentId];
    //     let currentReceipt = currentUser[this.props.row]

    //     this.setState({
    //         merchantName: currentReceipt.storeName,
    //         totalAmount: currentReceipt.total,
    //         dateOfPurchase: currentReceipt.purchaseDate,
    //         note: currentReceipt.comment,
    //         receiptId: this.props.receiptId,
    //         totalAmount: this.props.total/100,
    //         category: currentReceipt.category

    //     })
    // }
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }
    
    // this.props.close(this.state.StoreName)}
    

    async handleSubmit(event){
        event.preventDefault();
        

        

    }

    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        const resp = await axios.post('/api/manageTags/getUserTags', {
            tags: tags
        });
        console.log('tags: ', tags);
        // const categoryChoices = categoryArray.map((option, index) => 
        // <option key={index} value={option}>{option}</option>);
        const userTags = categoryArray.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
            const currentUser = [...this.props.data];
            // const mapOfUsers = eachUser.map(item => item.receipts);
            // const receiptUser = mapOfUsers[this.props.currentId];
            let currentReceipt = currentUser[this.props.row]
            // console.log(receiptUser[this.props.row]);
            return (
                
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div>Select Tags</div>
                        <form>  
                            <input type="radio"></input>
                                
                                <br/>
                                <button className="basic-modal-close" onClick={this.close}>Close</button>

                                <button className="modalbtn" onClick={this.handleSubmit.bind(this)}>Apply</button>
                                {/* <label className="input_label">Tag:</label>
                                <TagPanel tags={this.state.newTags} addCallback={this.handleNewTab}/> */}
                   
                    </form>
                    </div>
                </div>
        
            )
        }
        return
}

    export default TagModal;

