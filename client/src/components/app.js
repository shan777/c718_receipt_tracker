import React from 'react';
// import '../assets/css/app.css';
import Overview from './overview';
import {BrowserRouter as Router,
        Link, 
        Route } from 'react-router-dom';
import Splash from './splash_page';
import AddNew from './add_new';
import Login from './login';
import SignUp from './signup';
import AboutUs from './about_us';

const App = () => (
    <Router>
        <div>
        {/* <div className="app">
                <Splash/>
            </div>
            <ul>
                <li>
                    <Link to='/overview'>Overview</Link>>
                </li>
                <li>
                    <Link to='/addnew'>Add New</Link>>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Sign Up</Link>
                </li>
            </ul> */}
            <Route path ="/add_new" component={AddNew}/>
            <Route exact path="/" component={Splash}/>
            <Route path ="/overview" component={Overview}/>
            <Route path = "/login" component = {Login}/>
            <Route path="/signup" component ={SignUp}/>
            <Route path="/about_us" component={AboutUs}/>
        </div>
    </Router>
);

export default App;