import React, { Component } from 'react';
import MultitypeMO from '../charts/MultitypeMO';
import { SketchPicker } from 'react-color';
// import Select from "react-select";
import reactCSS from 'reactcss'
import Dropdown from './Dropdown';
export default class Cumulative_Stats extends Component {
    
  constructor(props) {
      super(props)
      this.divRef = React.createRef()
      this.state = { 
        display_entries: [
        {document:'Donor_Report',column:'Median UMIs per cell',type:'bar',axis:'1',color:'rgb(175, 92, 192)',agregation_method:'individual' },
        {document:'Donor_Report',column:'Nr UMIS mapped to mitochondrial genes',type:'bar',axis:'3',color:'rgb(155, 122, 122)' ,agregation_method:'individual'},
        {document:'Donor_Report',column:'Nr cells passes qc',type:'line',axis:'2',color:'rgb(75, 192, 192)' ,agregation_method:'mean'},
        
        {},
      ],
      colors:[
        'rgba(175, 92, 192)',
        'rgba(75, 192, 192)',
        'rgba(211, 12, 56)',
        'rgba(215, 2, 6)',
        'rgba(215,215,0)',
      ]
    
    
    };
  }


  handleChange = (event) => { 
      const new_Doc = event.target.value.split('---')[1]

      const new_column = event.target.value.split('---')[0]
      let copy_display_entries = [...this.state.display_entries];
  
      if(Object.keys(copy_display_entries[event.target.id-1]).length===0){
        // this is when we are adding a nw entry
        copy_display_entries[event.target.id-1]={document:new_Doc,column:new_column,type:'bar',axis:'1',color:this.state.colors[event.target.id-1] ,agregation_method:'individual'}
        copy_display_entries[event.target.id]={}
      }else{
        copy_display_entries[event.target.id-1].column=new_column
        copy_display_entries[event.target.id-1].document=new_Doc
      }

      this.setState({ display_entries: copy_display_entries });
  };

  handleChangeAggregation = (event) => { 
    const replacement =event.target.value
    let copy_display_entries = [...this.state.display_entries];
    copy_display_entries[event.target.id-1].agregation_method=replacement
    this.setState({ display_entries: copy_display_entries });
  };

  handleDelete = (event) => { 
    // alert(event)
    // const replacement =event.target.value
    let copy_display_entries = [...this.state.display_entries];
    copy_display_entries.splice(event-1, 1);
    // copy_display_entries[event.target.id-1].agregation_method=replacement
    this.setState({ display_entries: copy_display_entries });
  };

  handleChangeAxis = (event) => { 
    // alert('axis change')
    const replacement =event.target.value
    let copy_display_entries = [...this.state.display_entries];
    copy_display_entries[event.target.id-1].axis=replacement

    this.setState({ display_entries: copy_display_entries });
  };

  handleChangeType = (event) => { 
    const replacement =event.target.value
    let copy_display_entries = [...this.state.display_entries];
    copy_display_entries[event.target.id-1].type=replacement
    this.setState({ display_entries: copy_display_entries });
  };

  
  render() {

    
    const styles = reactCSS({
      'default': {
          color: {
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: `rgba(1, 12, 56, 0.6)`,
          },
          swatch: {
              padding: '5px',
              background: '#fff',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
          },
          popover: {
              position: 'absolute',
              zIndex: '2',
          },
          cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
          },
      },
  });
    const median = arr => {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const StandardDeviation = (array)=> {
      const n = array.length
      const mean = array.reduce((a, b) => a + b) / n
      return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }


    const mean =(arr)=>{
      //Find the sum
      var sum = 0;
      for(var i in arr) {
          sum += arr[i];
      }
      //Get the length of the array
      var numbersCnt = arr.length;
      //Return the average / mean.
      return (sum / numbersCnt);
  }
    const typ1='line'
    const typ2= 'bar'
    const protein_data = this.props.protein_data
    let all_available_experiments = Object.keys(protein_data.dataset.all_experiment_data)
    
    // now filter out the experiments where the cummulitive data is not available

    // filter out data where user has deselected the input.

    let available_for_cummulitive_stats_data = this.props.available_for_cummulitive_stats_data
    let description= this.props.description
    let Total_Cells_passing_QC = this.props.Total_Cells_passing_QC
    
      available_for_cummulitive_stats_data = available_for_cummulitive_stats_data.sort()
      let sortable = [];
      if (this.props.sort==='Chronological'){
        available_for_cummulitive_stats_data.map(key=>{
            sortable.push([key,this.props.protein_data.dataset.all_experiment_data[key]['Unix_timestamp_modified']]);
        })
        sortable.sort(function(a, b) {
            return b[1] - a[1] ;
        });
        available_for_cummulitive_stats_data=[]
        sortable.map(g=>{
          available_for_cummulitive_stats_data.push(g[0])
        })
    }
      

      let scales = {
        x: {
          type: 'linear',
          display: true,
        //   position: 'left',
        },
        x1: {
          type: 'linear',
          display: true,
        //   position: 'right',
          grid: {
            drawOnChartArea: false,
          },
        },
        x3: {
            type: 'linear',
            display: true,
            position: 'top',
            backgroundColor: 'rgba(255, 99, 132,0.3)',
            grid: {
              drawOnChartArea: false,
            },
          },
      }
      let datasets=[]
      

      // display_entries: [{document:'Donor_Report',column:'Cell types detected' }]
      
      this.state.display_entries.map(entry1=>{

        if(Object.keys(entry1).length===0){

        }else{
          let data_title=entry1.column
          // alert(data_title)
          
          let data_all_exp1 = {}
          available_for_cummulitive_stats_data.map(exp1=>{
            // alert(exp1)
            try{
            // alert(data_title)
            let data1 = protein_data.dataset['metadata'][exp1][entry1.document][data_title]
            data_all_exp1[exp1]={}
            // here aggregate the data
            let data_in_use={}
            // alert(exp1)
            if(entry1.agregation_method==='median'){
              data_in_use['median']=median(Object.values(data1))
            }else if(entry1.agregation_method==='individual'){
              data_in_use=data1
            }else if(entry1.agregation_method==='mean'){
              data_in_use['mean']=mean(Object.values(data1))
            }else if(entry1.agregation_method==='standard deviation'){
              data_in_use['standard deviation']=StandardDeviation(Object.values(data1))
            }
            
            // alert(entry1.agregation_method)
            Object.keys(data_in_use).map(key1=>{
              // alert(`${entry1.document}:${data_title}---${key1}`)
              data_all_exp1[exp1][`${entry1.document}:${data_title}---${key1}`]=data_in_use[key1]
            })

            }catch{
              // alert('this dataset is not available for all exp')
            }

  
        })
        
        let f={
          type: entry1.type,
          label: `${entry1.document}:${data_title}`,
          backgroundColor: entry1.color,
          data: data_all_exp1,
          borderColor: 'white',
          borderWidth: 2,
          xAxisID: entry1.axis,
          agregation_method:entry1.agregation_method //can also be set to sum/median/average/stdev
        }

        datasets.push(f)
        }


      })

     

    if (this.props.loading){
        return(<h2>Loading ...</h2>)
    }
    else{
        return (          <div  className="box" id='multichartJS' style={{marginTop:'40px'}}>
        <h2>Here you can browse the cumulative stats displayed in Experiments (fetch and summary tabs).</h2>
        <h1 title={description}>Totals Cells passing QC for all selected experiments: {Total_Cells_passing_QC}</h1>
        <Dropdown handleChange={this.handleChange} handleDelete={this.handleDelete} handleChangeAxis={this.handleChangeAxis} handleChangeType={this.handleChangeType} handleChangeAggregation={this.handleChangeAggregation} dropdown_selections={this.state.display_entries} metadata={ this.props.protein_data.dataset['metadata']}/>
        <div><MultitypeMO all_labels={available_for_cummulitive_stats_data} datasets={datasets} scales={scales} type='bar' /></div>
        
    </div>)
  }
}
}

