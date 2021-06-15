import React, { Component } from 'react'
import { Card, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Document, Page } from 'react-pdf';
import CSV_Display from './CSV_Display';
import InfoLogo from '../../../media_files/Asset_2.svg';
import { Fragment } from 'react';


export class Visualisation_area extends Component {

    state = {
        first_element: this.props.pipe_data[0]
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pipe_data[0] !== this.props.pipe_data[0]) {
            this.setState({ first_element: this.props.pipe_data[0] })
        }
    }


    render() {

        const change_first_element = (file_link) => {
            this.setState({ first_element: file_link })
        }

        const NavLabels = () => {
            let List_of_elements = []
            let count = 0
            this.props.pipe_data.map(file_link => {
                let ext = file_link.split('.')
                let file_name = file_link.split('/')
                ext = ext[ext.length - 1]
                file_name = file_name[file_name.length - 1]
                file_name = file_name.replace('.' + ext, '')

                if (file_name === 'plot_ecdf-x_log10.var=pct_counts_gene_group__mito_transcript.color=experiment_id-adata') {
                    file_name = 'Density Plots'
                }

                file_name = file_name.replaceAll('_', ' ')
                if (this.state.first_element === file_link) {
                    List_of_elements.push(<a className="first_element_scroler" style={{ color: 'red' }}><li className="first_element_scroler">{file_name}</li></a>)
                } else {
                    List_of_elements.push(<a className="first_element_scroler" onClick={() => change_first_element(file_link)}><li className="first_element_scroler">{file_name}</li></a>)
                }

                count += 1
            })
            return (List_of_elements)
        }

        const ShowPlots = () => {
            // this should be able to handle all - csv , png, pdf files

            let data_visiualisations = []
            if (this.props.pipe!=='Fetch Pipeline'){
                data_visiualisations.push(
                    // this is the navigation panel - we do not display this for the Fetch Pipeline
                    <td className={'displayNav'}>
                        <div className={'col'} style={{width:'200px'}}>
                            <a href={`info#${this.props.pipe}`}>
                                <img style={{ width: '20px', height: 'auto' }} src={InfoLogo} alt="i" /> Info
                            </a>
                            
                                <div className={'navArea'}>
                                    <NavLabels />
                                </div>
                           
                        </div>
                    </td>
                )
            }


            let count = 0

            let data_all = this.props.pipe_data
            const first_elem = this.state.first_element
            
            const idx = data_all.indexOf(first_elem)
            const data_set_start = data_all.slice(0,idx)
            const data_set_end = data_all.slice(idx)
            const data_set=data_set_end.concat(data_set_start)
            
            data_set.map(file_link => {
                let col
                let bck_col
                if (count === 0) {
                    col = 'red'
                    bck_col = 'red'
                } else {
                    col = 'black'
                    bck_col = 'white'
                }

                let ext = file_link.split('.')
                let file_name = file_link.split('/')
                ext = ext[ext.length - 1]
                file_name = file_name[file_name.length - 1]
                file_name = file_name.replace('.' + ext, '')

                if (file_name === 'plot_ecdf-x_log10.var=pct_counts_gene_group__mito_transcript.color=experiment_id-adata') {
                    file_name = 'Density Plots'
                }

                file_name = file_name.replaceAll('_', ' ')
                if (ext === 'png' || ext === 'jpeg') {

                    data_visiualisations.push(

                        <td >
                            <div className={"row"}>
                                {/* <div className={'col-1'}>
                                    <a href={`info#${this.props.pipe}`}>
                                        <img style={{ width: '15px', height: 'auto' }} src={InfoLogo} alt="i" />
                                    </a>
                                </div> */}
                                <div className={'col-11'}>
                                    <h2 className='title_cards' style={{ color: col }}>{file_name}</h2>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={'col'}>
                                    <a target="_blank" href={file_link}>
                                        <Card variant="outlined" className={'box'} style={{ "width": 220, height: 250, backgroundColor: bck_col, display: 'flex', justifyContent: 'center' }}>
                                            <img src={file_link} />
                                        </Card>
                                    </a>
                                </div>
                            </div>
                        </td>
                    )
                } else if (ext === 'pdf') {
                    data_visiualisations.push(
                        <td>
                            <div className={"row"}>
                                {/* <div className={'col-1'}>
                                    <a href={`info#${this.props.pipe}`}>
                                        <img style={{ width: '15px', height: 'auto' }} src={InfoLogo} alt="i" />
                                    </a>
                                </div> */}
                                <div className={'col-11'}>
                                    <h2 className='title_cards' style={{ color: col }}>{file_name}</h2>
                                </div>

                            </div>
                            <div className={"row"}>
                                <div className={'col'}>
                                    <a target="_blank" href={file_link}>
                                        <Card variant="outlined" className={'PDF box'} style={{ "width": 220, backgroundColor:bck_col, height: 260, padding: 5 }}>
                                            <Document file={file_link}>
                                                <Page pageNumber={1} width={210} height={210} />
                                            </Document>
                                        </Card>
                                    </a>
                                </div>
                            </div>
                        </td>
                    )
                } else if (ext === 'tsv') {
                    data_visiualisations.push(
                        <Fragment>
                            <CSV_Display pipe={this.props.pipe} link={file_link} />
                        </Fragment>)
                }
                count += 1
            }

            )
            return (
                <table class="table overflowTable" style={{ width: "100%" }}>
                    <thead class="thead-light">
                        <tr>{data_visiualisations}</tr>
                    </thead>
                </table>

            )
        }


        return (

            <div className='VisualisationArea'>
                <div class="container">
                    <div class="row align-items-start">
                        <div className={'col'}>
                            <ShowPlots />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Visualisation_area
