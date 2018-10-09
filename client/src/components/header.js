import React, { Component } from 'react';
import './header.css';
import dots from '../assets/images/dots.png';
import { Link } from 'react-router-dom';
import Hamburger from 'react-sidebar';

class Header extends Component {
    render() {
        return(
            <div className="headContainer header">
                {this.props.title || ''}
                <Hamburger
                    sidebar={<b>Sidebar content</b>}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}

                    
                <Link to='/about_us' ><img className="dots" src={dots}/></Link>
            </div>
        )
    }
}

export default Header;