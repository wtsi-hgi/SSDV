import React, { Component, Fragment } from 'react'

export default class Dropdown extends Component {


  render() {
    let all_metadata_types={}
    Object.keys(this.props.metadata).map(key1=>{
        let exp1_data = this.props.metadata[key1]
        Object.keys(exp1_data).map(metadata_type1=>{
            // alert(exp1_data[metadata_type1])
            Object.keys(exp1_data[metadata_type1]).map(header=>{
                try{
                    all_metadata_types[metadata_type1].push(header)
                }catch{
                    all_metadata_types[metadata_type1]=[]
                    all_metadata_types[metadata_type1].push(header)
                }
            })
        })
    })
    const change_element =()=>{
        alert('this')
    }

    const Display_Dropdown = ({selection1,id})=>{

        let selection=[]
        const Opt_Group_subentries =({subentries,Data_type})=>{
            let All_subentries =[]
            const unique = [...new Set(subentries)];
            // alert(selection1)   
            unique.map(sub1=>{
                if(sub1===selection1.column){
                    All_subentries.push(<option selected="selected" value={sub1}>{sub1}</option>)
                    selection.push(sub1)
                }else{
                    All_subentries.push(<option value={`${sub1}---${Data_type}`}>{sub1}</option>)
                }  
            })
            if(selection.length===0){
                All_subentries.push(<option selected="selected" value={'null'}>Please select entry ...</option>)
            }
            return(All_subentries)
        }

        let Dropdown_Entries = []
        Object.keys(all_metadata_types).map(Data_type =>{
            Dropdown_Entries.push(
                    <optgroup label={Data_type}> 
                        <Opt_Group_subentries subentries={all_metadata_types[Data_type]} Data_type={Data_type}/>
                    </optgroup>
            )
        })
        return  <select onChange={this.props.handleChange} id={id} style={{height:'40px'}}>{Dropdown_Entries}</select>
    }

    const Disaplay_aggregation_type =({selection1,id})=>{
        let selection_here=[]
        let all_types=[]
        let aggregation_types = ['median','individual','standard deviation','mean']
        aggregation_types.map(typ1=>{
            if(typ1===selection1.agregation_method){
                all_types.push( <option selected="selected" value={typ1}>{typ1}</option>)
                selection_here.push(typ1)
            }else{
                all_types.push( <option value={typ1}>{typ1}</option>)
            }
        })

        let len1=0
        selection_here.map(l1=>{
            if (typeof l1 !== 'undefined'){
                len1+=1
            }
            
        })

        if(len1===0){
            return (
                <Fragment/>
            )
        }else{
            return (
                <select onChange={this.props.handleChangeAggregation} id={id} style={{height:'40px'}}>
                {all_types}
                </select>
            )

        }
    }


    const Add_Axis =({selection1,all_selections,id})=>{
        let selection_here=[]
        let all_types=[]
        let aggregation_types = []
        all_selections.map(sel1=>{
            aggregation_types.push(sel1.axis)
        })
        aggregation_types = [...new Set(aggregation_types)];
        aggregation_types.map(typ1=>{
            if(typ1===selection1.axis){
                all_types.push( <option selected="selected" value={typ1}>{typ1}</option>)
                selection_here.push(typ1)
            }else{
                all_types.push( <option value={typ1}>{typ1}</option>)
            }
        })
        all_types.push( <option value={id}>new..</option>)
        
        let len1=0
        selection_here.map(l1=>{
            if (typeof l1 !== 'undefined'){
                len1+=1
            }
        })

        if(len1===0){
            return (
                <Fragment/>
            )
        }else{
            return (
                <select onChange={this.props.handleChangeAxis} id={id} style={{height:'40px'}}>
                {all_types}
                </select>
            )
        }


    }
    const Display_visualisation_type=({selection1,id})=>{
        let selection_here=[]
        //                         <option value="grapes1" selected="selected">bar</option>
        // <option value="grapes2">line</option>
        let all_types=[]
        let aggregation_types = ['bar','line']
        aggregation_types.map(typ1=>{
            if(typ1===selection1.type){
                all_types.push( <option selected="selected" value={typ1}>{typ1}</option>)
                selection_here.push(typ1)
            }else{
                all_types.push( <option value={typ1}>{typ1}</option>)
            }
        })
        let len1=0
        selection_here.map(l1=>{
            if (typeof l1 !== 'undefined'){
                len1+=1
            }
        })

        if(len1===0){
            return (
                <Fragment/>
            )
        }else{
            return (
            
                <select onChange={this.props.handleChangeType} id={id} style={{height:'40px'}}>
                {all_types}
                </select>
            )
        }
    }


    const Remove_Element =({nr_entries,count,id})=>{
        if(nr_entries==count){
            return <Fragment/>
        }else{
            return(<button style={{height:'40px'}}>-</button>)
        }
        
    }


    const All_Dropdowns =()=>{
        let All_Dropdowns_components=[]
        let count=0
        let nr_entries = this.props.dropdown_selections.length
       
        this.props.dropdown_selections.map(selection1=>{
            count+=1
            All_Dropdowns_components.push(
                <div style={{width:'100%'}}>
                    {count})
                    
                        <Display_Dropdown selection1={selection1} id={count}/>
                        <Disaplay_aggregation_type selection1={selection1} id={count}/>
                        <Display_visualisation_type selection1={selection1} id={count}/>
                        <Add_Axis  selection1={selection1} all_selections={this.props.dropdown_selections} id={count}/>
                        <Remove_Element nr_entries={nr_entries} count={count} id={count}/>
                    
                </div>

            )
        })
        return(All_Dropdowns_components)
    }



    return (<Fragment>
        <All_Dropdowns/>
        </Fragment>
    )
  }
}
