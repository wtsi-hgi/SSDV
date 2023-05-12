import React, { Component,Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Project_Selector extends Component {
    // This displays all the available projects for a user.

  render() {

    const experiment_in_use = this.props.protein_data.dataset['experiment_in_use']
    let other_available_experiments = this.props.protein_data.dataset['other_available_experiments']
    
    if(other_available_experiments.includes(experiment_in_use)){
        
        const index = other_available_experiments.indexOf(experiment_in_use);
        if (index > -1) {
            other_available_experiments.splice(index, 1); // 2nd parameter means remove one item only
          }
    }

    const DropDown_Menu_Items =(other_available_experiments) =>{
        let dataset = []
        other_available_experiments.map(exp1=>{
            
            dataset.push(<Dropdown.Item onClick={()=>this.props.Change_experiment(exp1)}>{exp1}</Dropdown.Item>)
        })
        return dataset
    }


    return <Fragment>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {experiment_in_use}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {DropDown_Menu_Items(other_available_experiments)}
                    </Dropdown.Menu>
                </Dropdown>

    </Fragment>;
  }
}
