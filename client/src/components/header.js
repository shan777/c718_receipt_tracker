import React, { Component } from 'react';
import './header.css';
import dots from '../assets/images/dots.png';

class Header extends Component {
    render() {
        return(
            <div className="headContainer">
                Add New
                <img className="dots" src={dots}/>
            </div>
        //dots - 1) link to About Us Page when created
        )
    }
}

export default Header;