import React, { Component } from 'react'
import { Fragment } from 'react';
import Display_Pipeline from './Display_Pipeline';


export class Experiment_level extends Component {

    state={
        experiments:this.props.protein_data.dataset,
        loading:true,
        sort:'Chronological',
        project:null,
        checkBox_values:[]
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
            let data = this.props.protein_data.dataset.all_experiment_data
            // sorting alphabetically
            let Dataset = Object.keys(this.props.protein_data.dataset.all_experiment_data).sort()
            // sorting based on timestamp
            let sortable = [];
            if (this.state.sort==='Chronological'){
                Object.keys(this.props.protein_data.dataset.all_experiment_data).map(key=>{
                    sortable.push([key,this.props.protein_data.dataset.all_experiment_data[key]['Unix_timestamp_modified']]);
                })
                sortable.sort(function(a, b) {
                    return b[1] - a[1] ;
                });
                Dataset=[]
                sortable.map(g=>{
                    Dataset.push(g[0])
                })
            }

            let checkBox_values = this.props.checkBox_values
            // alert(checkBox_values)
            Dataset.map(exp1=>{
                // this loops through each of the checkboxes and determines whether to use this for the cumulitive data generation. 
                // if file is not available the swithch will be disabled at a switched off mode.
                if(checkBox_values.includes(exp1)){
                    g.push(<div className='' style={{width:'99%',paddingLeft:'8px'}}><Display_Pipeline checked={false} changeCheckboxState={this.props.changeCheckboxState} pipeline={this.props.protein_data.dataset.all_experiment_data[exp1]} exp1={exp1}/></div>
                  )
                }
                else{
                    g.push(
                    <div className='ib' style={{width:'99%',paddingLeft:'8px'}}>
                      <Display_Pipeline pipeline={this.props.protein_data.dataset.all_experiment_data[exp1]} checked={true} changeCheckboxState={this.props.changeCheckboxState} exp1={exp1}/></div>
                    )
                }
            })
           return g
        }
        
        if (this.props.loading){
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
