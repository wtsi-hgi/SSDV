import React, { Component } from 'react'
import { Fragment } from 'react'
import Bullett from '../../../media_files/Asset_1.svg';
import Form from 'react-bootstrap/Form'
import No_Data from '../../../media_files/slash.svg';
import Visualisation_area from './Visualisation_area';

export class Display_Pipeline extends Component {

    state = {
        visualisation_data: false,
        pipe: false,
        id:false,
        fetch_type:null,
        hide_nav:false
    }
    changeState = (state_set) => {
        if (this.state.fetch_type === state_set) {
        this.setState({ fetch_type: null })
    }else{
        this.setState({ fetch_type: state_set })
        }
    }

    render() {
        const display = (pipe, pipe_data, id) => {
            if (this.state.pipe === pipe) {
                this.setState({ visualisation_data: false, pipe: false, id: false,fetch_type:null })
            } else {
                // this.setState({ visualisation_data: false, pipe: false, id: false })
                this.setState({ visualisation_data: pipe_data, pipe: pipe, id: id,fetch_type:null})
            }
        }

        const Button_Display = () => {
            let data = []
            let count = 0
            
            let order_arrangement = {100:'Fetch Pipeline',200:'Cellbender',300:'Deconvolution',400:'QC metrics',500:'Clustering',600:'Cell-type assignment',700:'Summary'}
            let keys = [100,200,300,400,500,600,700]
            Object.keys(this.props.pipeline).map(key1 =>{
                let id;
                if(key1==='Fetch Pipeline'|key1==='Cellbender'|key1==='Deconvolution'|key1==='QC metrics'|key1=='Clustering'|key1==='Cell-type assignment'|key1==='Summary'){
                    id ='Id is default'
                }else if(key1=='Unix_timestamp_modified'){
                    id ='no need for id'
                }else{
                    id = parseInt(key1.split('___')[1])
                    keys.push(id)
                    order_arrangement[id]=key1
                }
            })

            keys.sort(function(a, b) {
                return a - b;
            });

            keys.map(keyr =>  {
                let pipe = order_arrangement[keyr]
                let name_after_split=pipe.split('___')[0]
                try{
                    let len2 = this.props.pipeline[pipe].plots.length
                    let len1 = Object.keys(this.props.pipeline[pipe].sub_dirs).length
                    if (len1 ===0 && len2===0) {
                        data.push(
                            <td className={'pipeline_thread'} id={pipe}><button id={pipe} style={{ color: 'black' }} className='pipeline_button_disabled' disabled>{name_after_split} </button></td>
                        )
                        count += 1
                    }else{
                        if (this.state.id === pipe) {
                            data.push(
                               <td className={'pipeline_thread'} id={pipe}><button id={pipe} style={{ backgroundColor: '#587EB8', color: 'white' }} onClick={() => display(pipe, this.props.pipeline[pipe], pipe)} className='pipeline_button' >{name_after_split}</button></td>
                            )
                        } else {
                            data.push(
                                <td className={'pipeline_thread'} id={pipe}><button id={pipe} style={{ color: 'black' }} onClick={() => display(pipe, this.props.pipeline[pipe], pipe)} className='pipeline_button' >{name_after_split} </button></td>
                            )
                        }
                    }
                }catch{
                    data.push(
                        <td className={'pipeline_thread'} id={pipe}><button id={pipe} style={{ color: 'black' }} className='pipeline_button_disabled' disabled>{name_after_split} </button></td>
                    )
                }
            })
            return data
        }

        const Checkboxes =()=>{
            if (this.props.checked==='not_available'){
                return(
                    <Form.Check style={{margin:'0px',padding:'0px',marginBottom:'-15px'}}
                    type="switch"
                    id={this.props.exp1}
                    label=""
                    disabled
                    onChange={()=>this.props.changeCheckboxState(this.props.exp1)}
                />    
                )
            }else{
                if (this.props.checked){
                    return(
                            <Form.Check style={{margin:'0px',padding:'0px',marginBottom:'-15px'}}
                                type="switch"
                                id={this.props.exp1}
                                label=""
                                checked
                                onChange={()=>this.props.changeCheckboxState(this.props.exp1)}
                            />
                        )
                }else{
                    return(
                            <Form.Check 
                                type="switch"
                                id={this.props.exp1}
                                label=""
                                onChange={()=>this.props.changeCheckboxState(this.props.exp1)}
                            />
                        )               
                }
            }
        }

        return (
            <Fragment>
                <div style={{width:"95%"}}>
                    
                    <div style={{paddingLeft:'15px'}}><h1 style={{ zIndex: 1 }}><Checkboxes/>{this.props.exp1}</h1></div>
                    <div id="container">
                        <div id="infoi">
                            <table >
                                <thread id='th1'>
                                <Button_Display />
                                </thread>
                            </table>
                        </div>
                        <div id="navi">
                        <img className={'bulett'} src={Bullett} alt="React Logo" />
                            
                        </div>
                    </div>
                </div>
                <div>
                        {this.state.visualisation_data ? <Visualisation_area hide_nav={this.props.hide_nav} changeState={this.changeState} pipe_data={this.state.visualisation_data} pipe={this.state.pipe} fetch_type={this.state.fetch_type} /> : <Fragment />}
                    </div>
            </Fragment>
        )
    }
}

export default Display_Pipeline
