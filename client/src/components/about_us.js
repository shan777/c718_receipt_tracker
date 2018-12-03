import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import './about_us.css';
import meetTeam from '../assets/images/meet_team.png';
import linkedin_logo from '../assets/images/linkedin_logo.png';
import github_logo from '../assets/images/github_logo.png';
import esther from '../assets/images/esther.png';
import steve from '../assets/images/steve.png';
import kyle from '../assets/images/kyle.png';
import sarah from '../assets/images/sarah.png';
import chase from '../assets/images/chase.png';

class AboutUs extends Component{
    render(){
        return(
            <div className="about_us_container">
            <Link className="info" to="/overview" title="Back to Overview">
                <i className="material-icons back_btn">arrow_back_ios</i>
            </Link>
                <img className="logo_img" src={meetTeam} alt="squirrel logo" />
                <div className="everybody">
                    <div className="frontend">FRONT-END</div>
                    <div className="top_left">
                        <img className=" picture img_left" src={chase}/>
                        <div className="member_name_left">Chase Caine</div>
                        <a className='link_left' href="https://www.linkedin.com/in/chase-caine-2a86b5169/" target="_blank">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_left' href="https://github.com/valor323" target="_blank">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                        <a className='link_center' href="http://www.chasecaine.com" target="_blank">
                            <i className="material-icons">business_center</i>
                        </a>
                    </div>

                    <div className="top_right">
                        <img className=" picture img_right" src={esther}/>
                        <div className="member_name_right">Esther Suh<br/></div>
                        <a className='link_right' href="https://www.linkedin.com/in/esther-suh-8b426015b/" target="_blank">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_right' href="https://github.com/esther2180" target="_blank">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                        <a className='link_center' href="http://www.esthersuh.tech" target="_blank">
                            <i className="material-icons">business_center</i>
                        </a>
                    </div>

                    <div className="member_center">
                        <img className=" picture img_center" src={sarah}/>
                        <div className="member_name_center">Sarah Han</div>
                        <a className='link_center' href="https://www.linkedin.com/in/sarah-han-1120/" target="_blank">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_center' href="https://github.com/shan777" target="_blank">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                        <a className='link_center' href="http://www.sarah-han.me" target="_blank">
                            <i className="material-icons">business_center</i>
                        </a>
                    </div>
                  
                    <div className="backend">BACK-END</div> 
                    <div className="member_bottom_left">
                        <img className=" picture img_left" src={kyle}/>
                        <div className="member_name_left">Kyle Pamintuan</div>
                        <a className='link_right' href="https://www.linkedin.com/in/kylepamintuan/" target="_blank">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_left' href="https://github.com/kylepamintuan" target="_blank">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                        <a className='link_center' href="http://www.kylep.tech" target="_blank">
                            <i className="material-icons">business_center</i>
                        </a>
                    </div>

                    <div className="member_bottom_right">
                        <img className=" picture img_right" src={steve}/>
                        <div className="member_name_right">Steve Benedict</div>
                        <a className='link_right' href="https://www.linkedin.com/in/nebevets/" target="_blank">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_right' href="https://github.com/nebevets" target="_blank">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                        <a className='link_center' href="http://www.stevebenedict.net" target="_blank">
                            <i className="material-icons">business_center</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}


export default AboutUs;