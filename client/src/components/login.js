import React, {Component} from 'react';
import './login.css';
// import { Link, Route } from 'react-router-dom';
import loginLogo from '../assets/images/loginLogo.png';

class Login extends Component{
    render(){
        const centerStyle = {
            'textAlign': 'center'
        }
        return(
            <div className="login_page_container">
                <img className="login_logo" src={loginLogo} />
                <div style={centerStyle}>
                    <form className="login_area">
                        <input className="username" type="text" placeholder="Username"/>
                        <input className="password" type="text" placeholder="Password"/>
                    </form>
                    <div className="forgot_password">
                        forgot your password?
                    </div>
                    <div className="login_btn_container">
                        <button className="login_btn">LOGIN</button>
                    </div>
                    <div className="sign_up_container">
                        or Sign-up
                    </div>
                </div>  
            </div>
        )
    }
}

export default Login;