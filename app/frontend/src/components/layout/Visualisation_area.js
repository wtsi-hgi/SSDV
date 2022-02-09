import React, { Component } from 'react'
import { Card, Box } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import CSV_Display from './CSV_Display';
import InfoLogo from '../../../media_files/Asset_2.svg';
import OpenIcon from '../../../media_files/corner-up-right.svg';
import CloseIcon from '../../../media_files/corner-down-left.svg';
import { Fragment } from 'react';
import { Image_to_canvas } from "./Image_to_canvas"
import { UMAP_handle} from './UMAP_handle'
import axios from 'axios';
import { PREFIX } from '../../actions/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {ShowPlots} from './ShowPlots'


export class Visualisation_area extends Component {

    state = {
        first_element: null,
        fetch_type: null,
        UMAP_Data:false,
        plot_type_names: [],
        loading:true,
        open_close:'open'
    }


    change_first_element = (file_link) => {
        // alert(file_link)
        this.setState({ first_element: file_link })
    }



    handle_links = (file_link, file_name) => {
            
        if (this.state.first_element === file_link) {
            return (<p><a className="first_element_scroler" style={{ color: '#9F7FDA' }}><li className="first_element_scroler">{file_name}</li></a><a href={file_link} download><button type="button" class="btn btn-primary btn-sm" >Download</button></a></p>)

        } else {
            return <a className="first_element_scroler" onClick={() => this.change_first_element(file_link)}><li className="first_element_scroler">{file_name}</li></a>

        }
    }   

    html_handle = (ext, file_link, file_name, col, bck_col) => {
        if (ext === 'html') {
            return (
                <td className={'hideShow'}>
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
        }
    }

    pdf_handle = (ext, file_link, file_name, col, bck_col) => {
        if (ext === 'pdf') {
            return (
                <td className={'hideShow'}>
                    <div className={"row"}>
  
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
        }
    }
 


    json_handle = (ext, file_link, file_name, col, bck_col) => {
        
        if (ext === 'json') {
            if (!this.state.UMAP_Data){
                axios.get(`${PREFIX}/api_scrna/json?link=${file_link}`)
                .then(res1 => {
                const data = res1.data;
                this.setState({'UMAP_Data':data})
                })
            }
            if (this.state.UMAP_Data){
                return(
                    <Fragment>
                        <UMAP_handle UMAP_Data ={this.state.UMAP_Data}/>
                    </Fragment>
                )
            }
            else{
                return(
                    <Fragment>
                        <p>Loading...</p>
                    </Fragment>
                )
            }

        }
    }

    jpg_png_handle = (ext, file_link, file_name, col, bck_col) => {

        if (ext === 'png' || ext === 'jpeg') {
            return (
                <td className={'hideShow'}>
                    <div className={"row"}>
  
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

    SidePannel =(open_close) =>{
        this.setState({'open_close':open_close})
    }

    render() {
        const csv_handle = (ext, file_link, file_name, col, bck_col) => {
            // alert(file_link)
            if (ext === 'tsv') {
                return (
                    <Fragment >
                        <CSV_Display pipe={this.props.pipe} link={file_link} />
                    </Fragment>
                )
            } 
        }

        
        const Nav = (data) => {
            // this is a side bar navigation for when we want to swap things arround.
                if(this.state.open_close==='open'){
                    return (
                        <td className={'displayNav hideShow'}>
                            <div className={'col'} style={{ width: '200px' }}>
                                <a href={`info#${this.props.pipe}`}>
                                    <img style={{ width: '20px', height: 'auto' }} src={InfoLogo} alt="i" /> Info
                                </a>
                                <a onClick={()=>this.SidePannel('close')} style={{float:'right'}}>
                                    <img style={{ width: '20px', height: 'auto' }} src={CloseIcon} alt="i" title='Minimise Side pannel' />
                                </a>
                                <div className={'navArea'}>
                                    {data}
                                </div>
                            </div>
                        </td>
                    )
                }else{
                    return (
                    
                        <div className={'col'} style={{ width: '20px' }}>
                            <a onClick={()=>this.SidePannel('open')} style={{float:'right'}}>
                                <img style={{ width: '20px', height: 'auto' }} src={OpenIcon} alt="i" title='Open Side pannel' />
                            </a>
                 </div>   )             
                }

        
        }
        const Plot_Types = (plot_types,pipeline_data_plots,subdir_data,fech_type) => {
            // this is the nav for the types - such as CSV, Html and other active plot types
            let data = []
            // alert()
            if (plot_types) {
                let typ1 = fech_type
                plot_types.map(typ => {
                    // here check whether there is any elements in the normal plots area, if isnt then should change the fetch_type to first entry.
                    if(pipeline_data_plots.length===0){
                        if (fech_type === null) {
                            typ1 = plot_types[0]
                            fech_type=plot_types[0]
                        }
                    }

                    if (typ1 === typ) {
                        data.push(
                        <button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px', backgroundColor: '#9F7FDA' }} onClick={() => this.props.changeState(typ)}>{typ}</button>
                        )

                    } else {
                        data.push(<button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px' }} onClick={() => this.props.changeState(typ)}>{typ}</button>)
                    }
                })



            }
            return [<div>{data}</div>,fech_type]

        }

        const ShowPlots = (pipeline_data_plots,subdir_data,fech_type) => {

            // this should be able to handle all - csv , png, pdf files
            let nr_csvs=0
            let data_visiualisations = []
            // alert(data_visiualisations)
            let data_types = []
            let List_of_elements = {}
            let List_of_keys = []
            let count = 0
            const first_elem = this.state.first_element
            let data_all;
            if(fech_type!==null){
                data_all = subdir_data[fech_type]
            }else{
                data_all = pipeline_data_plots
            }
            
            const idx = data_all.indexOf(first_elem)
            const data_set_start = data_all.slice(0, idx)
            const data_set_end = data_all.slice(idx)
            const data_set = data_set_end.concat(data_set_start)

            data_set.map(file_link => {
                
                // console.log(data_visiualisations)
                // alert(file_link)
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
                if (ext === 'html') {data_visiualisations.push(this.html_handle(ext, file_link, file_name, col, bck_col))}
                if (ext === 'jpeg'|ext === 'png') {data_visiualisations.push(this.jpg_png_handle(ext, file_link, file_name, col, bck_col))}
                if (ext === 'pdf') {data_visiualisations.push(this.pdf_handle(ext, file_link, file_name, col, bck_col))}
                if (ext==='tsv'|ext==='csv'){
                    if(nr_csvs>0){
                    }else{
                        // data_visiualisations.push()
                        
                        data_visiualisations.push(csv_handle(ext, file_link, file_name, col, bck_col))
                    }
                    nr_csvs+=1
                }
                
                List_of_elements[file_name] = this.handle_links(file_link, file_name)
                List_of_keys.push(file_name)
                count += 1
                
                
            })
            

            
            // here have to check whether the fetch type is set, 
            // 1) if it is, select the subset of plots.
            // 2) if not, check how many sub_sections there is, if just one, then select this as a subtype.
            // 3) If no subsections then select the plots.


            // otherwise

            
            let List_of_elements2 = []
            List_of_keys.sort().map(key1 => {
                List_of_elements2.push(List_of_elements[key1])
            })
            // alert(List_of_elements2)
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
        plot_types=[]
        // this is to account for the previous structure of folders.
        let subdir_data = this.props.pipe_data.sub_dirs
        let pipeline_data_plots = []
        this.props.pipe_data.plots.map(element => {
            // alert(element)
            if (element.includes(('file_metadata.tsv'))) {
                plot_types = plot_types.concat('CSV');
                try {
                    subdir_data['CSV'].push(element)
                }catch{
                    subdir_data['CSV']=[]
                    subdir_data['CSV'].push(element)
                }
                subdir_data['CSV'] = [...new Set(subdir_data['CSV'])];
            }else if(element.includes(('ncells by type').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('ncells by type');
                try {
                    subdir_data['ncells by type'].push(element)
                }catch{
                    subdir_data['ncells by type']=[]
                    subdir_data['ncells by type'].push(element)
                }
                subdir_data['ncells by type'] = [...new Set(subdir_data['ncells by type'])];
            }else if(element.includes(('prediction score umap').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('prediction score umap');
                try {
                    subdir_data['prediction score umap'].push(element)
                }catch{
                    subdir_data['prediction score umap']=[]
                    subdir_data['prediction score umap'].push(element)
                }
                subdir_data['prediction score umap'] = [...new Set(subdir_data['prediction score umap'])];
            }else if(element.includes(('prediction score vln').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('prediction score vln');
                try {
                    subdir_data['prediction score vln'].push(element)
                }catch{
                    subdir_data['prediction score vln']=[]
                    subdir_data['prediction score vln'].push(element)
                }
                subdir_data['prediction score vln'] = [...new Set(subdir_data['prediction score vln'])];
            }else if(element.includes(('query umap').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('query umap');
                try {
                    subdir_data['query umap'].push(element)
                }catch{
                    subdir_data['query umap']=[]
                    subdir_data['query umap'].push(element)
                }
                subdir_data['query umap'] = [...new Set(subdir_data['query umap'])];
            }else if(element.includes(('barcode vs total counts').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('barcode vs total counts');
                try {
                    subdir_data['barcode vs total counts'].push(element)
                }catch{
                    subdir_data['barcode vs total counts']=[]
                    subdir_data['barcode vs total counts'].push(element)
                }
                subdir_data['barcode vs total counts'] = [...new Set(subdir_data['barcode vs total counts'])];
            }else if(element.includes(('cellranger vs cellbender').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('cellranger vs cellbender');
                try {
                    subdir_data['cellranger vs cellbender'].push(element)
                }catch{
                    subdir_data['cellranger vs cellbender']=[]
                    subdir_data['cellranger vs cellbender'].push(element)
                }
                subdir_data['cellranger vs cellbender'] = [...new Set(subdir_data['cellranger vs cellbender'])];
            }else if(element.includes(('difference-boxplot').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('difference-boxplot');
                try {
                    subdir_data['difference-boxplot'].push(element)
                }catch{
                    subdir_data['difference-boxplot']=[]
                    subdir_data['difference-boxplot'].push(element)
                }
                subdir_data['difference-boxplot'] = [...new Set(subdir_data['difference-boxplot'])];
            }else if(element.includes(('ambient signature').replaceAll(' ', '_'))) {
                plot_types = plot_types.concat('ambient signature');
                try {
                    subdir_data['ambient signature'].push(element)
                }catch{
                    subdir_data['ambient signature']=[]
                    subdir_data['ambient signature'].push(element)
                }
                subdir_data['ambient signature'] = [...new Set(subdir_data['ambient signature'])];

            }else{
                pipeline_data_plots.push(element)
            }
        });

        let fech_type = null
        fech_type = this.props.fetch_type
        let plot_subdirs = Object.keys(subdir_data)
        plot_types = plot_types.concat(plot_subdirs);
        plot_types = [...new Set(plot_types)];
        let data;
        [data, fech_type] = Plot_Types(plot_types,pipeline_data_plots,subdir_data,fech_type)
        return (
            
            <div className='VisualisationArea'>
                {data}
                <div class="row align-items-start">
                    <div className={'col'}>
                        {ShowPlots(pipeline_data_plots,subdir_data,fech_type)}
                    </div>

                </div>
            </div>

        )


    }
}

export default Visualisation_area
