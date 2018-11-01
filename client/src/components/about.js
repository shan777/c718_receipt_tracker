import React, { Component } from 'react';
import Header from './header';
import './about.css';
import HTML from '../assets/images/html.png';
import CSS from '../assets/images/css.png';
import JS from '../assets/images/js.png';
import ReactJS from '../assets/images/react.png';
import MySql from '../assets/images/mySql.png';
import Node from '../assets/images/node.png';
import { Link } from "react-router-dom";


class About extends Component {
    render() {
        return (
            <div>
                <Header title="TECH USED" />
                <div className="about_container">
                    <div className="tech_container">
                        <p>Lists of technologies</p>
                        <div className="app_container_top">
                            <img className="html_logo" src={HTML}/>
                            <img className="css_logo" src={CSS}/>
                        </div>
                        <div className="app_container_center">
                            <img className="js_logo" src={JS}/>
                            <img className="react_logo" src={ReactJS}/>
                        </div>
                        <div className="app_container_bottom">
                            <img className="mySql_logo" src={MySql}/>
                            <img className="node_logo" src={Node}/>
                            <Link to="/overview"><p className="domain">www.squirrelreceipts.com</p></Link>
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}
export default About;