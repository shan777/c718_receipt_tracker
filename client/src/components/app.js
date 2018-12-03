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
import About from './about';
import auth from '../hoc/auth';

const App = () => (
    <Router>
        <div>
            <Route path ="/add_new/:userID?" component={auth(AddNew, false, '/login', true)}/>
            <Route exact path="/" component = {auth(Login, true, '/overview')}/>
            <Route path="/tutorial" component={Splash}/>
            <Route path ="/overview/:userID?" component={auth(Overview, false, '/login', true)}/>
            <Route path ="/login" component = {auth(Login, true, '/overview')}/>
            <Route path="/signup" component ={SignUp}/>
            <Route path="/about_us" component={AboutUs}/>
            <Route path="/tech" component={About}/>
        </div>
    </Router>
);

export default App;