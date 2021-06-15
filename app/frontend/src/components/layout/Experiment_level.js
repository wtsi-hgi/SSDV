import React, { Component } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Display_Pipeline from './Display_Pipeline';
import { PREFIX } from '../../actions/types';
export class Experiment_level extends Component {

    state={
        experiments:false,
        loading:true
    }

    componentDidMount() {
        
        axios.get(`${PREFIX}/api_scrna/snippets`)
        .then(res => {
          const protein_data = res.data;
          this.setState({'experiments':protein_data,'loading':false})
        })
    }

    render() {

        const Display_plots =()=>{
            // console.log(pipeline)
            let g = [] 
            Object.keys(this.state.experiments.dataset).map(exp1=>{
                g.push(<Display_Pipeline pipeline={this.state.experiments.dataset[exp1]} exp1={exp1}/>)
            })
           return g
        }
        


        if (this.state.loading){
            return(<h2>Loading ...</h2>)
        }
        else{
            return (
            <Fragment>
                
                <div className="box">
                    <Display_plots/>
                </div>
            </Fragment>)

        }

    }
}

export default Experiment_level
