import React, { Component } from 'react';
import './footer.css';
import addNew from '../assets/images/addNewBlack.png';
import overView from '../assets/images/overViewBlack.png';
import filter from '../assets/images/filterBlack.png';
import notification from '../assets/images/notificationBlack.png';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return(
            <div className="footer_container">
                <Link to='/add_new' className="icon_image add_new_icon"><img src={addNew} /></Link>
                <Link to='/overview' className="icon_image"><img src={overView} /></Link>
                <Link to='/#' className="icon_image"><img src={filter} /></Link>
                <Link to='/#' className="icon_image"><img src={notification} /></Link>
            </div>
        )
    }
}

export default Footer;