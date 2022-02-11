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
    axios.get(`${PREFIX}/api_scrna/snippets?project=${this.state.project}`)
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
    if (this.state.loading){
      return (<Fragment/>)
    }else{
      return (
        <Provider store={store}>
          <Router>
          <Fragment>
              <div id="container">
                <Header/> 
              </div>
              <div style={{float:'right'}}><Project_Selector Change_experiment={this.Change_experiment} protein_data={this.state.protein_data}/></div>
                <div id={"body_content"} className={"body_content"}>   
                <Switch>
                  <Route exact path={`${PREFIX}/`}>
                    <Experiment_level loading={this.state.loading} change_state={this.change_state} sort={this.state.sort} protein_data={this.state.protein_data} 
                      changeCheckboxState={this.changeCheckboxState} checkBox_values={this.state.checkBox_values}
                  /></Route>

                  <Route exact path={`${PREFIX}/Cummulitive_Stats`}>
                    <Cumulative_Stats loading={this.state.loading} sort={this.state.sort} protein_data={this.state.protein_data} 
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

