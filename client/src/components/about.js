import React, { Component } from 'react';
import Header from './header';
import './about.css';
import MedSquirrel from '../assets/images/squirrel_logo_med.png';
import HTML from '../assets/images/html.png';
import CSS from '../assets/images/css.png';
import JS from '../assets/images/js.png';
import ReactJS from '../assets/images/react.png';
import MySql from '../assets/images/mySql.png';
import Node from '../assets/images/node.png';


class About extends Component {
    render() {
        return (
            <div>
                <Header title="Technologies" />
                <div className="about_container">
                    <img className="med_logo" src={MedSquirrel} />
                        <div className="tech_container">
                            <img className="html_logo" src={HTML}/>
                            <img className="css_logo" src={CSS}/>
                            <img className="js_logo" src={JS}/>
                            <img className="react_logo" src={ReactJS}/>
                            <img className="mySql_logo" src={MySql}/>
                            <img className="node_logo" src={Node}/>
                        </div>
                </div>
                
                
            </div>
        )
    }
}
export default About;