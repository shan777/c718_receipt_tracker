import React, { Component } from 'react';
import Header from './header';
import './about.css';
import Sqr from '../assets/images/tiny_squirrel.png';
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
                <Header title="ABOUT" />
                <div className="about_container">
                    <p><img className="sqr" src={Sqr} alt="sqr logo"/><b>SquirrelReceipts</b> App was created to help people to manage receipts 
                    by receiving them digitally to this app instead of paper receipts.
                    <br />Our main goal is to eliminate all paper receipts and receive / access all your receipts in this app. 
                    You are also helping the environment by reducing waste and killing less trees! :D
                    </p>
                    <div className="tech_container">
                        <div className="tech_title"><b><u>TECHNOLOGIES USED</u></b></div><br/>
                        <div className="app_container_top">
                            <table>
                                <tbody>
                                    <tr><th colSpan="4">Front-End</th></tr>
                                    <tr>
                                        <td><img className="html_logo imgs" src={HTML}/></td>
                                        <td><img className="css_logo imgs" src={CSS}/></td>
                                        <td><img className="js_logo imgs" src={JS}/></td>
                                        <td><img className="react_logo imgs" src={ReactJS}/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="app_container_bottom">
                            <table>
                                <tbody>
                                    <tr><th colSpan="4">Back-End</th></tr>
                                    <tr>
                                        <td colSpan="2"><img className="mySql_logo imgs" src={MySql}/></td>
                                        <td colSpan="2"><img className="node_logo imgs" src={Node}/></td>
                                    </tr>
                                </tbody>
                            </table>    
                        </div>
                        <Link to="/overview"><div className="domain"><b><i>www.squirrelreceipts.com</i></b></div></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default About;