import React, { Component } from 'react';
import Multitype from '../charts/Multitype';

export default class Cumulative_Stats extends Component {
  render() {
    if (this.props.loading){
        return(<h2>Loading ...</h2>)
    }
    else{
        return (<div className="box" style={{marginTop:'40px'}}>
            This is a cummulitive stats analysis to monitor the outliers
            <Multitype type='bar' 
                        />
        </div>)
  }
}
}
