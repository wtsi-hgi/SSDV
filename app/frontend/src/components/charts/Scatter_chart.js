import React, { Component } from 'react'
import { Bar, Scatter} from 'react-chartjs-2';

export class Scatter_chart extends Component {
    constructor(props){
        super(props)
        this.state= {
            UMAP_Data:this.props.UMAP_Data
        }
    }

    render() {
        const UMAPs = this.state.UMAP_Data.dataset.UMAPs
        const params = this.state.UMAP_Data.dataset.params
        
        let UMAP1 = 0
        let UMAP2 = 1

        let data_scatter=[]
        Object.keys(UMAPs[UMAP1]).map(key1=>{
            data_scatter.push({x:UMAPs[UMAP1][key1],y:UMAPs[UMAP2][key1],label:key1})
        })
        
        const data = {
            
            datasets: [
              {
                label: 'A dataset',
                data: data_scatter,
                backgroundColor: 'rgba(255, 1, 132, 1)',
              },
            ],
          };

        const options = {
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
                ],
            },
            plugins: {tooltips: {

             }}
          
        };


        return (
            <div >
                <Scatter
                data={data}
                width={400}
                height={300}
                options={
                    {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        var label = context.dataset.label || '';
                                        
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.raw.label;
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }

                } 
            />
            </div>
        )
    }
}

export default Scatter_chart
