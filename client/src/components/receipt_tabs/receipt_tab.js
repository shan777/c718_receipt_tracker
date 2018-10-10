import React, {Component} from 'react';
import './receipt_tab.css';

class ReceiptTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            newText: ''
        }
    }
    handleInput = (e) =>{
        if(e.which===13){
            console.log('enter pressed')
            this.props.addHandler( this.state.newText);
        } else {
            this.setState({
                newText: this.state.newText + e.key
            })
        }
    }
    render(){
        switch(this.props.mode){
            case 'add':
                return(
                    <div className='tag'><input onKeyDown={this.handleInput} value={this.state.newText} type="text" placeholder="enter tag"/></div>
                )
            default:
                return(
                    <div className={`tag tag-${this.props.data}`}>{this.props.data}</div>
                );
        }

    }
}

export default ReceiptTab