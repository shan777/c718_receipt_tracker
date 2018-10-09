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
        this.setState({ 
            sidebarOpen: open 
        });
    }

    sidebar = {
        sidebar: { height: "100vh", width: "50vw", "overflowY": "unset", position: "fixed" },
        overlay: {backgroundColor: "#237E80"}

    }

    render() {
        var sidebar = "<b>About us</b> <b>test</b>"
        return(
            <div className="headContainer header">
                {this.props.title || ''}
                <Sidebar
                sidebar={<Hamburger/>}
                open={this.state.sidebarOpen}
                styles={this.sidebar}
                >
                    <button onClick={() => this.onSetSidebarOpen(true)}>
                        <img className="dots" src={dots}/>
                    </button>
                </Sidebar>   
            </div> 
        );
    }
}

export default Header;
