import React from 'react';
import Carousel from './index';
import '../../assets/css/app.css';

const App = (props) => (
    <div className="flex-container">
        <Carousel {...props}/>
    </div>
)

export default App;