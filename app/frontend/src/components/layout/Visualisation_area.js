import React, { Component } from 'react'

export class Visualisation_area extends Component {



    render() {
        const ShowPlots = () =>{
            // this should be able to handle all - csv , png, pdf files
            
            let data_visiualisations =[]

            this.props.pipe_data.map(file_link =>{
                // alert(file_link)
                data_visiualisations.push(<div>{file_link}
                <img src={'../../../media_files/excel.png'}/>
                </div>)
            })
            return (
                data_visiualisations
            )

        }


        return (
            <div>
                <div className='VisualisationArea'>
                    <ShowPlots/>
                </div>
            </div>
        )
    }
}

export default Visualisation_area
