import React, { Component } from 'react'
import { Fragment } from 'react'
import Bullett from '../../../media_files/Asset_1.svg';

import Visualisation_area from './Visualisation_area';

export class Display_Pipeline extends Component {

    state = {
        visualisation_data: false,
        pipe: false
    }

    render() {
        const display = (pipe, pipe_data, id) => {
            if (this.state.pipe === pipe) {
                this.setState({ visualisation_data: false, pipe: false, id: false })
            } else {
                this.setState({ visualisation_data: pipe_data, pipe: pipe, id: id })
            }


        }


        const Button_Display = () => {
            let data = []
            let count = 0
            let order = ['Fetch Pipeline', 'Cellbender', 'Deconvolution', 'QC metrics']

            order.map(pipe => {

                if (typeof this.props.pipeline[pipe] !== 'undefined') {


                    if (this.state.id === pipe) {
                        data.push(
                            <button id={pipe} style={{ backgroundColor: '#587EB8', color: 'white', fontWeight: 'bold' }} onClick={() => display(pipe, this.props.pipeline[pipe], pipe)} className='pipeline_button' >{pipe}</button>
                        )
                    } else {
                        data.push(
                                <button id={pipe} style={{ color: 'black' }} onClick={() => display(pipe, this.props.pipeline[pipe], pipe)} className='pipeline_button' >{pipe} </button>
                        )
                    }

                    count += 1
                }
            })
            return data
        }



        return (
            <Fragment>
                <div>
                    <h1 style={{ zIndex: 1 }}>{this.props.exp1}</h1>
                    <div id="container">
                        <div id="infoi">
                            <div>
                                <Button_Display />
                            </div>
                        </div>
                        <div id="navi">
                            <img style={{ width: '100%', height: 'auto' }} src={Bullett} alt="React Logo" />
                        </div>
                    </div>

                    <div>
                        {this.state.visualisation_data ? <Visualisation_area pipe_data={this.state.visualisation_data} pipe={this.state.pipe} /> : <Fragment />}
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Display_Pipeline
