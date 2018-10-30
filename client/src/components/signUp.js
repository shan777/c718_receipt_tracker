    import React, { Component } from 'react';
    import axios from 'axios';
    import './signup.css';
    import squirrel from '../assets/images/squirrel_logo_small_facing_right.png';

    class SignUp extends Component {    
    constructor(props){
        super(props);
  
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            fields: {},
            errors: {}
        }
    }
  
    handleValidation(e) {
        e.preventDefault();

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        // Username validation
        if(!fields["username"]){
            formIsValid = false;
            errors["username"] = "Username cannot be empty";
        }
  
        if(typeof fields["username"] !== "undefined"){
            if(!fields["username"].match(/^(?=.{4,15}$)(?!.*[_]{2})^[a-zA-Z]\w+(?<![_])$/i)){
            formIsValid = false;
            errors["username"] = "Invalid Username";
            }      	
        }
  
        // First name validation
        if(!fields["firstName"]){
            formIsValid = false;
            errors["firstName"] = "First name cannot be empty";
        }
    
        if(typeof fields["firstName"] !== "undefined"){
            if(!fields["firstName"].match(/[a-zA-Z_.-]{2,}/)){
            formIsValid = false;
            errors["firstName"] = "Invalid First Name";
            }      	
        } 
  
        // Last name validation
        if(!fields["lastName"]){
            formIsValid = false;
            errors["lastName"] = "Last name cannot be empty";
        }
    
        if(typeof fields["lastName"] !== "undefined"){
            if(!fields["lastName"].match(/[a-zA-Z_.-]{2,}/)){
            formIsValid = false;
            errors["lastName"] = "Invalid Last Name";
            }      	
        } 
  
        this.setState({errors: errors});
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
                <div className="sign_up_main_container">
                    <img className="signup_logo" src={squirrel}></img>
                    <div className="title">Create an account to start</div>
 
                            	
                    <form name="contactform" className="contactform" onSubmit= {this.handleValidation.bind(this)}>
                        {/* <div className="entry_container">    */}
                            <fieldset>
                                <input className="username_input" ref="username" type="text" size="20" placeholder="Username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                                <div className="error_p">&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">info</i>&nbsp;<b>Username Guidelines:</b>
                                    <ul>
                                        <li>Only letters (a-z), numbers (0-9), and underscores(_)</li>
                                        <li>Must start and end with a letter</li>
                                        <li>Between 4-15 characters long</li>
                                    </ul>
                                </div>
                                <span className="error">{this.state.errors["username"]}</span>
                                <br/>
                                <input ref="firstName" type="text" size="30" placeholder="First Name" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]}/>
                                <span className="error">{this.state.errors["firstName"]}</span>
                                <br/>
                                <input ref="lastName" type="text" size="30" placeholder="Last Name" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]}/>
                                <span className="error">{this.state.errors["lastName"]}</span>
                                <br/>
                            </fieldset>
                         {/* </div> */}
            
                        <fieldset>
                                <button className="letsgo" id="submit" value="Submit">Let's go</button>
                        </fieldset>
                    </form>

                </div>
            </div>
        );
    }
}
  

export default SignUp;
