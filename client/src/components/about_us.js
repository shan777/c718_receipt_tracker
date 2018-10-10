import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import './about_us.css';
//import overView from '../assets/images/overViewBlack.png';
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
                <Link to="/overview"><img className="logo_img" src={meetTeam}/></Link>

                <div className="everybody">
                  <div className="frontend">
                  FRONT-END
                    <div className="member left">
                        <img className="img_left" src={chase}/>
                        <div className="member_name_left">Chase Caine</div>
                        <a className='link_left' href="https://www.linkedin.com/in/chase-caine-2a86b5169/">
                        <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_left' href="https://www.linkedin.com/in/chase-caine-2a86b5169/">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                    </div>

                  <div className="member right">
                        <img className="img_right esther" src={esther}/>
                        <div className="member_name_right">Esther Suh</div>
                        <a className='link_right' href="https://www.linkedin.com/in/esther-suh-8b426015b/">
                        <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_right' href="https://www.linkedin.com/in/esther-suh-8b426015b/">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                    </div>

                    <div className="member center">
                        <img className="img_center" src={sarah}/>
                        <div className="member_name_center">Sarah Han</div>
                        <a className='link_center' href="https://www.linkedin.com/sarah-han-1120">
                            <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_center' href="https://www.linkedin.com/in/esther-suh-8b426015b/">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                    </div>
                  </div>
                  <div className="backend">
                  BACK-END
                    <div className="member right">
                        <img className="img_right" src={kyle}/>
                        <div className="member_name_right">Kyle Pamintuan</div>
                        <a className='link_right' href="https://www.linkedin.com/in/kylepamintuan/">
                        <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_right' href="https://www.linkedin.com/in/kylepamintuan/">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                    </div>

                    <div className="member left">
                        <img className="img_left" src={steve}/>
                        <div className="member_name_left">Steve Bennedict</div>
                        <a className='link_left' href="https://www.linkedin.com/in/nebevets/">
                        <img src={linkedin_logo} alt="linkedin logo"></img>
                        </a>
                        <a className='link_left' href="https://www.linkedin.com/in/nebevets/">
                            <img src={github_logo} alt="github logo"></img>
                        </a>
                    </div>
                  </div>  
                </div>
            </div>
        )
    }
}


export default AboutUs;