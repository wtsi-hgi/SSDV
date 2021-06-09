import React, { Component } from 'react'
import { Fragment } from 'react'
import Bullett from '../../../media_files/Asset_1.svg';
import Visualisation_area from './Visualisation_area';

export class Display_Pipeline extends Component {

    state = {
        visualisation_data: false,
        pipe:false
    }

    render() {
        const display =(pipe,pipe_data)=>{
            console.log(pipe_data)
           
            this.setState({visualisation_data:pipe_data, pipe:pipe})

        }


        const Button_Display = () => {
            let data = []
            Object.keys(this.props.pipeline).map(pipe => {

                data.push(<button onClick={() => display(pipe, this.props.pipeline[pipe])} className='pipeline_button' >{pipe}</button>)
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
                   

                    {this.state.visualisation_data?<Visualisation_area pipe_data={this.state.visualisation_data} pipe={this.state.pipe}/>:<Fragment/>}
                </div>
               
            </Fragment>
        )
    }
}

export default Display_Pipeline
