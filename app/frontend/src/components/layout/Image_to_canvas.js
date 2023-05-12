import React, { Component } from 'react'
import Iframe from 'react-iframe'
export class Image_to_canvas extends Component {

    render() {

        return (
            <div style={{ width: '630px', height: '660px' }}>
                <Iframe id={'iframe'} url={this.props.link}
                    width={'540px'}
                    height={'600px'}
                    className="myClassname"
                    display="initial"
                />
            </div>



        )
    }
}

export default Image_to_canvas
