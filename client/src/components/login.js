import React, {Component} from 'react';
import './login.css';
import loginLogo from '../assets/images/loginLogo.png';
import { Link } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            userName: '',
            password: ''
        }
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        console.log('username:', this.state.userName);
        console.log('password:', this.state.password);

        const centerStyle = {
            'textAlign': 'center'
        }
        return(
            <div className="login_page_container">
                <img className="login_logo" src={loginLogo} />
                <div style={centerStyle}>
                    <form className="login_area">
                        <input name='userName' value={this.state.userName} onChange={this.handleChange.bind(this)} className="username" type="text" placeholder="Email Address"/>
                        <input name='password' value={this.state.password} onChange={this.handleChange.bind(this)} className="password" type="text" placeholder="Password"/>
                    </form>
                    <div className="forgot_password"> {/*forgot your password is only text at this time*/}
                        forgot your password?
                    </div>
                    <div className="login_btn_container">
                        <Link to='/overview' ><button className="login_btn">LOGIN</button></Link>
                    </div>
                    <div className="sign_up_container">
                        <Link to='/signup' >or Sign-up</Link>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Login;