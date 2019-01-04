    import React, { Component } from 'react';
    import axios from 'axios';
    import './signup.css';
    import squirrel from '../assets/images/signup_squirrel.png';
    import squirrel_head from '../assets/images/head.png';

    import { Link } from 'react-router-dom';

    class SignUp extends Component {    
    constructor(props){
        super(props);
  
        this.state = {
            fields: {
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            },
            errors: {}
        }
    }
  
    async handleSubmit(e) {
        e.preventDefault();

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        // Username validation
        if(!fields["username"]){
            formIsValid = false;
            errors["username"] = "Username cannot be empty";
        } else if(typeof fields["username"] !== "undefined"){
            if(!fields["username"].match(/^(?=.{4,15}$)(?!.*[_]{2})^[a-zA-Z]\w+$/)){
                formIsValid = false;
                errors["username"] = "Invalid Username";
            }      	
        }
  
        // First name validation
        if(!fields["firstName"]){
            formIsValid = false;
            errors["firstName"] = "First name cannot be empty";
        } else if(typeof fields["firstName"] !== "undefined"){
            if(!fields["firstName"].match(/^[a-zA-Z.\-' ]{2,32}$/)){
                formIsValid = false;
                errors["firstName"] = "Invalid First Name";
            }      	
        } 
  
        // Last name validation
        if(!fields["lastName"]){
            formIsValid = false;
            errors["lastName"] = "Last name cannot be empty";
        } else if(typeof fields["lastName"] !== "undefined"){
            if(!fields["lastName"].match(/^[a-zA-Z.\-' ]{2,32}$/)){
            formIsValid = false;
            errors["lastName"] = "Invalid Last Name";
            }      	
        } 

        // Password validation
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        } else if(typeof fields["password"] !== "undefined"){
            if(!fields["password"].match(/^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).*$/)){
            formIsValid = false;
            errors["password"] = "Invalid Password";
            }      	
        } 
  
        // Confirm Password validation
        if(!fields["confirmPassword"]){
            formIsValid = false;
            errors["confirmPassword"] = "Confirm Password cannot be empty";
        } else if(typeof fields["confirmPassword"] !== "undefined"){
            if(fields["password"] !== fields["confirmPassword"]){
            formIsValid = false;
            errors["confirmPassword"] = "Does not match";
            }      	
        } 

        this.setState({errors: errors});

        if (formIsValid) {
            const {username, firstName, lastName, password} = this.state.fields;

            try {
                await axios.post('/api/manageUsers/signUp',{
                    userName: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                });

                this.props.history.push('/overview');
                
            } catch(err) {
                if(err.response.data.error.code == "ER_DUP_ENTRY") {
                    formIsValid = false;
                    errors["username"] = `This username exists already.<br/>Please try another username.`;
                    this.setState({errors: errors});

                    return formIsValid;
                }
            }
        } else
            return formIsValid;
    }
   
  
    handleChange(field, e){    		
  
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
  
    render(){
        return (
            <div className="signup_container">
                <img className="signup_logo" src={squirrel}></img>
                <form name="contactform" className="contactform" onSubmit= {this.handleSubmit.bind(this)}>
                    <fieldset>
                        <input pattern="(?=.{4,15}$)(?!.*[_]{2})^[a-zA-Z]\w+$" className="username_input" ref="username" type="text" size="20" placeholder="Username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                        <div className="guidelines">&nbsp;&nbsp;&nbsp;<i className="material-icons">info</i>&nbsp;<b>Username Guidelines:</b>
                            <ul>
                                <li>Only letters (a-z), numbers (0-9), and underscores(_)</li>
                                <li>Must start and end with a letter</li>
                                <li>Between 5-15 characters long</li>
                            </ul>
                        </div>
                        <span className="error" dangerouslySetInnerHTML={{__html: this.state.errors["username"]}} />
                        <br/>
                        <input ref="firstName" type="text" size="20" placeholder="First Name" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]}/>
                        <span className="error">{this.state.errors["firstName"]}</span>
                        <br/>
                        <input ref="lastName" type="text" size="20" placeholder="Last Name" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]}/>
                        <span className="error">{this.state.errors["lastName"]}</span>
                        <br/>
                        <input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" className="password_input" ref="password" type="password" size="20" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        <div className="guidelines">&nbsp;&nbsp;&nbsp;<i className="material-icons">info</i>&nbsp;<b>Password Guidelines:</b>
                            <ul>
                                <li>Must contain at least 1 uppercase AND 1 lowercase AND 1 number</li>
                                <li>Must start with a letter</li>
                                <li>No special characters</li>
                                <li>Between 8-32 characters long</li>
                            </ul>
                        </div>
                        <span className="error">{this.state.errors["password"]}</span>
                        <br/>
                        <input ref="confirmPassword" type="password" size="20" placeholder="Confirm Password" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]}/>
                        <span className="error">{this.state.errors["confirmPassword"]}</span>
                        <br/>
                    </fieldset>
        
                    <fieldset>
                            <button className="signup_button" id="submit" value="Submit">Sign up</button>
                    </fieldset>
                </form>

                <br/>
                <img className="tutorial_img" src={squirrel_head}></img>
                <div className="tutorial_link"><Link to='/tutorial'>Click here to see Tutorial</Link></div>
            </div>
        );
    }
}
  
export default SignUp;
