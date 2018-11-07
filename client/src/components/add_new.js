import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import './add_new.css';
import Modal from './modal';
import TagModal from './tag_modal';
import Chips from './chips';

class AddNew extends Component {    
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
            currentTags: []
        }
    }

    selectTags = (tags) => {
        this.setState({
            currentTags: tags
        });
    }

    async componentDidMount(){
        // const login = await axios.post('/api/login', {userName: 'sarahHan', password: 'sarahLfz123'});

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

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const {merchantName, dateOfPurchase, totalAmount, category, note, currentTags} = this.state;

        const categoryChoices = this.categories.map((option, index) => 
            <option key={index} value={option}>{option}</option>);
              
        const tagName = currentTags.map((tagEntry, index) => 
            <button className="custom_tag" type="button" key={index}><i className="material-icons custom_tag_icon">local_offer</i>{tagEntry.tagName}</button>);

        return (
            <div>
                <Header title="ADD NEW"/>
                <div className="main_container">
                    <form className="form_container" onSubmit={this.handleSubmit}>
                        <div className="btn_container">
                            <button className="cancel_btn" type="reset" value="Cancel" onClick={this.handleCancel}>                            
                                Cancel
                                {/* <i className="material-icons tag_icon">clear</i> */}
                            </button>
                            <button className="done_btn"  type="submit" value="Done">                                    
                                Done
                            </button>
                        </div>    
                        <div className="add_new_form_input_container">
                            <div className="content_container">
                                <label className="input_label">Merchant :</label>
                                <input className="merchant" placeholder="Required" onChange={ (e) => this.setState({merchantName: e.target.value})}
                                    type="text"
                                    value={merchantName}
                                    name={merchantName}
                                    required
                                />
                            </div>

                            <div className="content_container">
                                <label className="input_label">Date :</label>
                                <input className="date" onChange={ (e) => this.setState({dateOfPurchase: e.target.value})}
                                    type="date"
                                    value={dateOfPurchase}
                                />
                            </div>

                            <div className="content_container">
                                <label className="input_label">Total :</label>
                                $ <input className="amount" onChange={ (e) => this.setState({totalAmount: (e.target.value)})} 
                                    type="number" min="0.00" step="0.01"
                                    value={totalAmount}
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
                                <input className="note" placeholder="Not specified" onChange={ (e) => this.setState({note: e.target.value})}
                                    type="text"
                                    value={note}
                                />
                            </div>

                            <div className="content_container">
                            <div className="tag_labelssssssssss">
                                <label className="tag_label">Tag :</label>
                                {/* <button className="plus_tag_button" type="button" tags={this.state.tags} onClick={this.showModal}> */}
                                {/* <button className="plus_tag_button" type="button" tags={this.state.tags} onClick={this.showModal}> */}

                                    <i className="material-icons md-light md-36 custom_tag_icon" tags={this.state.tags} onClick={this.showModal}>add_circle</i>
                                    {/* <i className="material-icons md-light custom_tag_icon">local_offer</i> */}
                                    {/* </button> */}
                            </div>   
                                <div className="tag_buttons"><Chips/>
                                    {/* <button className="plus_tag_button" type="button" tags={this.state.tags} onClick={this.showModal}>
                                    <i className="material-icons md-light custom_tag_icon">add</i>
                                    <i className="material-icons md-light custom_tag_icon">local_offer</i>
                                    </button> */}
                                    {tagName}
                                </div>
                            </div> 
                        </div>
                   </form>
                   
                </div>
                <Footer/>
                {
                (this.state.show) ?
                    <TagModal selectTags={this.selectTags} show={this.state.show} handleClose={this.hideModal} tags={this.state.tags}>
                    </TagModal>    
                    : (null)
                }
            </div>
        );
    }
}

export default AddNew;
