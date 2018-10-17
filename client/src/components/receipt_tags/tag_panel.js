import React, { Component } from 'react';
import ReceiptTag from './receipt_tag';
import './tag_panel.css';

class TagPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTag: null,
            addInputShowing: this.props.addCallback ? false : true
        }
    }

    renderAllTags(){
        return this.props.tags.map((tagInfo, index)=> <ReceiptTag data={tagInfo} key={index}/>) ;
    }
    
    handleTagAddButtonClick = () => {
        this.setState({
            newTag: '',
            addInputShowing: !this.state.addInputShowing
        })
    }

    handleTagAddComplete = (tagText) => {
        this.props.addCallback(tagText);
    }

    render(){
        return(
            <div className="tag_panel">
                {this.props.addCallback ? 
                    <div onClick={this.handleTagAddButtonClick} className="tag_add_button">{this.state.addInputShowing ? '-' : '+'}</div> : ''}
                {this.state.addInputShowing ? <ReceiptTag data='' mode="add" addHandler={this.handleTagAddComplete}/> : ''}
                {this.renderAllTags()}
            </div>
        );
    }
}

export default TagPanel;