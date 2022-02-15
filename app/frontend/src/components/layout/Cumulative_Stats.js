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
      
      // console.log(copy_display_entries[event.target.id-1])
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
      let Total_Cells_passing_QC=0
      let description = 'Calculated by adding up the Total Cells passing QC in Tranche Report for each of the experiments: '
      // alert(checkBox_values)
      let available_for_cummulitive_stats_data = []
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
                  if(checkBox_values.includes(exp1)){}else{
                    // alert('this2222')
                    available_for_cummulitive_stats_data.push(exp1)
                    const data = protein_data.dataset['metadata'][exp1]['Tranche_Report']['Total Cells passing QC']
                    Total_Cells_passing_QC+=Object.values(data).reduce((partialSum, a) => partialSum + a, 0);
                    description+=` ${exp1},`
                    // alert('this')
                  }
              }else{
                  available_for_cummulitive_stats=false
              }
          }catch{
              // Here the Summary files are not available, hence will not be used in aggregation statistics.
              available_for_cummulitive_stats=false
          }
        }
      )
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
          let data_all_exp1 = {}
          available_for_cummulitive_stats_data.map(exp1=>{
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
            }
  
            // alert(entry1.agregation_method)
            Object.keys(data_in_use).map(key1=>{
              data_all_exp1[exp1][`${data_title}---${key1}`]=data_in_use[key1]
            })
  
            }catch{
              // alert('this dataset is not available for all exp')
            }

  
        })
        
        let f={
          type: entry1.type,
          label: data_title,
          backgroundColor: entry1.color,
          data: data_all_exp1,
          borderColor: 'white',
          borderWidth: 2,
          xAxisID: entry1.axis,
          agregation_method:entry1.agregation_method //can also be set to sum/median/average/stdev
        }
        // console.log(f)
        datasets.push(f)
        }



        // 
        
      //   // data2=protein_data.dataset['metadata'][exp1]['Donor_Report']['Genes detected with counts > 0']
      //   let data2=protein_data.dataset['metadata'][exp1]['Donor_Report']['Median UMIs per cell']

      })

     
      // console.log(datasets)
      // datasets= [
      //   // {
      //   //   type: 'bar',
      //   //   label: 'exp2',
      //   //   borderColor: 'rgb(255, 99, 132)',
      //   //   borderWidth: 2,
      //   //   fill: false,xAxisID: 'x3',
      //   //   data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}]
      //   // },
      //   // {
      //   //   type: 'bar',
      //   //   label: 'Connect_Val',
      //   //   backgroundColor: 'rgb(75, 192, 192)',
      //   //   data: [{id: 'Connect_Val', nested: {value: 1500}}, {id: 'Connect_Val copy', nested: {value: 500}}],
      //   //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //   //   borderColor: 'white',
      //   //   borderWidth: 2,xAxisID: 'x',
      //   // },
      //   {
      //     type: 'line',
      //     label: 'UMIs',
      //     backgroundColor: 'rgb(75, 192, 192)',
      //     data: {'Connect_Val':{'median':197.6}
      //   // },
      //     ,'Deconvolution Experiment2':{'median':82.5}} ,
      //     borderColor: 'white',
      //     borderWidth: 2,
      //     xAxisID: 'x1',
      //   },
      //   {
      //     type: 'bar',
      //     label: 'Celltypes',
      //     backgroundColor: 'rgb(75, 92, 192)',
      //     data: {'Connect_Val':{'Label2 _ Connect_ValDonor 14':1097,'Label2 _Connect_ValDonor 24':239,'Label2 _Connect_ValDonor 43':1229,'Label2 _Connect_ValDonor 48':1335}
      //   // },
      //     ,'Deconvolution Experiment2':{'Deconvolution Experiment2Donor 41':461,'Label2 _Deconvolution Experiment2Donor 42':862}} ,
      //     borderColor: 'white',
      //     borderWidth: 2,
      //     xAxisID: 'x2', //axis and axis color should be the same to dispay them 
      //   },
      //   // {
      //   //   type: 'line',
      //   //   label: 'Number of cells',
      //   //   backgroundColor: 'rgb(175, 92, 192)',
      //   //   data: {'Connect_Val':{'Donor 1':32,'Donor 2':9,'Donor 3':9,'Donor 8':15},'Connect_Val copy':{'Donor 1':52,'Donor 2':93,'Donor 3':92,'Donor 3y':92,'Donor 8':160},'Deconvolution Experiment2':{'Donor 1':41}} ,
      //   //   borderColor: 'white',
      //   //   borderWidth: 2,
      //   //   xAxisID: 'x',
      //   // },

      //   // {
      //   //   type: 'bar',
      //   //   label: 'Connect_Val',
      //   //   backgroundColor: 'rgb(5, 15, 192)',
      //   //   // data: [{id: 'Connect_Val copy', nested: {value: 70}}],
      //   //   data: [{y: 'Connect_Val', x: 6790}],
      //   //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //   //   borderColor: 'white',
      //   //   borderWidth: 2,xAxisID: 'x',
      //   // },

      //   // for line we can lnly set one value
      //   // {
      //   //   type: 'line',
      //   //   label: 'Connect_Val5',
      //   //   // backgroundColor: 'rgb(5, 15, 192)',
      //   //   data: [{y:'Connect_Val', x:20},{y:'Connect_Val', x:50,padding:10},{y:'Connect_Val', x:51,}],
      //   //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //   //   // borderColor: 'red',
      //   //   labelOffset:-14,
      //   //   borderWidth: 2,xAxisID: 'x3',
      //   // },
      //   // {
      //   //   type: 'line',
      //   //   label: 'Connect_Val5',
      //   //   backgroundColor: 'rgb(5, 15, 192)',
      //   //   data: [ {y:'Connect_Val copy', x:10}],
      //   //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //   //   borderColor: 'red',
      //   //   borderWidth: 2,xAxisID: 'x3',
      //   // },

      //   // {
      //   //   type: 'line',
      //   //   label: 'Connect_Val5',
      //   //   backgroundColor: 'rgb(5, 15, 192)',
      //   //   data: [{id: 'Connect_Val', nested: {value: 730}}],
      //   //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //   //   borderColor: 'red',
      //   //   borderWidth: 2,xAxisID: 'x3',
      //   // },
      //   // {
      //   //   type: bar,
      //   //   label: 'Dataset 3',
      //   //   backgroundColor: 'rgb(53, 162, 235)',
      //   //   data: available_for_cummulitive_stats_data.map(() => faker.datatype.number({ min: -1000, max: 1000 })),xAxisID: 'x1',
      //   // },
      // ]
      // console.log(datasets)
      // alert(datasets)


    if (this.props.loading){
        return(<h2>Loading ...</h2>)
    }
    else{
        return (          <div  className="box" id='multichartJS' style={{marginTop:'40px'}}>
        <h2>This is a cummulitive stats analysis to monitor the outliers</h2>
        <h1 title={description}>Totals Cells passing QC for all selected experiments: {Total_Cells_passing_QC}</h1>
        <Dropdown handleChange={this.handleChange} handleDelete={this.handleDelete} handleChangeAxis={this.handleChangeAxis} handleChangeType={this.handleChangeType} handleChangeAggregation={this.handleChangeAggregation} dropdown_selections={this.state.display_entries} metadata={ this.props.protein_data.dataset['metadata']}/>
        <div><MultitypeMO all_labels={available_for_cummulitive_stats_data} datasets={datasets} scales={scales} type='bar' /></div>
        
    </div>)
  }
}
}

