import React, { Component } from 'react';
import './header.css';
import dots from '../assets/images/dots.png';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';

class Header extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
            sidebarOpen: false
        };
    }

    onSetSidebarOpen = (open) => {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return(
            <Sidebar
            sidebar={<b>About us</b>}
            open={this.state.sidebarOpen}
            styles={{sidebar: {background: "white"}}}
            >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                    <img className="dots" src={dots}/>
                </button>
            </Sidebar>    
        );
    }
}

export default Header;

