import React, { Component } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Display_Pipeline from './Display_Pipeline';
import { PREFIX } from '../../actions/types';
export class Experiment_level extends Component {

    state={
        experiments:false,
        loading:true,
        sort:'Chronological'
    }

    componentDidMount() {
        
        axios.get(`${PREFIX}/api_scrna/snippets`)
        .then(res => {
          const protein_data = res.data;
          this.setState({'experiments':protein_data,'loading':false})
        })

    }
    change_state(){
        if(this.state.sort==='Alphabetical'){
            this.setState({sort:'Chronological'})
        }else{
            this.setState({sort:'Alphabetical'})
        }
    }


    render() {

        const Display_plots =()=>{
            // console.log(pipeline)
            let g = [] 
            let data = this.state.experiments.dataset
            // sorting alphabetically
            let Dataset = Object.keys(this.state.experiments.dataset).sort()
            // sorting based on timestamp

            let sortable = [];
            
            if (this.state.sort==='Chronological'){
                Object.keys(this.state.experiments.dataset).map(key=>{
                    sortable.push([key,this.state.experiments.dataset[key]['Unix_timestamp_modified']]);
                })
    
                sortable.sort(function(a, b) {
                    return b[1] - a[1] ;
                });
                Dataset=[]
                sortable.map(g=>{
                    Dataset.push(g[0])
                })
            }

            
            
            Dataset.map(exp1=>{
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
                {this.state.sort==='Alphabetical'?<button onClick={()=>this.change_state()}>Sort Chronologicaly</button>:<button onClick={()=>this.change_state()}>Sort Alphabeticaly</button>}
                <div className="box">
                    <Display_plots/>
                </div>
            </Fragment>)

        }

    }
}

export default Experiment_level
