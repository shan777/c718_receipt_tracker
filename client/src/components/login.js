import React, {Component} from 'react';
import axios from 'axios';
import './login.css';
import loginLogo from '../assets/images/loginLogo.png';
import { Link } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        username: '',
        password: '',
        userId: null,
        error: '',
        signedUp: false
    }

    async handleSubmit(e) {
        const { username, password } = this.state;

        e.preventDefault();

        try {
            const resp = await axios.post('/api/manageUsers/login', {
                userName: username,
                password: password
            });
    
            this.props.setAuth(true);
        } catch (err){
            let errorMessage = 'Login Failed';

            if(err.response && err.response.data.error){
                errorMessage = err.response.data.error;
            }

            this.setState({error: errorMessage});
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async successfullySignedUp(){
        await this.setState({
            signedUp: true
        })
    }

    render(){
        const signedUp = {
            display: 'block'
        }

        const notSignedUp = {
            display: 'none'
        }
        return(
            <div className="login_page_container">
                <img className="login_logo" src={loginLogo} />
                <div className="login_container">
                <div style={this.state.signedUp ? signedUp : notSignedUp} >You have successfully signed up.</div>
                    <form className="login_area" onSubmit={this.handleSubmit}>
                        <input name='username' value={this.state.username} 
                        onChange={this.handleChange.bind(this)} className="username" 
                        type="text" placeholder="Username"
                        />
                        <input name='password' value={this.state.password} 
                        onChange={this.handleChange.bind(this)} className="password" 
                        type="password" placeholder="Password"
                        />
                        <button className="login_btn">LOGIN</button>
                        <p className="error_message" style={{color: 'red'}}>{this.state.error}</p>
                    </form>
                    {/* <div className="forgot_password"> forgot your password is only text at this time
                        forgot your password?
                    </div> */}
                    <div onClick={this.successfullySignedUp.bind(this)} className="sign_up_button">
                        <Link to='/signup'>or Sign-up</Link>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Login;