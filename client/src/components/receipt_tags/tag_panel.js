import React, {Component} from 'react';
import ReceiptTag from './receipt_tag';
import './tag_panel.css';

class TabPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTag: null,
            addInputShowing: this.props.addCallback ? false : true
        }
    }
    renderAllTags(){
        return this.props.tags.length>0 ? this.props.tags.map( (tagInfo,index)=> <ReceiptTag data={tagInfo} key={index}/>) : 'no tags available';
    }
    handleTagAddButtonClick = ()=>{
        this.setState({
            newTag: '',
            addInputShowing: !this.state.addInputShowing
        })
    }
    handleTagAddComplete = (tagText) =>{
        console.log('handle tag add complete ' + tagText)
        this.props.addCallback(tagText);
    }
    render(){
        return(
            <div className="tab_panel">
                { this.props.addCallback ? <div onClick={this.handleTagAddButtonClick} className="tagAddButton">{this.state.addInputShowing ? '-' : '+'}</div> : ''}
                { this.state.addInputShowing ? <ReceiptTag data='' mode="add"  addHandler={this.handleTagAddComplete}/> : ''}
                {this.renderAllTags()}
            </div>
        );
    }
}

export default TabPanel;