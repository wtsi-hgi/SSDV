import React, { Component } from 'react'
import { Card, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Document, Page } from 'react-pdf';
import CSV_Display from './CSV_Display';
import InfoLogo from '../../../media_files/Asset_2.svg';
import { Fragment } from 'react';

export class Visualisation_area extends Component {


    render() {
        const ShowPlots = () => {
            // this should be able to handle all - csv , png, pdf files

            let data_visiualisations = []

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
                if (ext === 'png' || ext === 'jpeg') {

                    data_visiualisations.push(
                        <div className={'col'}>
                            <a target="_blank" href={file_link}>
                                <div className={'row'}>
                                    <h2 className='title_cards'>{file_name}</h2>
                                    <div className={'col'}><img style={{ width: '15px', height: 'auto' }} src={InfoLogo} alt="i" /> </div>
                                </div>
                                <Card variant="outlined" className={'box'} style={{ "width": 220, height: 250, backgroundColor: "white", display: 'flex', justifyContent: 'center' }}>
                                    <img src={file_link} />
                                </Card>
                            </a>
                        </div>)
                } else if (ext === 'pdf') {
                    data_visiualisations.push(
                        <div className={'col child'}>

                            <div className={'row'}>
                                <h2 className='title_cards'>{file_name}</h2>
                                <div className={'col'}><img style={{ width: '15px', height: 'auto' }} src={InfoLogo} alt="i" /> </div>
                            </div>


                            <a target="_blank" href={file_link}>
                                <Card variant="outlined" className={'PDF box'} style={{ "width": 220, height: 260, padding: 5 }}>
                                    <Document file={file_link}>
                                        <Page pageNumber={1} width={210} height={210} />
                                    </Document>
                                </Card>
                            </a>
                        </div>
                    )
                } else if (ext === 'tsv') {
                    data_visiualisations.push(
                    <Fragment>
                        <CSV_Display link={file_link} />
                        </Fragment>)
                }
            })
            return (
                data_visiualisations
            )
        }


        return (

            <div className='VisualisationArea'>
                <div class="container">

                    <div class="row align-items-start">
                        <div className={'col'}><a href={`info#${this.props.pipe}`}>
                            <img style={{ width: '20px', height: 'auto' }} src={InfoLogo} alt="i" /> Info</a>
                        </div>
                        <ShowPlots />
                    </div>
                </div>
            </div>

        )
    }
}

export default Visualisation_area
