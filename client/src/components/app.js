import React from 'react';
// import '../assets/css/app.css';
import Overview from './overview';
import {BrowserRouter as Router,
        Route } from 'react-router-dom';
import Splash from './carousel/app';
import AddNew from './add_new';
import Login from './login';
import SignUp from './signup';
import AboutUs from './about_us';
import TagModal from './tag_modal';
import About from './about';

const App = () => (
    <Router>
        <div>
            <Route path ="/add_new/:userID?" component={AddNew}/>
            <Route exact path="/" component={Splash}/>
            <Route path ="/overview/:userID?" component={Overview}/>
            <Route path ="/login" component = {Login}/>
            <Route path="/signup" component ={SignUp}/>
            <Route path="/about_us" component={AboutUs}/>
            <Route path="/tagmodal" component={TagModal}/>
            <Route path="/about" component={About}/>
        </div>
    </Router>
);

export default App;