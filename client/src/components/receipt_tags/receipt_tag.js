import React, {Component} from 'react';
import './receipt_tag.css';

class ReceiptTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            newText: ''
        }
    }
    handleKeyPress = (e) =>{
        console.log('keypress')
        this.setState({
            newText: e.target.value
        })
    }
    handleEnterCheck = (e)=>{
        if(e.which===13){
            console.log('enter pressed')
            this.props.addHandler( this.state.newText);
            this.setState({ newText: ''})
            return false;
        }
        return true;
    }
    render(){
        switch(this.props.mode){
            case 'add':
                return(
                    <div className='tag'><input onChange={this.handleKeyPress} onKeyDown={this.handleEnterCheck } value={this.state.newText} type="text" placeholder="enter tag"/></div>
                )
            default:
                return(
                    <div className={`tag tag-${this.props.data}`}>{this.props.data}</div>
                );
        }

    }
}

export default ReceiptTab