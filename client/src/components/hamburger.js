import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";

class Hamburger extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="pages">
          <Link to="/"><h1>home</h1></Link>
          <Link to="/overview"><h1>Overview</h1></Link>
          <Link to="/add_new"><h1>Add New Receipt</h1></Link>
          <Link to="/about_us"><h1>Meet the team</h1></Link>
        </div>
      </div>
    )
  }
}

export default Hamburger;