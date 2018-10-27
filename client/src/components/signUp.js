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
                touched: {
                    username: false,
                    firstName: false,
                    lastName: false,
                    password: false,
                    confirmPassword: false
                  },
                alert: false
            }
        }

        validate = (event) => {
            const {username, firstName, lastName, password, confirmPassword} = this.state;

            // error=true means invalid 
            const usernameRegex = /(?!\d+)\w{4,16}/i; //4-16 long lowercase/uppercase/digit/underscore except it cannot start with a number
            const firstNameRegex = /[a-zA-Z_.-]{2,}/; 
            const lastNameRegex = /[a-zA-Z_.-]{2,}/;
            const usernameOK = usernameRegex.test(username);
            const firstNameOK = firstNameRegex.test(firstName);
            const lastNameOK = lastNameRegex.test(lastName);
            const passwordMatch = password === confirmPassword;

            return {
              username: usernameOK,
              firstName: firstNameOK,
              lastName: lastNameOK,
              password: passwordOK,
            };
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
                        <img className="signup_logo" src={squirrel}></img>
                        <div className="title">Create an account to start</div>
                            <form  onSubmit={this.handleSubmit}>
                                <div className="entry_container">
                                    <label className="input_title">Username</label>
                                    <input className='sign_up_input username_input' onChange={ (e) => this.setState({username: e.target.value})}
                                        type="text"
                                        value={username}
                                    />
                                    <div className="error_p">&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">info</i>&nbsp;<b>Username guidelines:</b>
                                        <ul>
                                            <li>Only letters(a-z), numbers(0-9), and underscores(_)</li>
                                            <li>Cannot start with a number</li>
                                            <li>Between 4-15 characters</li>
                                            <li>Not case-sensitive</li>
                                        </ul>
                                    </div>
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
                                    {/* <input onClick={this.passwordRestrictions.bind(this)} className='sign_up_input' onChange={ (e) => this.setState({password: e.target.value})} */}
                                    <input className='sign_up_input password_input' onChange={ (e) => this.setState({password: e.target.value})}
                                        type="password"
                                        value={password}
                                    />
                                    <div className="error_p">&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">info</i>&nbsp;<b>Password guidelines:</b>
                                        <ul>
                                            <li>Must contain at least 1 uppercase, 1 lowercase, and 1 number</li>
                                            <li>Minimum of 8 characters</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="entry_container">
                                    <label className="input_title cfm_password">Confirm<br/>Password</label>
                                    <div className="cfm sign_up_input">
                                        <input className='confirm_password_input' onChange={ (e) => this.setState({confirmPassword: e.target.value})}
                                            onClick={this.checkPassword}
                                            type="password"
                                            value={confirmPassword}
                                        />
                                    </div>    
                                    <div style={this.state.alert ? alertShow: alertNone} className="sign_up_input alert_password_restrictions">
                                    <i className="material-icons">error_outline</i> 
                                    Does not match. Please check again. 
                                    </div>
                                </div>



                            <button className="letsgo"  type="submit" value="Letsgo">Let's go!</button> 
                            {/* <button disabled={!isEnabled} className="letsgo"  type="submit" value="Letsgo">Let's go!</button> */}
                        </form>
                    </div>

                </div>
    
            );
        }
    }
    

export default SignUp;
