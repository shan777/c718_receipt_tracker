import React, { Component } from 'react';
import axios from 'axios';

export default (WrappedComponent, redirect = false, to = '/', protect = false) => {
    class Auth extends Component {
        state = {
            auth: protect
        }

        componentDidMount(){
            this.handleRedirect();

            this.checkLoginStatus();
        }

        componentDidUpdate(){
            this.handleRedirect();
        }

        handleRedirect(){
            const { auth } = this.state;
            if(protect && !auth || !protect && redirect && auth){
                this.redirect(to);
            }
        }

        async checkLoginStatus(){

            try {
                const resp = await axios.post('/api/manageUsers/checkLoginStatus');

    
                this.setState({auth: resp.data.loggedIn});
            } catch(err){
                this.setState({auth: false});
            }
        }

        redirect(to = '/'){
            this.props.history.push(to);
        }

        setAuth = (auth = false) => {
            this.setState({auth});
        }

        render(){
            return <WrappedComponent {...this.props} setAuth={this.setAuth} auth={this.state.auth}/>
        }
    }

    return Auth;
}

