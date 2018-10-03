import React, { Component } from 'react';
import './footer.css';
import {BrowserRouter as Router,
        Link, 
        Route } from 'react-router-dom';
import AddNew from './add_new';
import Overview from './overview';
import addNew from '../assets/images/addNewBlack.png';
import overView from '../assets/images/overViewBlack.png';
import filter from '../assets/images/filterBlack.png';
import notification from '../assets/images/notificationBlack.png';

class Footer extends Component {
    render() {
        return( 
            <Router>
                <div className="footer_container">
                    <ul>
                        <li><Link to='/addnew'><img src={addNew} /></Link></li>
                        <li><Link to='/overview'><img src={overView} /></Link></li>
                        <li><Link to='/filter'><img src={filter} /></Link></li>
                        <li><Link to='/notification'><img src={notification} /></Link></li>
                    </ul>

                    <Route path ="/add_new" component={AddNew}/>
                    <Route path ="/overview" component={Overview}/>
                    {/* <Route path ="/filter" component={Filter}/> */}
                    {/* <Route path ="/notification" component={Notification}/> */}
                </div>
            </Router>

            
        )
    }
}

export default Footer;




            {/* <div className="footerContainer">
                <img className="iconImage" src={addNew}/>
                <img className="iconImage" src={overView}/> 
                <img className="iconImage" src={filter}/>
                <img className="iconImage" src={notification}/>
            </div> */}