import React, { Component } from 'react';
import Header from './header';

class SignOut extends Component {    
    render() {
        return(
            <div>
                <Header title="Sign Out"/>
                You are signed out now.<br></br>
                Good bye~~~~~~~~~
            </div>
        );
    }
}

export default SignOut;