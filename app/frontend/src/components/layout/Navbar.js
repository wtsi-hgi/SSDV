import React, { Component, Fragment } from 'react'
import {NavLink} from "react-router-dom";
export class Navbar extends Component {
    render() {
        return (
            <Fragment>
                <div className='nav_bottom'>
                <nav className="navbar-expand-lg navbar-light ">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item opener mr-3">
                                <NavLink className="nav-link NavElement" to={"/"}
                                    activeStyle={{ fontWeight: 'bold', backgroundColor: '#597FBA', color:'white' }}
                                    exact>Home</NavLink>
                            </li>
                            <li className="nav-item opener mr-3">
                                <NavLink className="nav-link NavElement" to={"/info"} 
                                    activeStyle={{ fontWeight: 'bold', backgroundColor: '#597FBA', color:'white' }}
                                    exact>Description</NavLink>
                            </li>
                        </ul></div>
                </nav>
                </div>
            </Fragment>
        )
    }
}

export default Navbar
