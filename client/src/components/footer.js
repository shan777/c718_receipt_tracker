import React, { Component } from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            userIDAddressFragment: props.userID ? '/'+props.userID : ''
        }
    }

    render() {
        return(
            <div className="footer_container">
                <NavLink to={'/add_new'+this.state.userIDAddressFragment} className="footer-nav-link"><i className="material-icons">library_add</i></NavLink>
                <NavLink to='/overview' className="footer-nav-link"><i className="material-icons">format_list_bulleted</i></NavLink>
                <NavLink to='/tutorial' className="footer-nav-link"><i className="material-icons">live_help</i></NavLink>
                <NavLink to='/about_us' className="footer-nav-link"><i className="material-icons">mood</i></NavLink>
            </div>
        )
    }
}

export default Footer;