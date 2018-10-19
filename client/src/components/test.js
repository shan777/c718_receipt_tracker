import React, {Component} from 'react';
import axios from 'axios';

class Test extends Component{
    async componentDidMount(){
       const user = {
           email: 'test@mail.com',
           password: 'testpassword'
       };
       const response = await axios.post('/api/manageUsers/login', user);
    }
    render(){
        return <h1>API Testing Component</h1>;
    }
}

export default Test;