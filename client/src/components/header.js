import React, { Component } from 'react';
import './header.css';
import dots from '../assets/images/dots.png';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import Hamburger from './hamburger';

class Header extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
            path: props.path,
            sidebarOpen: false
        };
    }

    onSetSidebarOpen = (open) => {
        this.setState({ 
            sidebarOpen: open 
        });
    }

    render() {
        return(
            <div className="headContainer header">
                {this.props.title || ''}
                <Sidebar
                    sidebar={<Hamburger push={this.props.push}/>}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    sidebarClassName="sidebar_container"
                    contentClassName="menus"
                    pullRight={true}
                >
                <div>
                    <img className="dots" onClick={() => this.onSetSidebarOpen(true)} src={dots}/>
                </div>
                </Sidebar>   
            </div> 
        );   
    }
}

export default Header;
