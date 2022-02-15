import React, { Component } from 'react'
import PipePic1 from '../../../media_files/cardinal_data_export_for_ukbiobank1.jpg';
import PipePic from '../../../media_files/cardinal_data_export_for_ukbiobank.jpg';
import img_Fetch1 from '../../../media_files/Fetch_summary.png';
import Fetch2 from '../../../media_files/Fetch2.png';
import Fetch3 from '../../../media_files/Fetch3.png';

import Deconv from '../../../media_files/Deconv.png';

import QC1 from '../../../media_files/QC1.png';
import QC2 from '../../../media_files/QC2.png';
import QC3 from '../../../media_files/QC3.png';
import QC4 from '../../../media_files/QC4.png';

import CT1 from '../../../media_files/CT1.png';

export class Descriptions extends Component {

    render() {

        return (
            <div className="box" style={{marginTop:'40px'}}>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Summary">Summary</h1>
                <p>Plots and data have been generated by YASCP nfCore pipeline <a href={'https://github.com/wtsi-hgi/yascp'}>(https://github.com/wtsi-hgi/yascp)</a> </p>
                <img className={'center'} style={{width:'60%'}} src={PipePic1}/>
                <p>Figure 1: <br/>The experiment will run for 60 days, sequencing 7 pools per day with 12 donors in a pool. 10x produces a raw 10x h5 formated UMI count matrices.
                    We take these raw counts and subject it to Cellbender to remove the background ambient RNA. Further we utilise Cellsnp and Vireo to deconvolute the donors and remove cells that are not confidently mapped to the donors or are doublets. Each day generates a h5ad files for each of the donors which is further subjected to the QC metrics, Clustering analysis and Celltype assesment.<br/><br/>
                </p>
                <img className={'center'} style={{width:'60%'}} src={PipePic}/>
                <p>Figure 2:<br/> The acquired demultiplexed data is subjected to the hard filters and adaptive filters by assessing each cells UMI count quality. These outlier cells are flaggged. Furthermore, we also utilise Azimuth (and other methods currently in assesment) to assess the cell types which can be further subjected to the eQTL analysis.</p>
                </div>

                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Fech pipeline">Fech pipeline </h1>
                    <p>
                        Fech pipeline pulls the Cellranger data of experiments according to list of IDs from lustre to irods. Subsequently a multiple metadata metrics are generated by default which include estimated cell counts, sequencing performance and other. This metadata can be retrieved directly from our scRNA website per run.
                        As part of the sequencing data is processed with <a href={'https://support.10xgenomics.com/single-cell-gene-expression/software/pipelines/latest/what-is-cell-ranger'}>Cell Ranger</a>. This also produces an interactive htmls integrated here in the website.</p>
                        <img className={'center'} style={{width:'60%'}} src={img_Fetch1}/>
                        <p>Cellranger dataset summary: This CSV view displays statistics of the quality of the runs and the mapping efficacy.</p>

                        <img className={'center'} style={{width:'60%'}} src={Fetch3}/>
                        <p>Metadata visualisation: by clicking on the titles of the columns a bar graph visualisation can be generated that provides to be be usefull if comparing in between tranches.</p>

                        <img className={'center'} style={{width:'60%'}} src={Fetch2}/>
                        <p>Cellranger html files: these html files allows users to discover summary statistics and see how well the runs have performed in a t-SNE plots</p>

                </div>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Fech">Cellbender</h1>
                    <p>
                        <a href={'https://github.com/broadinstitute/CellBender'}>Cellbender</a> is used to eliminate technical artefacts from the single cell RNA seq datasets. As part of the pipeline we have addapted the pipeline and use it to remove abbient RNA and random barcode swapping.
                    </p>
                </div>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Deconvolution">Deconvolution</h1>
                    <p>
                        For deconvolution <a href={'https://github.com/single-cell-genetics/cellSNP'}>CellSnp</a> and <a href={'https://github.com/single-cell-genetics/vireo'}>Vireo</a> are used to split the multiplexed donors. The output generates a plots per pool representing donors and shows the number of cells per donor after deconvolution.

                </p>

                        <img className={'center'} style={{width:'80%'}} src={Deconv}/>
                        <p>Deconvolution: Plots generated by Vireo shows how many cells got assigned to each of the donors in pool.</p>


                </div>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="QC metrics">QC Metrics</h1>
                    <p>

                        This QC pipeline, developed almost exclusively by Leland Taylor and Monika Krzak, is the third piece in a trio of pipelines designed to work sequentially in order to ingest (continuous) batches of Cellranger data generated at Sanger (cellranger runs are placed by Sequencing into Irods) for the Cardinal project.</p>
                    <p>
                        <p>
                            This QC pipeline runs on the Sanger LSF farm, on a “batch” of (deconvoluted) single Cell data, which it merges, normalizes, QCs, annotates and clusters in a series of Nextflow tasks, producing numerous plots and output files along the way.
                            The input “batch” must be a set of scRNA data for multiple samples/donors, i.e. a list of individual deconvoluted donors scRNA data (deconvoluted from cellranger experiments(s) by the HGI Vireo deconvolution pipeline).</p>
                    </p>

                    <img className={'center'} style={{width:'40%'}} src={QC1}/>
                    <p>This plot summarises of how many cells are removed by the QC pipeline by showing before and after filtering.</p>

                    <img className={'center'} style={{width:'40%'}} src={QC2}/>
                    <p>Simmilarly we can also see the distributions of the cells that are emoved by pipeline </p>

                    <img className={'center'} style={{width:'40%'}} src={QC3}/>
                    <p>Cummulitive density plot shows clearly if some of the samples in the tranche are underperforming or look very different. </p>

                    <img className={'center'} style={{width:'40%'}} src={QC4}/>
                    <p>If sex of the individuals is provided here we would be able to detect any abnormalities or sample swaps that needs attention.</p>

                </div>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Clustering">Clustering</h1>
                    <p>
                        Clustering pipeline description to go in here

                </p>
                </div>
                <div className={'paragraph_desc'}>
                    <h1 className={'title_description'} id="Cell-type assignment">Cell-type assignment</h1>
                    <p>
                        For the cell type assignment we have currently used Azimuth from <a href={'https://satijalab.org/azimuth/'}>https://satijalab.org/azimuth/</a>. 
                        Azimuth is a web application that uses an annotated reference dataset to automate the processing, analysis, and interpretation of a new single-cell RNA-seq experiment.
                </p>

                <img className={'center'} style={{width:'40%'}} src={CT1}/>
                    <p>Cell-type assignments are performed per pool of individuals using Azimuth.</p>
                </div>

            </div>

        )
    }
}

export default Descriptions
