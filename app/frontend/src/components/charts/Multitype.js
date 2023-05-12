import React, { Component } from 'react'
import { Chart,Bar} from 'react-chartjs-2';

export class Multitype extends Component {


    render() {
        const typ1='line'
        const typ2= 'bar'
        let labels= this.props.all_labels
        let datasets= this.props.datasets
        let scales= this.props.scales
        let options = {
            responsive: true,
            indexAxis:'y',
            scales: scales,
            parsing: {
                yAxisKey: 'y',
                xAxisKey: 'x',
                        },

            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            },
            plugins: {
                legend: {
                    display: false
                  },
              title: {
                display: true,
                text: 'Project Cumulative Stats',
              },
            },
          };
        let data = {
            labels,
            datasets: datasets
          };

        return (
        // <Fragment/>
        <Bar options={options} data={data} />
        )
    }
}

export default Multitype
