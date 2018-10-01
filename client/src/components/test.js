import React, {Component} from 'react';
import axios from 'axios';

class Test extends Component{
    async componentDidMount(){
        /*
        const response = await axios.get('/api/test');
        console.log('test response: ', response);
        const user = await axios.get('/api/user');
        console.log('user data: ', user);
        */
       const user = {
           email: 'test@mail.com',
           password: 'testpassword'
       };
       const response = await axios.post('/api/login', user);
       console.log('login response is: ', response);
    }
    render(){
        return <h1>API Testing Component</h1>;
    }
}

export default Test;