import React, {Component} from 'react';
import ReceiptTab from './receipt_tab';
import './tab_panel.css';

class TabPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTag: null
        }
    }
    renderAllTabs(){
        return this.props.tabs.length>0 ? this.props.tabs.map( (tabInfo,index)=> <ReceiptTab data={tabInfo} key={index}/>) : 'no tabs available';
    }
    handleTagAddButtonClick = ()=>{
        this.setState({
            newTag: ''
        })
    }
    handleTagAddComplete = (tagText) =>{
        console.log('handle tag add complete ' + tagText)
        this.props.addCallback(tagText);
    }
    render(){
        return(
            <div className="tab_panel">
                { this.props.addCallback ? <div onClick={this.handleTagAddButtonClick} className="tagAddButton">+</div> : ''}
                { this.state.newTag !== null ? <ReceiptTab data='' mode="add"  addHandler={this.handleTagAddComplete}/> : ''}
                {this.renderAllTabs()}
            </div>
        );
    }
}

export default TabPanel;