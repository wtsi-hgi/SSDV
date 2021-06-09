import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import {Provider} from 'react-redux';
import store from '../store';
import Experiment_level from "./layout/Experiment_level";
import Footer from "./layout/Footer";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Fragment>
            <Header/> 
            <div>test</div>
              <div className={"body_content"}>   
              <Experiment_level/>
            </div>
            <Footer/>
        </Fragment>
      </Provider>
    );
  }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'))