import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";
import axios from 'axios';


class Hamburger extends Component {
	state = {
		signOut: false
	}

	async signOut() {
		const signOutStatus = await axios.post('/api/manageUsers/logout');
		this.props.push('/login');
	}

	render() {
		return (
		<div>
			<div>
				<p><b>Menu</b></p>
				<Link to="/overview"><p>Overview</p></Link>
				<Link to="/add_new"><p>Add New</p></Link>
				<Link to="/about_us"><p>Meet the team</p></Link>
				<Link to="/tutorial"><p>Tutorial</p></Link>
				<Link to="/tech"><p>About Tech</p></Link>
				<p className="sign_out" onClick={this.signOut.bind(this)}>Sign Out</p>
			</div>
		</div>
		)
	}
}

export default Hamburger;
