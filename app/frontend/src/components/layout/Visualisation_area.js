import React, { Component } from 'react'
import { Card, Box } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import CSV_Display from './CSV_Display';
import InfoLogo from '../../../media_files/Asset_2.svg';
import { Fragment } from 'react';
import { Image_to_canvas } from "./Image_to_canvas"

export class Visualisation_area extends Component {

    state = {
        first_element: this.props.pipe_data[0],
        fetch_type: null,

        plot_type_names: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pipe_data[0] !== this.props.pipe_data[0]) {
            this.setState({ first_element: this.props.pipe_data[0],fetch_type: null })
        }
    }

    render() {

        const handle_links = (file_link, file_name) => {
            if (this.state.first_element === file_link) {
                return <a className="first_element_scroler" style={{ color: '#9F7FDA' }}><li className="first_element_scroler">{file_name}</li></a>

            } else {
                return <a className="first_element_scroler" onClick={() => change_first_element(file_link)}><li className="first_element_scroler">{file_name}</li></a>

            }
        }

        const html_handle = (ext, file_link, file_name, col, bck_col) => {
            if (ext === 'html') {
                return (
                    <td >
                        <div className={"row"}>
                            <div className={'col-11'}>
                                <h2 className='title_cards' style={{ color: col }}>{file_name}</h2>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={'col'}>
                                <a target="_blank" href={file_link}>
                                    <div className={'row'} ><button className={'btn btn-light'} style={{ "width": 220, height: '20px', fontSize: '9px' }}>open</button></div>
                                    <div className={'row'}><Card variant="outlined" className={'box'} style={{ "width": 220, height: 250, padding: '0', backgroundColor: bck_col, display: 'flex', justifyContent: 'center' }}>
                                        <Image_to_canvas link={file_link} />
                                    </Card></div>
                                </a>
                            </div>
                        </div>
                    </td>
                )
            } else return null
        }


        const pdf_handle = (ext, file_link, file_name, col, bck_col) => {
            if (ext === 'pdf') {
                return (
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
                                    <Card variant="outlined" className={'PDF box'} style={{ "width": 220, backgroundColor: bck_col, height: 260, padding: 5 }}>
                                        <Document file={file_link}>
                                            <Page pageNumber={1} width={210} height={210} />
                                        </Document>
                                    </Card>
                                </a>
                            </div>
                        </div>
                    </td>
                )
            } else return <Fragment />
        }

        const csv_handle = (ext, file_link, file_name, col, bck_col) => {
            if (ext === 'tsv') {
                return (
                    <Fragment >
                        <CSV_Display pipe={this.props.pipe} link={file_link} />
                    </Fragment>
                )
            } else return null
        }

        const jpg_png_handle = (ext, file_link, file_name, col, bck_col) => {
            if (ext === 'png' || ext === 'jpeg') {
                return (
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
            } else return <Fragment />
        }

        const change_first_element = (file_link) => {
            this.setState({ first_element: file_link })
        }
        const changeState = (state_set) => {

            this.setState({ fetch_type: state_set })
        }

        const Nav = (data) => {


            if (data.length > 1) {


                return (
                    <td className={'displayNav'}>
                        <div className={'col'} style={{ width: '200px' }}>
                            <a href={`info#${this.props.pipe}`}>
                                <img style={{ width: '20px', height: 'auto' }} src={InfoLogo} alt="i" /> Info
                            </a>

                            <div className={'navArea'}>
                                {data}
                            </div>

                        </div>
                    </td>
                )
            }
            else {
                // nav is not required if oly one entry
                return <Fragment />
            }
        }
        const Plot_Types = (plot_types) => {

            let data = []
            if (plot_types) {
                let typ1 = this.state.fetch_type
                plot_types.map(typ => {
                    if (this.state.fetch_type === null) {
                        typ1 = plot_types[0]
                    }

                    if (typ1 === typ) {
                        data.push(<button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px', backgroundColor: '#9F7FDA' }} onClick={() => changeState(typ)}>{typ}</button>)

                    } else {
                        data.push(<button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px' }} onClick={() => changeState(typ)}>{typ}</button>)

                    }
                })

            }
            return (<div>{data}</div>)

        }

        const ShowPlots = ({ plot_types }) => {
            // this should be able to handle all - csv , png, pdf files
            let fech_type = this.state.fetch_type
            if (plot_types) {
                if (!fech_type) {
                    fech_type = plot_types[0]
                }
            }

            let data_visiualisations = []
            let data_types = []
            let List_of_elements = {}
            let List_of_keys = []

            let count = 0

            let data_all = this.props.pipe_data
            const first_elem = this.state.first_element

            const idx = data_all.indexOf(first_elem)
            const data_set_start = data_all.slice(0, idx)
            const data_set_end = data_all.slice(idx)
            const data_set = data_set_end.concat(data_set_start)
            
            let nr_csvs=0
            data_set.map(file_link => {
                let col
                
                
                let bck_col
                if (count === 0) {
                    col = '#9F7FDA'
                    bck_col = '#9F7FDA'
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



                if (this.props.pipe === 'Fetch Pipeline' && fech_type === 'CSV') {
                    let data = csv_handle(ext, file_link, file_name, col, bck_col)
                    if (data) {
                        data_visiualisations.push(data)
                        List_of_elements[file_name] = handle_links(file_link, file_name)
                        List_of_keys.push(file_name)
                        count += 1
                    }
                    

                } else if (this.props.pipe === 'Fetch Pipeline' && fech_type === 'htmls') {
                    let data = html_handle(ext, file_link, file_name, col, bck_col)
                    if (data) {
                        data_visiualisations.push(data)
                        List_of_elements[file_name] = handle_links(file_link, file_name)

                        List_of_keys.push(file_name)
                        count += 1
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'mapping score umap') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'mapping score vln') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'ncells by type') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'prediction score umap') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'prediction score vln') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else if (this.props.pipe === 'Cell-type assignment' && fech_type === 'query umap') {
                    // else if (this.props.pipe === 'Cell-type assignment'){
                    //     plot_types= ['mapping score umap','mapping score vln','ncells by type','prediction score umap','prediction score vln','query umap']
                    // }
                    const typ3=fech_type.replaceAll(' ', '_')


                    if (file_link.includes(typ3)){
                        
                        let data = pdf_handle(ext, file_link, file_name, col, bck_col)
                        if (data) {
                            data_visiualisations.push(data)
                            List_of_elements[file_name] = handle_links(file_link, file_name)

                            List_of_keys.push(file_name)
                            count += 1
                        }
                    }
                }
                else {
                    data_visiualisations.push(html_handle(ext, file_link, file_name, col, bck_col))
                    data_visiualisations.push(jpg_png_handle(ext, file_link, file_name, col, bck_col))
                    data_visiualisations.push(pdf_handle(ext, file_link, file_name, col, bck_col))
                    
                    if (ext==='tsv'){
                        if(nr_csvs>0){
                            
                        }else{
                            
                            data_visiualisations.push(csv_handle(ext, file_link, file_name, col, bck_col))
                        }
                        
                        nr_csvs+=1
                        
                    }
                    
                    List_of_elements[file_name] = handle_links(file_link, file_name)
                    List_of_keys.push(file_name)
                    count += 1
                }


            }

            )
            let List_of_elements2 = []
            List_of_keys.sort().map(key1 => {
                List_of_elements2.push(List_of_elements[key1])
            })

            return (
                <table class="table overflowTable" style={{ width: "100%" }}>
                    <thead class="thead-light">
                        <tr>
                            {Nav(List_of_elements2)}
                            {data_visiualisations}
                        </tr>
                    </thead>
                </table>

            )
        }





        let plot_types = null
        if (this.props.pipe === 'Fetch Pipeline') {
            plot_types = ['CSV', 'htmls']
        } else if (this.props.pipe === 'Cell-type assignment') {
            plot_types = ['mapping score umap', 'mapping score vln', 'ncells by type', 'prediction score umap', 'prediction score vln', 'query umap']
        }

        return (

            <div className='VisualisationArea'>
                {Plot_Types(plot_types)}

                <div class="row align-items-start">
                    <div className={'col'}>
                        <ShowPlots plot_types={plot_types} />
                    </div>

                </div>
            </div>

        )
    }
}

export default Visualisation_area
