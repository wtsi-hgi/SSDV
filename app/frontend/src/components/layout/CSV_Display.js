import React, { Component } from 'react'
import Papa from 'papaparse';
import { CsvToHtmlTable } from 'react-csv-to-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Fragment } from 'react';
import Barchart from '../charts/Barchart';
// import ReactHtmlParser from 'react-html-parser'; 

export class CSV_Display extends Component {
    labels_not_to_display_in_chart=['experiment_id','sanger_sample_id','irods_cellranger_path']
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            data_for_barchart: false,
            labels_for_barchart:false,
            title_of_barchart:false,
            display_type: 'table'
        };

        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getCsvData(this.props.link);
    }

    async getCsvData(link) {
        let csvData = await this.fetchCsv(link);

        Papa.parse(csvData, {
            complete: this.getData
        });
    }




    getData(result) {
        // we need to find what element of the table we want to use for Chart.js visualisations


        this.setState({ data: result.data });
    }

    fetchCsv(link) {
        return fetch(link).then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }



    render() {
        const return_to_table = () =>{
            this.setState({display_type: 'table'})
        }
        const Show_Barchart = (title_of_barchart) =>{
            // alert(title_of_barchart)
            let result = this.state.data
            const data = result[0]
            const idx = data.indexOf(title_of_barchart)
            const all_data = Object.keys(result)
            let data_for_barchart = []
            let labels_for_barchart = []
            for (let i = 1; i < all_data.length; i++) {

                try {
                    let counts = result[i][idx]
                
                    counts = parseFloat(counts.replace('%',''))
                    data_for_barchart.push(counts)
                    labels_for_barchart.push(result[i][0])
                } catch (error) {
                    
                }

            }
            
            this.setState({            data_for_barchart: data_for_barchart,
                labels_for_barchart:labels_for_barchart,
                title_of_barchart:title_of_barchart,
                display_type: 'barchart'})
        }

        if (this.state.data) {


            let body = []
            let header = []
            let count = 0
            this.state.data.map(row1 => {

                if (count === 0) {
                    row1.map(td1 => {
                        if (this.labels_not_to_display_in_chart.includes(td1)){
                            header.push(<th className='overflowTableCell'>{td1}</th>)
                  
                        }else{
                            header.push(<th className='overflowTableCell'><a className={'first_element_scroler'} onClick={()=>Show_Barchart(td1)}>{td1}</a></th>)
                  
                        }
                          })

                } else {
                    let body_row = []
                    row1.map(td1 => {

                        body_row.push(
                            <td scope="col" className='overflowTableCell'>
                                {td1}
                            </td>
                        )
                    })
                    body.push(
                        <tr key={`row_${count}`}>
                            {body_row}
                        </tr>
                    )

                }

                count += 1
            })

            // <Barchart/>
            if (this.state.display_type === 'table') {
                return (
                    <Fragment>
                        <div><a href={this.props.link}><GetAppIcon /> Download</a></div>
                        <table class="table overflowTable table-striped" style={{ width: "100%" }}>
                            <thead class="thead-light">
                                <tr>{header}</tr>
                            </thead>
                            <tbody>
                                {body}
                            </tbody>

                        </table>
                    </Fragment>
                )
            }else if(this.state.display_type === 'barchart') {
                return (
                    <Fragment>
                        <button onClick={()=>return_to_table()}>Back to table</button>
               <Barchart 
                    data_for_barchart={this.state.data_for_barchart}
                    labels_for_barchart={this.state.labels_for_barchart}
                    title_of_barchart={this.state.title_of_barchart}
                    />
                    </Fragment>
 
                    )
            }


        } else {
            return (<div>Loading..</div>)
        }

    }
}

export default CSV_Display
