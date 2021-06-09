import React, { Component } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Bullett from '../../../media_files/Asset_1.svg';
import styled from "styled-components";
import File_Visualiser from './File_Visualiser';
import Display_Pipeline from './Display_Pipeline';
export class Experiment_level extends Component {

    state={
        experiments:false,
        loading:true
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api_scrna/snippets`)
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
