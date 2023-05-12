import React, { Component } from 'react'

export class Experiment_component extends Component {
    render() {
        const Display_Pipeline = ({pipeline}) =>{
            
            let data =[]
            Object.keys(pipeline).map(pipe =>{
                data.push( <button onClick={()=> Display_plots(pipe,pipeline[pipe])} className='pipeline_button' >{pipe}</button>)
            })
  
            return data
        }

        return (
            <Display_Pipeline/>
        )
    }
}

export default Experiment_component
