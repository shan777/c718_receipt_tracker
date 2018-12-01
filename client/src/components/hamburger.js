import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./hamburger.css";
import axios from 'axios';


class Hamburger extends Component {
	state = {
		signOut: false
	}

	async signOut() {
		const signOutStatus = await axios.post('/api/manageUsers/logout');
		this.props.history.push('/login');
	}

	render() {
		return (
		<div>
			<div>
				<Link to="/overview" className="menu_link"><p><i className="material-icons menu_icons">list_alt</i> Overview</p></Link>
				<Link to="/add_new" className="menu_link"><p><i className="material-icons menu_icons">note_add</i> Add New</p></Link>
				<Link to="/tutorial" className="menu_link"><p><i className="material-icons menu_icons">perm_device_information</i> Tutorial</p></Link>
				<Link to="/about_us" className="menu_link"><p><i className="material-icons menu_icons">group</i> Developers</p></Link>
				<Link to="/tech" className="menu_link"><p><i className="material-icons menu_icons">info</i> About</p></Link>
				<p className="sign_out" onClick={this.signOut.bind(this)}><i className="material-icons menu_icons">exit_to_app</i> Sign Out</p>
			</div>
		</div>
		)
	}
}

export default withRouter(Hamburger);
