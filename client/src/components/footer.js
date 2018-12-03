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
                <NavLink to='/overview' className="footer-nav-link"><i className="material-icons">list_alt</i></NavLink>
                <NavLink to={'/add_new'+this.state.userIDAddressFragment} className="footer-nav-link"><i className="material-icons">note_add</i></NavLink>
                <NavLink to='/tutorial' className="footer-nav-link"><i className="material-icons">perm_device_information</i></NavLink>
                <NavLink to='/about_us' className="footer-nav-link"><i className="material-icons">group</i></NavLink>
            </div>
        )
    }
}

export default Footer;