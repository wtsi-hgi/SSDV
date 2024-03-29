import React, { Component } from 'react'
import { Fragment } from 'react';
import Display_Pipeline from './Display_Pipeline';


export class Experiment_level extends Component {

    state={
        experiments:this.props.protein_data.dataset,
        loading:true,
        project:null,
        checkBox_values:[]
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
            if (this.props.sort==='Chronological'){
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
                // alert(exp1)
                let available_for_cummulitive_stats=false;
                try{
                    let d = this.props.protein_data.dataset.all_experiment_data[exp1]['Summary']['plots']
                    let substring='Donor_Report.tsv'
 

                    const matches = d.filter(element => {
                        if (element.indexOf(substring) !== -1) {
                          return true;
                        }
                      });
                    if (matches.length>0){
                        available_for_cummulitive_stats=true
                    }else{
                        available_for_cummulitive_stats=false
                    }
                }catch{
                    // Here the Summary files are not available, hence will not be used in aggregation statistics.
                    available_for_cummulitive_stats=false
                }
                
                if (available_for_cummulitive_stats){
                    
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
                }else{
                    g.push(
                        <div className='ib' style={{width:'99%',paddingLeft:'8px'}}>
                          <Display_Pipeline pipeline={this.props.protein_data.dataset.all_experiment_data[exp1]} checked={'not_available'} changeCheckboxState={this.props.changeCheckboxState} exp1={exp1}/></div>
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
                {this.props.sort==='Alphabetical'?<button onClick={()=>this.props.change_state()}>Sort Chronologicaly</button>:<button onClick={()=>this.props.change_state()}>Sort Alphabeticaly</button>}
                <div className="box">
                    <h2>Total cells that pass QC: {this.props.combo_data['Total_Cells_passing_QC']}</h2>
                    <h2>Total UKBB donors:  {this.props.combo_data['UKBB_Donor_DATA_deconvoluted']}/{this.props.combo_data['UKBB_Donor_DATA']}</h2>
                    <h2>Total ELGH donors:  {this.props.combo_data['ELGH_Donor_DATA_deconvoluted']}/{this.props.combo_data['ELGH_Donor_DATA']}</h2>
                    
                    <Display_plots/>
                </div>
            </Fragment>)

        }

    }
}

export default Experiment_level
