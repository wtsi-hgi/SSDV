import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFiles, deleteFiles } from '../../actions/files_uploaded'
import { pdfjs } from 'react-pdf';
import NestedList_level1 from '../comon_components/NesterList_level1';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class DisplayFiles extends Component {

    static propTypes = {
        getFiles: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getFiles()
    }



    state = {
        file: null,
        numPages: 0,
        pageNumber: 1
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {

        let filtered_array ={}

        this.props.Files.map(row=>{
            
            // these are top level organisational elements
            const user_group = row.user_grouping
            const timestamp = row.timestamp
            const pipeline = row.pipeline
            const project = row.project
           
            // these are the individual files to be displayed.
            let array_with_files = {
                Deconvolution_File:row["Deconvolution_File"],
                Metadata_CSV:row["Metadata_CSV"],
                Metadata_CellCount:row["Metadata_CellCount"],
                Metadata_PDF:row['Metadata_PDF'],
                QC_metrics_JPGs:row['QC_metrics_JPGs'],
                QC_metrics_PDFs1:row['QC_metrics_PDFs1'],
                
            }

            // Now we create an empty json key if it doesnt exist already and append the list.
            let test;
            filtered_array[project] === undefined ? filtered_array[project]=[]: test=""
            filtered_array[project][user_group] === undefined ? filtered_array[project][user_group]=[] :test=""
            filtered_array[project][user_group][pipeline]  === undefined ? filtered_array[project][user_group][pipeline]=[]:test=""
            filtered_array[project][user_group][pipeline][timestamp]  === undefined ? filtered_array[project][user_group][pipeline][timestamp]=[]:test=""
            filtered_array[project][user_group][pipeline][timestamp][row.id] = array_with_files
        })
        

        return (
            <Fragment>
                <div className="box">
                <table className="table table-striped">
                    <tbody>
                        {Object.keys(filtered_array).map(key => {
                            return (
                                <NestedList_level1 element={key} experiments={filtered_array[key]}/>
                            )
                        })}
                    </tbody>
                </table>
                </div> 
            </Fragment>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        Files: state.files_uploaded.data_files,
    }
}
const mapDispatchToProps = { getFiles, deleteFiles }

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFiles)
