import React, { Component } from 'react'
import { Bar, Pie, Line} from 'react-chartjs-2';

export class Barchart extends Component {
    constructor(props){
        super(props)
        this.state= {
            chartData:{
                labels: this.props.labels_for_barchart,
                datasets:[
                  {
                    label:this.props.title_of_barchart,
                    data:this.props.data_for_barchart,
                    backgroundColor:[
                      
                      'rgba(54, 162, 235, 0.6)',

                    ]
                  }
                ]
            }
        }
    }

    render() {
        return (
            <div>
                <Bar
                data={this.state.chartData}
                // width={100}
                height={100}
                // options={{ maintainAspectRatio: false }}
            />
            </div>
        )
    }
}

export default Barchart
