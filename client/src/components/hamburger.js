import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";


class Hamburger extends Component {

  render() {
    return (
      <div>
        <div>
          <p><b>Menu</b></p>
          <Link to="/"><p>home</p></Link>
          <Link to="/overview"><p>Overview</p></Link>
          <Link to="/add_new"><p>Add New</p></Link>
          <Link to="/about_us"><p>About us</p></Link>
          <Link to="/login"><p>Sign out</p></Link>
        </div>
      </div>
    )
  }
}

export default Hamburger;