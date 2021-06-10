import React, { Component } from 'react'
import Papa from 'papaparse';
import { CsvToHtmlTable } from 'react-csv-to-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Fragment } from 'react';
// import ReactHtmlParser from 'react-html-parser'; 

export class CSV_Display extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: false
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
        if (this.state.data) {


            let body = []
            let header = []
            let count = 0
            this.state.data.map(row1 => {

                if (count === 0) {

                    row1.map(td1 => {
                        header.push(<th className='overflowTableCell'>{td1}</th>)
                    })


                } else {
                    let body_row = []
                    row1.map(td1 => {

                        body_row.push(<td scope="col" className='overflowTableCell'>{td1}</td>)
                    })
                    body.push(
                        <tr key={`row_${count}`}>
                            {body_row}
                        </tr>
                    )

                }

                count += 1
            })
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
        } else {
            return (<div>Loading..</div>)
        }

    }
}

export default CSV_Display
