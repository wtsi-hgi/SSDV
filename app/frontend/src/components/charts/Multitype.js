import React, { Component } from 'react'
import { Chart,Bar} from 'react-chartjs-2';
import faker from 'faker';

export class Multitype extends Component {

    constructor(props){
        super(props)
        this.state= {
            
            
        }
    }

    render() {
        const typ1='line'
        const typ2= 'bar'
        let labels= ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        let options = {
            responsive: true,
            indexAxis:'y',
            scales: {
                x: {
                  type: 'linear',
                  display: true,
                //   position: 'left',
                },
                x1: {
                  type: 'linear',
                  display: true,
                //   position: 'right',
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                x3: {
                    type: 'linear',
                    display: true,
                    position: 'top',
                  backgroundColor: 'rgba(255, 99, 132,0.3)',
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
              },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Project Cummulitive Stats',
              },
            },
          };
        let data = {
            labels,
            datasets: [
              {
                type: typ1,
                label: 'Dataset 1',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,xAxisID: 'x3',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
              },
              {
                type: typ2,
                label: 'Dataset 2',
                backgroundColor: 'rgb(75, 192, 192)',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'white',
                borderWidth: 2,xAxisID: 'x',
              },
              {
                type: typ2,
                label: 'Dataset 3',
                backgroundColor: 'rgb(53, 162, 235)',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),xAxisID: 'x1',
              },
            ],
          };

        return (
        // 
        <Bar options={options} data={data} />
        )
    }
}

export default Multitype
