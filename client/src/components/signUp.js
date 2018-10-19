    import React, { Component } from 'react';
    import axios from 'axios';
    import './signup.css';
    import squirrel from '../assets/images/squirrel_logo_small_facing_right.png';

    class SignUp extends Component {    
        constructor(props) {
            super(props);

            this.handleSubmit = this.handleSubmit.bind(this);
        
            this.state = {
                username: '',
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                alert: false
            }
        }

        passwordRestrictions(){
            this.setState({
                alert: true
            })
        }

        checkPassword = () => {
            // if(this.state.password !== this.state.confirmPassword)
        }

        async handleSubmit(event) {
            const {username, firstName, lastName, emailAddress, phoneNumber, password, confirmPassword} = this.state;

            event.preventDefault();

            const resp = await axios.post('/api/manageUsers/signUp',{
                userName: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                // email: email,
                // phone: phone
            });
            this.props.history.push('/overview');
        }

        render() {
            const {username, firstName, lastName, password, confirmPassword} = this.state;

            const alertNone = {
                display: 'none'
            }

            const alertShow = {
                display: 'block'
            }
            
            return (
                <div className="signup_container">
                    <div className="sign_up_main_container">
                        <img className="logo" src={squirrel}></img>
                        <div className="title">Create an account to start</div>
                            <form  onSubmit={this.handleSubmit}>
                                <div className="entry_container">
                                    <label className="input_title">Username</label>
                                    <input className='sign_up_input' onChange={ (e) => this.setState({username: e.target.value})}
                                        type="text"
                                        value={username}
                                    />
                                </div>

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
                                    <label className="input_title">Password</label>
                                    <input onClick={this.passwordRestrictions.bind(this)}  className='sign_up_input' onChange={ (e) => this.setState({password: e.target.value})}
                                        type="password"
                                        value={password}
                                    />
                                    {/* <i className="material-icons">visibility</i> */}
                                    <div style={this.state.alert ? alertShow: alertNone} className="sign_up_input alert_password_restrictions">
                                    <i class="material-icons">warning</i> 
                                    Must be at least 8 characters long including 1 uppercase letter and 1 number.
                                    </div>
                                </div>

                                <div className="entry_container">
                                    <label className="input_title cfm_password">Confirm<br/>Password</label>
                                    <div className="cfm sign_up_input">
                                        <input className='sign_up_input_inside' onChange={ (e) => this.setState({confirmPassword: e.target.value})}
                                            onClick={this.checkPassword}
                                            type="password"
                                            value={confirmPassword}
                                        />
                                    </div>    
                                </div>

                            <button className="letsgo"  type="submit" value="Letsgo">Let's go!</button>
                        </form>
                    </div>

                </div>
    
            );
        }
    }
    

export default SignUp;
