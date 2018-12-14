import React, {Component} from 'react';
import './modal.css';
import AddTagModal from './add_tag_modal';
import SelectTags from './select_tag_modal';
import axios from 'axios';
import DeleteTag from './deleteTagModal';
import { runInThisContext } from 'vm';


class Modal extends Component{
    state = {
        merchantName: '',
        totalAmount: '',
        dateOfPurchase: '',
        category: '',
        note: '',
        newTags:[],
        receiptId: null,
        modalTags: null, 
        currentTags: this.props.modalTags,
        show: false,
        tagId: null,
        deleteTagShow: false
    };

    componentDidMount(){
        const currentUser = [...this.props.data.data.receipts];
        let currentReceipt = currentUser[this.props.row]
        this.setState({
            merchantName: currentReceipt.storeName,
            totalAmount: currentReceipt.total,
            dateOfPurchase: `${this.formatDate(currentReceipt.purchaseDate)}`,
            note: currentReceipt.comment,
            receiptId: this.props.receiptId,
            totalAmount: this.props.total/100,
            category: currentReceipt.category,
            currentTags: this.props.modalTags,
            tagModalOpen: false
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        let {merchantName, dateOfPurchase, totalAmount, category, note, receiptId, tag, errorMessage, currentTags} = this.state;
        let tagArray = [];
        for(let i = 0; i  < currentTags.length; i++ ){
            tagArray.push({
                tagId: currentTags[i].tagId,
                tagName: currentTags[i].tagName
            })
        }
        const updateTags = await axios.post('/api/manageTags/updateReceiptTags', {receiptId: receiptId, tags: tagArray})
        const update = await axios.post('/api/manageReceipts/updateReceipt', {
            receiptId: receiptId,
            storeName: merchantName,
            purchaseDate: `${this.formatDate(dateOfPurchase)}`,
            total: `${this.fixRoundingError(totalAmount * 100)}`,
            category: category,
            comment: note
        });
        {this.props.close(this.state.StoreName)}
    }

    openDeleteTag(receiptId, tagId){
        this.setState({
            tagId: tagId,
            deleteTagShow: true
        })
    }

    closeDeleteTag = (currenttag) => {
        this.setState({
            deleteTagShow: false,
            currentTags: currenttag
        })
    }

    cancelDeletetag = () => {
        this.setState({
            deleteTagShow: false
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    fixRoundingError(totalAmount){
        let correctTotal = Math.round(totalAmount * 1000000000) / 1000000000;
         return correctTotal;
     }

    formatDate(date){
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
           month = "0" + month;
        }
        let day = new Date(date).getUTCDate();
        if(day < 10){
          day = "0" + day;
        }
        let formatDate = `${year}-${month}-${day}`;
        return formatDate;
    }

    renderTags(){
        let data = this.state.currentTags
        if(data.length === 0){
            return <div className='noTags'> — </div>
        };
        const renderTags = data.map((item, index) => (
            <div id="customTag" className="tag_position" key={index}>
                <i onClick={() => this.openDeleteTag(this.state.receiptId, data[index].tagId)} className="material-icons deleteTag">clear</i>
                <button className="custom_tag" type="button" key={index}># {data[index].tagName}</button>
           </div>
        ))
        return renderTags;
    }

    addNewDirectly = (tagName, tagId) => {
        const newTag = {
            tagName: tagName
        }
        this.setState({
            currentTags: [...this.state.currentTags, {tagId: tagId, tagName: tagName}]
        });
    }

    tagModalOpen(event){
        event.preventDefault();
        this.setState({
            tagModalOpen: true
        })
    }

    hideAddTagModal = () => {
        this.setState({
            tagModalOpen: false
        });
    }

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    showModal = () => {
        this.setState({
            show: true
        });
    }

    selectTags = (tags) => {
        this.setState({
            currentTags: tags
        });
    }

    render(){
        const {merchantName, dateOfPurchase, totalAmount, category, note, tag, errorMessage, currentTags} = this.state;
        const categories = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Entertainment', 'Transportation', 'Lodging', 'Repairs', 'Other'];
        const categoryChoices = categories.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
            const currentUser = [...this.props.data];
            let currentReceipt = currentUser[this.props.row]
            return (
                <div className="basic_modal" onClick={this.close}>
                    <div className="basic_modal_content onClick={e => e.stopPropagation()}">
                        <form>  
                        <div className="modal_container">
                            <label className="modal_input_label">Merchant :</label>
                            <input name='merchantName' className="merchant1" onChange={this.handleChange.bind(this)}
                                type="text"
                                value = {this.state.merchantName}
                            />

                            <label className="modal_input_label">Date :</label>
                            <input name='dateOfPurchase' className="date1" onChange={this.handleChange.bind(this)}
                                type="date"
                                value={this.state.dateOfPurchase.slice(0,10)}
                            />

                            <label className="modal_input_label">Amount :</label>
                            $ <input name='totalAmount' className="amount1" onChange={this.handleChange.bind(this)}
                                type="number" min="0.00" step="0.01"
                                value={this.state.totalAmount}
                            />

                            <br/>
                            
                            <label className="modal_input_label">Category :</label>
                            <select name="category"  className="select1" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                {categoryChoices}
                            </select>
                            <br/>

                            <label className="modal_input_label">Note :</label>
                            <input name='note' className="note1" placeholder="Not specified" onChange={this.handleChange.bind(this)}
                                type="text"
                                value={this.state.note}
                            />
                            <br/><br/>
                            <label className="modal_input_label">Tags :</label>
                            <i className="material-icons drop_down_arrow_icon" type="button" tags={this.state.tags} onClick={this.showModal.bind(this)}>arrow_drop_down_circle</i>
                                {/* </button> */}
                            <i className="material-icons add_tag_icon" type="button" tags={this.state.tags} onClick={this.tagModalOpen.bind(this)}>add_box</i>
                            <br/>
                            {this.renderTags()}
                            
                            <br/>
                            <button className="modalbtn cancel" onClick={this.props.close}>Cancel</button>
                            <button className="modalbtn update-color" onClick={this.handleSubmit.bind(this)}>Update</button>
                        </div>
                    </form>
                    </div>
                    {
                    (this.state.show) ?
                    <SelectTags selectTags={this.selectTags} show={this.state.show} handleClose={this.hideModal} currentTagsforUpdate={this.state.currentTags} tags={this.state.tags}>
                    </SelectTags>    
                    : (null)
                    }
                    {(this.state.tagModalOpen) ?
                    <AddTagModal selectTags={this.selectTags} show={this.state.tagModalOpen} handleClose={this.hideAddTagModal} tags={this.props.modalTags} addNewDirectly={this.addNewDirectly}/>
                    : null
                    }
                    {
                    (this.state.deleteTagShow) ?
                    <DeleteTag tagId={this.state.tagId} receiptId={this.state.receiptId} cancel={this.cancelDeletetag} close={this.closeDeleteTag}>
                    </DeleteTag>    
                    : (null)
                    }
                </div>
        
            )
        }
        return
}

export default Modal;

