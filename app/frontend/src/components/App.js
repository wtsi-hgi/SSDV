import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import {Provider} from 'react-redux';
import store from '../store';
import Experiment_level from "./layout/Experiment_level";
import Footer from "./layout/Footer";
import { pdfjs } from 'react-pdf';
import Descriptions from "./layout/Descriptions";
import { PREFIX } from '../actions/types';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
        <Fragment>
            <Header/> 
            
              <div className={"body_content"}>   
              <Switch>
                <Route exact path={`${PREFIX}/`} component={Experiment_level}/>
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

export default App;

ReactDOM.render(<App/>, document.getElementById('app'))