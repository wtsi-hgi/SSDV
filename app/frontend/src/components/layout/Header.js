import React, { Fragment, Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Logo from '../../../media_files/wsi.png';   
import Navbar from './Navbar';

export class Header extends Component {
    render() {

        return (
            <div>
                                {/* Here we add a drop down menu to select different projects */}
                <div className='head_class'><p>Welcome {this.props.user}!</p></div>
                                
                <Jumbotron fluid id="head">    
                   
                <a href="https://www.sanger.ac.uk/">
                    <img width="250px" height="auto"  src={Logo} alt="Logo" style={{display:'flex', justifyContent:'center'}}/></a>
                        <h1 id="website_title">scRNA seq: metadata, stats and visualisations</h1>
                        <Navbar/>
                </Jumbotron>

               
                
                
            </div>
        )
    }
}

export default Header
