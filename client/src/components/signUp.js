    import React, { Component } from 'react';
    import axios from 'axios';
    import './signup.css';
    import squirrel from '../assets/images/squirrel_logo_small_facing_right.png';

    class SignUp extends Component {    
        state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        }

        render() {
            const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;
            return (
                <div className="signup_container">
                    <div className="sign_up_main_container">

                        <img className="logo" src={squirrel}></img>
                        <div className="title">Create an account to start</div>
                            <form>
                                <div className="entry_container">
                                    <label className="input_title">First Name</label>
                                    <input className='sign_up_input' onChange={ (e) => this.setState({firstName: e.target.value})}
                                        type="text"
                                        value={firstName}
                                    />
                                </div>

                                <div className="entry_container">
                                    <label className="input_title">Last Name</label>
                                    <input className='sign_up_input' onChange={ (e) => this.setState({lastName: e.target.value})}
                                        type="text"
                                        value={lastName}
                                    />
                                </div>

                                <div className="entry_container">
                                    <label className="input_title">Email Address</label>
                                    <input className='sign_up_input' onChange={ (e) => this.setState({emailAddress: e.target.value})}
                                        type="email"
                                        value={emailAddress}
                                    />
                                </div>

                                <div className="entry_container">
                                    <label className="input_title">Password</label>
                                    <input className='sign_up_input' onChange={ (e) => this.setState({password: e.target.value})}
                                        type="password"
                                        value={password}
                                    />
                                </div>

                                <div className="entry_container">
                                    <label className="input_title cfm_password">Confirm<br></br>Password</label>
                                    <div className="cfm sign_up_input">
                                        <input className='sign_up_input_inside' onChange={ (e) => this.setState({confirmPassword: e.target.value})}
                                            type="password"
                                            value={confirmPassword}
                                        />
                                    </div>    
                                </div>

                            <button className="letsgo"  type="submit" value="Letsgo" onSubmit={this.handleAddItem}>Let's go!</button>
                        </form>
                    </div>

                </div>
    
            );
        }
    }
    

export default SignUp;