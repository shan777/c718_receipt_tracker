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
        userId: null
    }

    async handleSubmit(e) {
        const { username, password } = this.state;

        e.preventDefault();

        const resp = await axios.post('/api/login', {
            userName: username,
            password: password
        });
        this.setState({
            userId: resp.data.userId
        })
        this.props.history.push('/overview');
        console.log(this.state.userId);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        const centerStyle = {
            'textAlign': 'center'
        }
        return(
            <div className="login_page_container">
                <img className="login_logo" src={loginLogo} />
                <div style={centerStyle}>
                    <form className="login_area" onSubmit={this.handleSubmit}>
                        <input name='username' value={this.state.username} 
                        onChange={this.handleChange.bind(this)} className="username" 
                        ype="text" placeholder="Username"
                        />
                        <input name='password' value={this.state.password} 
                        onChange={this.handleChange.bind(this)} className="password" 
                        type="password" placeholder="Password"
                        />
                        <button className="login_btn">LOGIN</button>
                    </form>
                    <div className="forgot_password"> {/*forgot your password is only text at this time*/}
                        forgot your password?
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