    import React, { Component } from 'react';
    import axios from 'axios';
    import '../assets/css/signup.css';
    import squirrel from '../assets/images/squirrel_logo_small_facing_right.png';

    class SignUp extends Component {    
        state = {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmPassword: ''
        }

        render() {
            const {firstName, lastName, userName, password, confirmPassword} = this.state;
            return (
                <div className="signup_container">
                    <div className="main_container">

                        <img src={squirrel}></img>
                        <div className="title">Create an account to start</div>
                            TBD
                            <form>
                            
                                <div>
                                    <label className="input_title">First Name:</label>
                                    <input onChange={ (e) => this.setState({firstName: e.target.value})}
                                        type="text"
                                        value={firstName}
                                    />
                                </div>

                                <div>
                                    <label className="input_title">Last Name:</label>
                                    <input onChange={ (e) => this.setState({lastName: e.target.value})}
                                        type="text"
                                        value={lastName}
                                    />
                                </div>

                                <div>
                                    <label className="input_title">Username:</label>
                                    <input onChange={ (e) => this.setState({userName: e.target.value})}
                                        type="text"
                                        value={userName}
                                    />
                                </div>

                                <div>
                                    <label className="input_title">Password</label>
                                    <input onChange={ (e) => this.setState({password: e.target.value})}
                                        type="text"
                                        value={password}
                                    />
                                </div>

                                <div>
                                    <label className="input_title">Confirm password</label>
                                    <input onChange={ (e) => this.setState({confirmPassword: e.target.value})}
                                        type="text"
                                        value={confirmPassword}
                                    />
                                </div>
                    
    
    
                            <button className="letsgo"  type="submit" value="Letsgo" onSubmit={this.handleAddItem}>Let's go!</button>
                        </form>
                    </div>

                </div>
    
            );
        }
    }
    

export default SignUp;