import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import {Provider} from 'react-redux';
import store from '../store';
import Experiment_level from "./layout/Experiment_level";
import Cumulative_Stats from "./layout/Cumulative_Stats";
import Footer from "./layout/Footer";
import { pdfjs } from 'react-pdf';
import Descriptions from "./layout/Descriptions";
import axios from 'axios';
import { PREFIX } from '../actions/types';
import Project_Selector from "./layout/Project_Selector";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// icons are retrieved from https://feathericons.com/


class App extends Component {
  

    state={
      protein_data:false,
      loading:true,
      sort:'Chronological',
      project:null,
      checkBox_values:[]
    }

  changeCheckboxState=(ext1)=>{
      let checkBox_values = [...this.state.checkBox_values];
      if(checkBox_values.includes(ext1)){
          const index = checkBox_values.indexOf(ext1);
          if (index > -1) {
              checkBox_values.splice(index, 1); // 2nd parameter means remove one item only
            }
      }else{
          checkBox_values.push(ext1)
      }
      this.setState({checkBox_values:checkBox_values})
  }
  
  componentDidMount() {      
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let link1;
    if(params.project!== undefined){
      link1 = params.project
    }else{
      link1 = this.state.project
    }

      axios.get(`${PREFIX}/api_scrna/snippets?project=${link1}`)
      .then(res => {
        const protein_data = res.data;
        this.setState({'protein_data':protein_data,'loading':false})
      })

    } 
  
  Change_experiment = (exp1)=>{
    axios.get(`${PREFIX}/api_scrna/snippets?project=${exp1}`)
    .then(res => {
      const protein_data = res.data;
      this.setState({'protein_data':protein_data,'loading':false,'project':exp1})
    })
  }

  change_state=()=>{
    
    if(this.state.sort==='Alphabetical'){
        this.setState({sort:'Chronological'})
    }else{
        this.setState({sort:'Alphabetical'})
    }
  }

  render() {

    const Cumulitive_stats = (checkBox_values,protein_data)=> {

      let Dataset = Object.keys(protein_data.dataset.all_experiment_data).sort()
      let Total_Cells_passing_QC=0
      let UKBB_Donor_DATA=0;
      let UKBB_Donor_DATA_deconvoluted=0;

      let ELGH_Donor_DATA=0;
      let ELGH_Donor_DATA_deconvoluted=0;
      
      let description = 'Calculated by adding up the Total Cells passing QC in Tranche Report for each of the experiments: '
  
      let available_for_cummulitive_stats_data = []

      Dataset.map(exp1=>{
        
          // this loops through each of the checkboxes and determines whether to use this for the cumulitive data generation. 
          // if file is not available the swithch will be disabled at a switched off mode.
          let available_for_cummulitive_stats=false;
          
          try{
              let d = protein_data.dataset.all_experiment_data[exp1]['Summary']['plots']
              let substring='Tranche_Report.tsv'
              const matches = d.filter(element => {
                  if (element.indexOf(substring) !== -1) {
                    return true;
                  }
                });

              if (matches.length>0){
                  available_for_cummulitive_stats=true
                  if(checkBox_values.includes(exp1)){}else{
                    let Tranche_rep_name = matches[0].split('/').at(-1)
                    Tranche_rep_name = Tranche_rep_name.split('.')[0]
               
                    available_for_cummulitive_stats_data.push(exp1)
                    const data = protein_data.dataset['metadata'][exp1]['Tranche_Report']['Total Cells passing QC']
                    Total_Cells_passing_QC+=Object.values(data).reduce((partialSum, a) => partialSum + a, 0);

                    let UKBB_Donor_DATA2 = protein_data.dataset['metadata'][exp1]['Tranche_Report']['UKB donors expected in pool']
                    UKBB_Donor_DATA+=Object.values(UKBB_Donor_DATA2).reduce((partialSum, a) => partialSum + a, 0);
                   
                    UKBB_Donor_DATA2 = protein_data.dataset['metadata'][exp1]['Tranche_Report']['UKB donors deconvoluted in pool']
                    UKBB_Donor_DATA_deconvoluted+=Object.values(UKBB_Donor_DATA2).reduce((partialSum, a) => partialSum + a, 0);

                    UKBB_Donor_DATA2 = protein_data.dataset['metadata'][exp1]['Tranche_Report']['ELGH donors expected in the pool']
                    ELGH_Donor_DATA+=Object.values(UKBB_Donor_DATA2).reduce((partialSum, a) => partialSum + a, 0);

                    UKBB_Donor_DATA2 = protein_data.dataset['metadata'][exp1]['Tranche_Report']['ELGH donors deconvoluted in the pool']
                    ELGH_Donor_DATA_deconvoluted+=Object.values(UKBB_Donor_DATA2).reduce((partialSum, a) => partialSum + a, 0);

                    description+=` ${exp1},`
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
      console.log(UKBB_Donor_DATA)
      
      let combo_data = {'Total_Cells_passing_QC':Total_Cells_passing_QC,
      'UKBB_Donor_DATA':UKBB_Donor_DATA,'UKBB_Donor_DATA_deconvoluted':UKBB_Donor_DATA_deconvoluted,
      'ELGH_Donor_DATA':ELGH_Donor_DATA,'ELGH_Donor_DATA_deconvoluted':ELGH_Donor_DATA_deconvoluted}

      return {available_for_cummulitive_stats_data, description, combo_data}
    
    }
    

    if (this.state.loading){
      return (<Fragment/>)
    }else{

      let {available_for_cummulitive_stats_data, description, combo_data} = Cumulitive_stats(this.state.checkBox_values,this.state.protein_data)
      
      return (
        <Provider store={store}>
          <Router>
          <Fragment>
              <div id="container">
                <Header user={this.state.protein_data.dataset.user}/> 
              </div>
              <div style={{float:'right'}}><Project_Selector Change_experiment={this.Change_experiment} protein_data={this.state.protein_data}/></div>
                <div id={"body_content"} className={"body_content"}>   
                <Switch>
                  <Route exact path={`${PREFIX}/`}>
                    
                    <Experiment_level combo_data={combo_data} loading={this.state.loading} change_state={this.change_state} sort={this.state.sort} protein_data={this.state.protein_data} 
                      changeCheckboxState={this.changeCheckboxState} checkBox_values={this.state.checkBox_values}
                  /></Route>

                  <Route exact path={`${PREFIX}/Cumulative_Stats`}>
                    <Cumulative_Stats available_for_cummulitive_stats_data={available_for_cummulitive_stats_data} description={description} Total_Cells_passing_QC={combo_data['Total_Cells_passing_QC']} loading={this.state.loading} sort={this.state.sort} protein_data={this.state.protein_data} 
                      checkBox_values={this.state.checkBox_values}
                  /></Route>

                  <Route exact path={`${PREFIX}/info`} component={Descriptions}/>
                </Switch>
              </div>
              <Footer/>
          </Fragment>
          </Router>
        </Provider>
      );
    }

  }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'))


// App has been initially written by Matiss Ozols

