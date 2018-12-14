import React, { Component } from 'react';
import './add_new.css';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import SelectTagModal from './select_tag_modal';
import AddTagModal from './add_tag_modal';

class AddNewTag extends Component {    
    constructor(props) { 
        super(props);

        this.categories = ['Dining', 'Groceries', 'Shopping', 'Beauty', 'Health', 'Entertainment', 'Transportation', 'Lodging', 'Repairs', 'Other'];

        this.state = {
            merchantName: '',
            dateOfPurchase: `${this.formatDate()}`,
            totalAmount: '',
            category: this.categories[0],
            note: '',
            currentDisplayedUserID: this.props.match ? this.props.match.params.userID : 2,
            newTagName: '',
            show: false,
            addTagModalShow: false,
            deletedTag: false,
            currentTags: [],
        }
    }

    addNewDirectly = (tagName, tagId) => {
        const newTag = {
            tagName: tagName
        }
        this.setState({
            currentTags: [...this.state.currentTags, {tagId: tagId, tagName: tagName}]
        });
    }
    
    selectTags = (tags) => {
        this.setState({
            currentTags: tags
        });
    }

    clearStates = () => {
        this.setState({
            merchantName: '',
            totalAmount: '',
            dateOfPurchase: '',
            category: this.categories[0],
            note: '',
            newTagName: ''
        });
    }

    fixRoundingError(totalAmount){
        let correctTotal = Math.round(totalAmount * 1000000000) / 1000000000;
        return correctTotal;
    }

    handleSubmit = async (event) => {
        const {merchantName, dateOfPurchase, totalAmount, category, note, currentTags} = this.state;

        event.preventDefault();
       
        const resp = await axios.post('/api/manageReceipts/addReceipt', {
            storeName: merchantName,
            total: `${this.fixRoundingError(totalAmount * 100)}`,
            purchaseDate: dateOfPurchase,
            category: category,
            comment: note,
            tags: currentTags
        });    
        
        this.clearStates();

        this.props.history.push('/overview');
}

    formatDate = (date) => {
        date = new Date()
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
            month = '0'+ month
        }
        let day = new Date(date).getDate();
        if(day < 10){
            day = "0" + day;
        }
        let formatDate = `${year}-${month}-${day}`
        return formatDate;
    }

    handleCancel = () => {
        this.props.history.push('/overview');
    }

    showModal = () => this.setState({
        show: true,
    });

    showNewTagModal = () => this.setState({
        addTagModalShow: true
    });

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    hideAddTagModal = () => {
        this.setState({
            addTagModalShow: false
        });
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, currentTags, deletedTag} = this.state;

        const categoryChoices = this.categories.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
              
        const renderTags = currentTags.map((tagEntry, index) => 
            <button className="custom_tag" type="button" key={index} 
            >
            # {tagEntry.tagName} 
            </button>);

        return (
            <div>
                <Header title="ADD RECEIPT"/>
                <div className="main_container">
                    <form className="form_container" onSubmit={this.handleSubmit}>
                        <div className="btn_container">
                            <button className="cancel_btn" type="reset" value="Cancel" onClick={this.handleCancel}>                            
                                Cancel
                            </button>
                            <button className="done_btn"  type="submit" value="Submit">                                    
                                Submit
                            </button>
                        </div>    
                        <div className="add_new_form_input_container">
                            <div className="content_container">
                                <label className="input_label">Date :</label>
                                <input className="date" onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                            </div>

                            <div className="content_container">
                                <label className="input_label">Merchant :</label>
                                <input className="merchant" placeholder="required" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    pattern="^[\u00E4\u00E9a-zA-Z \d\-&'_!.,?+]{1,32}$" 
                                    title="Must be a valid merchant name."
                                    type="text"
                                    value={merchantName}
                                    name={merchantName}
                                    required
                                />
                            </div>
                            
                            <div className="content_container">
                                <label className="input_label">Total :</label>
                                $ <input className="amount" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 
                                    type="number" min="0.00" step="0.01"
                                    value={totalAmount}
                                    required
                                />
                            </div> 

                            <div className="content_container">
                                <label className="input_label">Category :</label>
                                <select name="category" onChange={ (e) => this.setState({category: (e.target.value)})} value={category}>
                                    {categoryChoices}
                                </select>
                            </div>

                            <div className="content_container">
                                <label className="input_label">Note :</label>
                                <input className="note" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                            </div>

                            <div className="content_container">
                                <label className="input_label">Tag :</label>
                                <i className="material-icons drop_down_arrow_icon" type="button" tags={this.state.tags} onClick={this.showModal}>arrow_drop_down_circle</i>
                                <i className="material-icons add_tag_icon" type="button" tags={this.state.tags} onClick={this.showNewTagModal}>add_box</i>
                                <div className="tag_buttons">
                                    {renderTags}
                                </div>
                            </div>
                        </div> 
                    </form>
                </div>
                <Footer/>
                {
                (this.state.show) ?
                    <SelectTagModal selectTags={this.selectTags} show={this.state.show} handleClose={this.hideModal} tags={this.state.tags} currentTags={this.state.currentTags}>
                    </SelectTagModal>    
                    : (null)
                }
                {
                (this.state.addTagModalShow) ?
                    <AddTagModal selectTags={this.selectTags} show={this.state.addTagModalShow} handleClose={this.hideAddTagModal} tags={this.state.tags} addNewDirectly={this.addNewDirectly}>
                    </AddTagModal>    
                    : (null)
                }
            </div>
        );
    }
}

export default AddNewTag;
