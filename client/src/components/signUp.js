    import React, { Component } from 'react';
    import axios from 'axios';
    import './signup.css';
    import squirrel from '../assets/images/squirrel_logo_small_facing_right.png';

    class SignUp extends Component {    
        constructor(props) {
            super(props);

            this.handleSubmit = this.handleSubmit.bind(this);
        }
        state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            alert: false
        }

        passwordRestrictions(){
            this.setState({
                alert: true
            })
        }

        checkPassword = () => {
            // if(this.state.password !== this.state.confirmPassword)
            console.log('password: ', password);
        }

        async handleSubmit(e) {
            const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;

            console.log('inside handlesubmit');
            e.preventDefault();
            // const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;

            const resp = await axios.post('/api/signUp',{
                firstName,
                lastName
            });
            console.log(resp);
        }

        render() {
            const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;

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
                                    <input onClick={this.passwordRestrictions.bind(this)}  className='sign_up_input' onChange={ (e) => this.setState({password: e.target.value})}
                                        type="password"
                                        value={password}
                                    />
                                    {/* <i className="material-icons">visibility</i> */}
                                    <div style={this.state.alert ? alertShow: alertNone} className="alert_password_restrictions">
                                        Minimum password of 8 characters including one number!
                                    </div>
                                </div>

                                <div className="entry_container">
                                    <label className="input_title cfm_password">Confirm<br></br>Password</label>
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