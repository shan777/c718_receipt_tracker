import React, {Component} from 'react';
import axios from 'axios';
import './login.css';
import loginLogoSqr from '../assets/images/sqr_only.png';
import loginLogoTxt from '../assets/images/txt_only.png';
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
        error: ''
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

    render(){
        return(
            <div className="login_page_container">
                <div className="login_logo">
                    <img className="login_logo_sqr" src={loginLogoSqr} alt="squirrel logo" />
                    <img className="login_logo_txt" src={loginLogoTxt} alt="squirrel logo text" />
                </div>
                <div className="login_container">
                    <form className="login_area" onSubmit={this.handleSubmit}>
                        <input name='username' value={this.state.username} 
                        onChange={this.handleChange.bind(this)} className="username" 
                        type="text" placeholder="Username"
                        /><br/><br/>
                        <input name='password' value={this.state.password} 
                        onChange={this.handleChange.bind(this)} className="password" 
                        type="password" placeholder="Password"
                        /><br/><br/>
                        <button className="login_btn">LOGIN</button>
                        <p className="error_message" style={{color: 'red'}}>{this.state.error}</p>
                    </form>
                    {/* <div className="forgot_password"> forgot your password is only text at this time
                        forgot your password?
                    </div> */}
                    <div className="sign_up_button">
                        <Link to='/signup'>or Sign-up</Link>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Login;