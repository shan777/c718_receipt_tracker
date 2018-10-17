import React, {Component} from 'react';
import './overview.css';


class FormatDate extends Component{
    constructor(props){
        super(props)

    }
    render(){
        let date = this.props.date; 
        let year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth()+1);
        if(month < 10){
            month = "0" + month;
        }
        let day = new Date(date).getUTCDate();
        if(day < 10){
            day = "0" + day;
        }
        let formatDate = `${month}-${day}-${year}`
        return formatDate;
    } 
}

export default FormatDate;