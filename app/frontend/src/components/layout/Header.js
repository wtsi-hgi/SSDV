import React, { Fragment, Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Logo from '../../../media_files/wsi.png';   
export class Header extends Component {
    render() {

        return (
            <div>
                <Jumbotron fluid  id="header">
                <a href="https://www.sanger.ac.uk/"><img width="250px" height="auto"  src={Logo} alt="Logo" style={{display:'flex', justifyContent:'center'}}/></a>
                        <h1 id="website_title">sceQTLPipeline 2 dataflow: QC metrics and visualisations</h1>
                </Jumbotron>
            </div>
        )
    }
}

export default Header
