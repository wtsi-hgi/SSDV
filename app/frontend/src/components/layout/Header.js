import React, { Fragment, Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Logo from '../../../media_files/wsi.png';   
import Navbar from './Navbar';
export class Header extends Component {
    render() {

        return (
            <div>
                <div >
                <Jumbotron fluid id="head">
                <a href="https://www.sanger.ac.uk/"><img width="250px" height="auto"  src={Logo} alt="Logo" style={{display:'flex', justifyContent:'center'}}/></a>
                        <h1 id="website_title">scRNA seq: metadata stats and visualisations</h1>
                        <Navbar/>
                </Jumbotron>
                
                </div>
                
                
            </div>
        )
    }
}

export default Header
