import React, { Component } from 'react'
import { Fragment } from 'react';
import { Scatter_chart } from '../charts/Scatter_chart';

export class UMAP_handle extends Component {
    state = {
        interactive_UMAP: false,
    }
    
    change_UMAP = () =>{
        if (this.state.interactive_UMAP){
            this.setState({interactive_UMAP:false})
        }else{
            this.setState({interactive_UMAP:true})
        }
        
    }

    render() {

        if (this.state.interactive_UMAP){


            // console.log(this.props.UMAP_Data)
            // alert(this.props.UMAP_Data)
            var elements = document.getElementsByClassName('hideShow')
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }


            return (
                <Fragment >
                    <button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px', backgroundColor: '#9F7FDA' }} onClick={() => this.change_UMAP()}>Static UMAPs</button>
                    <Scatter_chart UMAP_Data={this.props.UMAP_Data}/>
                </Fragment>
            )
        }else{
            var elements = document.getElementsByClassName('hideShow')
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = 'revert';
            }

            return (
                <Fragment >
                    <button className={'btn btn-primary'} style={{ padding: '2px', margin: '2px', backgroundColor: '#9F7FDA' }} onClick={() => this.change_UMAP()}>Interactive UMAP</button>
                </Fragment>
            )
        }
    }
}

export default UMAP_handle
