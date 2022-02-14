import React, { Component, Fragment } from 'react'

export default class Dropdown extends Component {


  render() {
    return (<Fragment>
        <div style={{width:'100%'}}>
        <button style={{height:'40px'}}>+</button>
        <select style={{height:'40px'}}>
          <option value="" selected="selected">Select an option...</option>
          <optgroup label="SSC">
            <option value="oranges1">some option1</option>
            <option value="oranges2">some option2</option>
            <option value="oranges3">some option</option>
          </optgroup>
          <optgroup label="GATE">
            <option value="bananas1">some option3</option>
            <option value="bananas2">some option4</option>
            <option value="bananas3">some option5</option>
          </optgroup>
          <optgroup label="BANK PO">
            <option value="apples1">some option6</option>
            <option value="apples2">some option78</option>
            <option value="apples3">some option7</option>
          </optgroup>
          <optgroup label="RAILWAY">
            <option value="grapes1">some option87</option>
            <option value="grapes2">some option56</option>
            <option value="grapes3">some option23</option>
          </optgroup>
        </select>
        <select style={{height:'40px'}}>
            <option value="grapes1" selected="selected">Median</option>
            <option value="grapes2">Standard deviation</option>
            <option value="grapes3">Individual</option>
        </select>
        <select style={{height:'40px'}}>
            <option value="grapes1" selected="selected">bar</option>
            <option value="grapes2">line</option>
        </select>       
        <select style={{height:'40px'}}>
            <option value="grapes1" selected="selected">1</option>
            <option value="grapes2">1,2</option>
        </select>
        <button style={{height:'40px'}}>-</button>
        </div>
        </Fragment>
    )
  }
}
