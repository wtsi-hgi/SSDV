import React, { Component } from 'react'
import Papa from 'papaparse';
import { Fragment } from 'react';
import Barchart from '../charts/Barchart';


export class CSV_Display extends Component {
    labels_not_to_display_in_chart = ['experiment_id', 'sanger_sample_id', 'irods_cellranger_path',]
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            data_for_barchart: false,
            labels_for_barchart: false,
            title_of_barchart: false,
            display_type: 'table'
        };

        this.getData = this.getData.bind(this);
    }
    componentDidUpdate(prevProps){
        if (prevProps.link !== this.props.link) {
            this.getCsvData(this.props.link);
        }
        
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
        const return_to_table = () => {
            this.setState({ display_type: 'table' })
        }
        const Show_Barchart = (title_of_barchart) => {
            let result = this.state.data
            const data = result[0]
            const idx = data.indexOf(title_of_barchart)
            const all_data = Object.keys(result)
            let data_for_barchart = []
            let labels_for_barchart = []
            for (let i = 1; i < all_data.length; i++) {
                try {
                    let counts = result[i][idx]
                    counts = parseFloat(counts.replace('%', '').replace(',', ''))
                    data_for_barchart.push(counts)
                    labels_for_barchart.push(result[i][0])
                } catch (error) {

                }
            }

            this.setState({
                data_for_barchart: data_for_barchart,
                labels_for_barchart: labels_for_barchart,
                title_of_barchart: title_of_barchart,
                display_type: 'barchart'
            })
        }

        if (this.state.data) {
            let body = []
            let header = []
            let count = 0
            let exclude = []
            let className1 = 'overflowTableCell'
            this.state.data.map(row1 => {
                let row_count = 0
                if (count === 0) {

                    row1.map(td1 => {
                        if (!exclude.includes(row_count)) {
                            if (row_count == 0) { className1 = 'overflowTableCell' }else{className1 = 'overflowTableCell' }
                            if (this.labels_not_to_display_in_chart.includes(td1)) {
                                header.push(<th className={`${className1} sticky`}>{td1}</th>)

                            } else {
                                header.push(<th className={`${className1} sticky`}><a className={'first_element_scroler'} onClick={() => Show_Barchart(td1)}>{td1}</a></th>)
                            }
                        }
                        row_count += 1
                    })

                } else {
                    let body_row = []

                    row1.map(td1 => {
                        if (!exclude.includes(row_count)) {
                            if (row_count == 0) { className1 = 'overflowTableCell1' }else{className1 = 'overflowTableCell' }

                            body_row.push(
                                <td scope="col" className={className1}>
                                    {td1}
                                </td>
                            )
                        }
                        row_count += 1
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
                        <p>Click on the header to visualise bar chart!</p>
                        <table class="table table-striped" style={{ width: "100%" }}>
                            <thead class="thead-light">
                                <tr id={'csv_head'}>{header}</tr>
                            </thead>
                            <tbody>
                                {body}
                            </tbody>

                        </table>
                    </Fragment>
                )
            } else if (this.state.display_type === 'barchart') {
                return (
                    <Fragment>
                        <button onClick={() => return_to_table()}>Back to table</button>
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
