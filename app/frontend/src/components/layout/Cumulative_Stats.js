import React, { Component } from 'react';
import MultitypeMO from '../charts/MultitypeMO';
import faker from 'faker';
import { useRef, useEffect } from 'react';

export default class Cumulative_Stats extends Component {
    
  constructor(props) {
      super(props)
      this.divRef = React.createRef()
  }

  // componentDidMount() {
  //     const styles = getComputedStyle(this.divRef.current)

  //     console.log(styles.color) // rgb(0, 0, 0)
  //     console.log(styles.width) // 976px
  // }


  render() {
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
                    available_for_cummulitive_stats_data.push(exp1)

                    // here get the needed metadata

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
      // let datasets=[]

      // available_for_cummulitive_stats_data.map(exp1=>{
      //   let data1 = protein_data.dataset['metadata'][exp1]['Donor_Report']['Cell types detected']
      //   // console.log(data1)
      //   let data_input = []
      //   Object.keys(data1).map(key1=>{
      //     let f ={
      //       type: 'bar',
      //       label: 'Connect_Val5',
      //       backgroundColor: 'rgb(5, 15, 192)',
      //       data: [ {y:exp1, x:data1[key1]}],
      //       // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
      //       borderColor: 'red',
      //       borderWidth: 2,xAxisID: 'x3',
      //     }

      //     datasets.push(f)
      //     // alert(key1)
      //     // data_input.push(data1[key1])
      //   })
        

        
      //   // data2=protein_data.dataset['metadata'][exp1]['Donor_Report']['Genes detected with counts > 0']
      //   let data2=protein_data.dataset['metadata'][exp1]['Donor_Report']['Median UMIs per cell']

      // })


      let datasets= [
        // {
        //   type: 'bar',
        //   label: 'exp2',
        //   borderColor: 'rgb(255, 99, 132)',
        //   borderWidth: 2,
        //   fill: false,xAxisID: 'x3',
        //   data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}]
        // },
        // {
        //   type: 'bar',
        //   label: 'Connect_Val',
        //   backgroundColor: 'rgb(75, 192, 192)',
        //   data: [{id: 'Connect_Val', nested: {value: 1500}}, {id: 'Connect_Val copy', nested: {value: 500}}],
        //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
        //   borderColor: 'white',
        //   borderWidth: 2,xAxisID: 'x',
        // },
        // {
        //   type: 'bar',
        //   label: 'UMIs',
        //   backgroundColor: 'rgb(75, 192, 192)',
        //   data: {'Connect_Val':{'Label1 Connect_ValDonor 1':7,'Label1 Connect_ValDonor 2':89,'Label1 Connect_ValDonor 3':99}
        //   // },

        //   ,'Deconvolution Experiment2':{'Label1 Deconvolution Experiment2Donor 1':4,'Label1 Deconvolution Experiment2Donor 2':8,'Label1 Deconvolution Experiment2Donor 3':50}} ,
        //   borderColor: 'white',
        //   borderWidth: 2,
        //   xAxisID: 'x1',
        // },
        // {
        //   type: 'bar',
        //   label: 'Celltypes',
        //   backgroundColor: 'rgb(75, 92, 192)',
        //   data: {'Connect_Val':{'Label2 _ Connect_ValDonor 1':17,'Label2 _Connect_ValDonor 2':9,'Label2 _Connect_ValDonor 3':9,'Label2 _Connect_ValDonor 8':15}
        // // },
        //   ,'Deconvolution Experiment2':{'Deconvolution Experiment2Donor 1':41,'Label2 _Deconvolution Experiment2Donor 2':82}} ,
        //   borderColor: 'white',
        //   borderWidth: 2,
        //   xAxisID: 'x2', //axis and axis color should be the same to dispay them 
        // },
        {
          type: 'line',
          label: 'Number of cells',
          backgroundColor: 'rgb(175, 92, 192)',
          data: {'Connect_Val':{'Donor 1':32,'Donor 2':9,'Donor 3':9,'Donor 8':15},'Connect_Val copy':{'Donor 1':52,'Donor 2':93,'Donor 3':92,'Donor 8':160},'Deconvolution Experiment2':{'Donor 1':41}} ,
          borderColor: 'white',
          borderWidth: 2,
          xAxisID: 'x',
        },

        // {
        //   type: 'bar',
        //   label: 'Connect_Val',
        //   backgroundColor: 'rgb(5, 15, 192)',
        //   // data: [{id: 'Connect_Val copy', nested: {value: 70}}],
        //   data: [{y: 'Connect_Val', x: 6790}],
        //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
        //   borderColor: 'white',
        //   borderWidth: 2,xAxisID: 'x',
        // },

        // for line we can lnly set one value
        // {
        //   type: 'line',
        //   label: 'Connect_Val5',
        //   // backgroundColor: 'rgb(5, 15, 192)',
        //   data: [{y:'Connect_Val', x:20},{y:'Connect_Val', x:50,padding:10},{y:'Connect_Val', x:51,}],
        //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
        //   // borderColor: 'red',
        //   labelOffset:-14,
        //   borderWidth: 2,xAxisID: 'x3',
        // },
        // {
        //   type: 'line',
        //   label: 'Connect_Val5',
        //   backgroundColor: 'rgb(5, 15, 192)',
        //   data: [ {y:'Connect_Val copy', x:10}],
        //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
        //   borderColor: 'red',
        //   borderWidth: 2,xAxisID: 'x3',
        // },

        // {
        //   type: 'line',
        //   label: 'Connect_Val5',
        //   backgroundColor: 'rgb(5, 15, 192)',
        //   data: [{id: 'Connect_Val', nested: {value: 730}}],
        //   // data: [{x:'Connect_Val', y:20}, {x:'Connect_Val copy', y:10}],
        //   borderColor: 'red',
        //   borderWidth: 2,xAxisID: 'x3',
        // },
        // {
        //   type: bar,
        //   label: 'Dataset 3',
        //   backgroundColor: 'rgb(53, 162, 235)',
        //   data: available_for_cummulitive_stats_data.map(() => faker.datatype.number({ min: -1000, max: 1000 })),xAxisID: 'x1',
        // },
      ]



    if (this.props.loading){
        return(<h2>Loading ...</h2>)
    }
    else{
        return (          <div  className="box" id='multichartJS' style={{marginTop:'40px'}}>
        <h2>This is a cummulitive stats analysis to monitor the outliers</h2>
        
        <div><MultitypeMO all_labels={available_for_cummulitive_stats_data} datasets={datasets} scales={scales} type='bar' /></div>
        
    </div>)
  }
}
}
