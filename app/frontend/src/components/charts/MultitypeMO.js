// Multiplot Bar chart designrd and implemented by Matiss Ozols
//this moule has been written by M.Ozols
import React, { Component, Fragment } from 'react';

export default class MultitypeMO extends Component {
    

  render() {
    let labels = this.props.all_labels
   
    let { innerWidth: width, innerHeight: height } = window;
   
    let unique_id=1
    // let width3 = document.getElementById("body_content").getBoundingClientRect().width * 0.9;
    const windowWidth = width*0.96
    const space_between_legends=2
    let gap_between_experments = 10
    const top_offset = 130
    const side_offset=100
    const legend_width=20
    const legend_height=10
    const extra_space_for_axis_start_end =10
    const max_bar_value=windowWidth-200
    const distance_between_labels=15

    let datasets= this.props.datasets
    let distancing_between_bar_groups = 200
    const size_of_multi_axis_square=10
    height=distancing_between_bar_groups*labels.length+(distance_between_labels+150)+top_offset
    const Labels =({labels,distancing_between_bar_groups}) =>{
        // This prop generates all the required props.
        let count=0+top_offset
        let all_labels=[]
        labels.map(label1=>{
            all_labels.push(
                <foreignObject  x={0} y={count} width="100" height={distancing_between_bar_groups}>
                    <div className={"div_label"} width="100" height={distancing_between_bar_groups}><p className={"label_style div_p"} xmlns="http://www.w3.org/1999/xhtml">{label1}</p></div>
                </foreignObject>          
            )
            count+=distancing_between_bar_groups
        })
        return(all_labels)
    }


    const Boxes =({all_bar_backgrounds,distancing_between_bar_groups,offset,popup,extras}) =>{
        // This prop generates all the required props.
        let count=offset
        let all_labels=[]
        Object.keys(all_bar_backgrounds).map(label1=>{
            // alert(label1)
            if(popup){
                let not_normalised_value = all_bar_backgrounds[label1]['label']
                unique_id+=1
                all_labels.push(
                    <Fragment >
                    <g id={`${extras} ${label1}`} onMouseOver={() => showPopup('mypopup',`(${extras}) ${label1}: ${not_normalised_value}`,`${extras} ${label1}`)} onMouseOut={() => hidePopup('mypopup')}>
                        <rect x={side_offset}
                        y={count}
                        width={all_bar_backgrounds[label1]['value']} 
                        height={distancing_between_bar_groups}
                    style={{fill: (all_bar_backgrounds[label1]['color']).replace(')','.7)'), stroke: "black"}}/>
                    </g>
                    </Fragment>             
                )
            }else{
                all_labels.push(
                    <g>
                        <rect x={side_offset}
                        y={count}
                        width={all_bar_backgrounds[label1]['value']} 
                        height={distancing_between_bar_groups}
                    style={{fill: all_bar_backgrounds[label1]['color'], stroke: "black"}}/>
                    </g>             
                )
            }
            count+=distancing_between_bar_groups
        })
        // Now that we have a background we add in each of these boxes the bar chart boxes. - Dependant on the number, they will be thiner or less thin.
        return(all_labels)
    }


    const Lines =(all_bar_backgrounds,offset,popup,extras,line_paths,colors) =>{


        // count elements for each label
        let counts = {}

        Object.keys(all_bar_backgrounds).map(label1=>{

            let label_to_use = label1.split('---')[0]
            let count1=counts[label_to_use]
            if (typeof count1 === 'undefined'){
                count1=0
            }
            count1+=1
            counts[label_to_use]=count1
        })
        // console.log(counts)
        // alert('counts')
        let line_paths2=line_paths
        let colors2=colors
        // This prop generates all the required props.
        let count=offset
        let all_labels=[]
        // alert(offset)
        let count_of_elems={}
        let pos_y
        // let line_path_out=line_path //this should feed in a measurement object
        let color
        Object.keys(all_bar_backgrounds).map(label1=>{

            // here split the all_bar_backgrounds label and use the metric instead of 
            // alert(label1)
            let label_to_use = label1.split('---')[0]
            let nr_elements_line =counts[label_to_use]
            if (typeof count_of_elems[label_to_use] === 'undefined'){
                count_of_elems[label_to_use]=0
            }
            count_of_elems[label_to_use]+=1
            
            if(nr_elements_line===1){
                // only 1 point in this set. Hence place it in the midle.
                pos_y = offset+distancing_between_bar_groups/2
            }else{
                const count_calc = distancing_between_bar_groups/(nr_elements_line+1)
                const count_calc_half =count_calc/2 
                pos_y = offset-count_calc_half+count_of_elems[label_to_use]*count_calc
            }

            let line_path_out=line_paths2[label_to_use]
            if (typeof line_path_out === 'undefined'){
                line_path_out='M'
            }
            try{
                if (typeof colors2[label_to_use] === 'undefined'){
                    colors2[label_to_use]=[]
                }
            }catch{
                colors2[label_to_use]=[]
            }


            line_path_out = line_path_out + `L ${all_bar_backgrounds[label1]['value']+side_offset} ${pos_y}`
            line_paths2[label_to_use]=line_path_out


            color=all_bar_backgrounds[label1]['color']
            colors2[label_to_use].push(color)


            if(popup){
                let not_normalised_value = all_bar_backgrounds[label1]['label']
                unique_id+=1
                // alert(`${label1}: ${not_normalised_value}`)
                all_labels.push(
                    
                    <Fragment >
                    <g id={`${extras} ${label1}`} onMouseOver={() => showPopup('mypopup',`(${extras}) ${label1}: ${not_normalised_value}`,`${extras} ${label1}`)} onMouseOut={() => hidePopup('mypopup')}>
                        
                        <circle cx={all_bar_backgrounds[label1]['value']+side_offset} cy={pos_y} r="4" style={{fill: all_bar_backgrounds[label1]['color']}}/>

                    </g>
                    </Fragment>             
                )
            }else{
                all_labels.push(
                    <g>
                        <circle cx={all_bar_backgrounds[label1]['value']+side_offset} cy={pos_y} r="5" style={{fill: all_bar_backgrounds[label1]['color']}}/>
                    </g>             
                )
            }
            count+=distancing_between_bar_groups
        })

        // Now that we have a background we add in each of these boxes the bar chart boxes. - Dependant on the number, they will be thiner or less thin.
        return({line_dots:all_labels,line_paths2:line_paths2,colors2:colors2 })
    }

    const get_number_of_elements =(all_bar_data,label1)=>{
        let nr_elements=0
        let labels_box =[]
        
        
        Object.keys(all_bar_data).map(key1=>{
            
            // Here we  determine how many in total rectangles will need to display.
            try{
                // console.log(all_bar_data[key1]['data'])
                nr_elements+= Object.keys(all_bar_data[key1]['data'][label1]).length
                labels_box.push(Object.keys(all_bar_data[key1]['data'][label1]))
            }catch{
                nr_elements+= 0
            }

        })
        if(nr_elements===0){
            nr_elements=1
        }
        return {'nr_elements':nr_elements,'labels_box':labels_box}
    }

    const get_number_of_elements_line =(all_bar_data,label1)=>{
        let nr_elements=0
        let labels_box =[]
        
        
        Object.keys(all_bar_data).map(key1=>{
            
            // Here we  determine how many in total rectangles will need to display.
            try{
                // console.log(all_bar_data[key1]['data'])
                nr_elements+= Object.keys(all_bar_data[key1]['data'][label1]).length
                labels_box.push(Object.keys(all_bar_data[key1]['data'][label1]))
            }catch{
                nr_elements+= 0
            }

        })

        return {'nr_elements':nr_elements,'labels_box':labels_box}
    }

    const extract_values_for_label =(all_bar_data,label1,all_bar_backgrounds,all_axis_max) =>{
        let color;

        Object.keys(all_bar_data).map(key1=>{
            color=all_bar_data[key1]['backgroundColor']
            let this_axis_max=all_axis_max[all_bar_data[key1]['xAxisID']]
            let value_norm_factor = (max_bar_value-side_offset)/this_axis_max
            try{
                let keys =  Object.keys(all_bar_data[key1]['data'][label1])
                
                keys.map(label2=>{
                    const value = all_bar_data[key1]['data'][label1][label2]
                    all_bar_backgrounds[label2]={'color':color,'value':value*value_norm_factor,'label':value}
                })
            }catch{
                
            }        

        })
        return all_bar_backgrounds
    }


    const extract_values_for_label_lines =(all_line_data,label1,all_line_vals,all_axis_max) =>{

        let color;
        Object.keys(all_line_data).map(key1=>{
            color=all_line_data[key1]['backgroundColor']
            let this_axis_max=all_axis_max[all_line_data[key1]['xAxisID']]
            let value_norm_factor = (max_bar_value-side_offset)/this_axis_max
            try{
                let keys =  Object.keys(all_line_data[key1]['data'][label1])
                // console.log(keys)
                // console.log(key1)
                // alert('keys')
                keys.map(label2=>{
                    // alert(label2)
                    const value = all_line_data[key1]['data'][label1][label2]
                    all_line_vals[`${key1} ${label2}`]={'color':color,'value':value*value_norm_factor,'label':value}
                })
            }catch{
            }        
        })
        // console.log(all_line_vals)
        // alert('key1')
        return all_line_vals
    }

    const Display_Charts =({all_axis_max,labels,all_line_data,all_bar_data})=>{
        let all_data=[]
        let offset = gap_between_experments/2+top_offset
        let offset_lines = 0+top_offset
        let count_of_labels=0
        // Line paths should be displayed here
        let line_paths={}
        let colors={}
        // line_path = line_path.replace("ML", "M")
        //
        let col
        labels.map(label1=>{
            // this loops through each of the experiments. 

            count_of_labels+=1
            // alert(label1) //here we loop through the labels that are to be displayed in the bar chart.
            const {nr_elements,labels_box} = get_number_of_elements(all_bar_data,label1)
            // const {nr_elements:nr_elements_line ,labels_box:labels_box_line} = get_number_of_elements_line(all_line_data,label1)

            // console.log(all_line_data)
            // Have to get the max value, to scale the bars accordingly.
            // now that we have the donor counts in each of the experiments we can figure out how big the bars should be, by dividing distancing_between_bar_groups/nr_elements
            let bar_width=(distancing_between_bar_groups-gap_between_experments)/nr_elements
            // let line_centroid=(distancing_between_bar_groups-gap_between_experments)/(nr_elements_line+1)
            // alert(line_centroid)
            let all_bar_backgrounds={}
            let all_line_vals={}

            if(labels_box.length>0){
                // alert(labels_box) //Now we loop through each of the donors to get their values
                all_bar_backgrounds = extract_values_for_label(all_bar_data,label1,all_bar_backgrounds,all_axis_max)
                // all_line_vals = extract_values_for_label(all_line_data,label1,all_line_vals,all_axis_max)
            }

            all_data.push( <Boxes all_bar_backgrounds={all_bar_backgrounds} distancing_between_bar_groups={bar_width} offset={offset} popup={true} extras={label1}/>)


            all_line_vals = extract_values_for_label_lines(all_line_data,label1,all_line_vals,all_axis_max)
            // should change this in an array

            const {line_dots,line_paths2,colors2} =Lines(all_line_vals,offset_lines,true,label1,line_paths,colors)
            colors=colors2
            line_paths=line_paths2
            
            all_data.push(line_dots)
            


            offset+=distancing_between_bar_groups
            offset_lines+=distancing_between_bar_groups
        })
        
        Object.keys(line_paths).map(key1=>{
            let line_path=line_paths[key1]

            let col = colors[key1][0]
            line_path = line_path.replace("ML", "M")
            all_data.push(<path d={line_path} stroke-width={2} stroke={col} fill="none"/>)
        })

        return <Fragment>{all_data}</Fragment>
    }

    const prepeare_backgrounds = (labels) =>{
        let all_bar_backgrounds={}
        let switch1=0
        let color;
        labels.map(label1=>{
            if(switch1===0){
                switch1=1
                color='rgba(100,100,50,0.1)'
            }else{
                color='rgba(0,0,0,0.1)'
                switch1=0
            }
            all_bar_backgrounds[label1]={color:color,value:max_bar_value}
        })
        return all_bar_backgrounds
    }

    const data_type_selection =(datasets,type) =>{
        let all_bar_data={}
        datasets.map(data_type=>{

            if(data_type['type']==type){
                data_type['label']=`${data_type['label']} ${data_type['agregation_method']}`
                all_bar_data[`${data_type['label']}`]=data_type
            }
        })
        // console.log(all_bar_data)
        // alert('data_type')
        return all_bar_data
    }

    const get_each_axis_max =(datasets) =>{
        let all_axis_data={}
        let all_axis_colors={}
        let all_labels_and_colors={}
        datasets.map(data_type=>{
            console.log(data_type)
            let axis_id=data_type['xAxisID']
            let label=data_type['label']
            let agregation_method=data_type['agregation_method']
            if(agregation_method!=='individual'){
                label+=` (${agregation_method})`
            }
            try{
                all_axis_colors[axis_id].push(data_type['backgroundColor'])
                all_labels_and_colors[label].push(data_type['backgroundColor'])
            }catch{
                all_axis_colors[axis_id]=[]
                all_labels_and_colors[label]=[]
                all_axis_colors[axis_id].push(data_type['backgroundColor'])
                all_labels_and_colors[label].push(data_type['backgroundColor'])
            }
            
            Object.keys(data_type['data']).map(experiment1=>{
                Object.keys(data_type['data'][experiment1]).map(donor1=>{
                    try{
                        all_axis_data[axis_id].push(data_type['data'][experiment1][donor1])
                    }catch{
                        all_axis_data[axis_id]=[]
                        all_axis_data[axis_id].push(data_type['data'][experiment1][donor1])
                    }
                })
            })
        })
        let all_axis_max = {}
        let all_axis_min = {}
        Object.keys(all_axis_data).map(key1=>{
            const max1 = Math.max(...all_axis_data[key1])
            const min1 = Math.min(...all_axis_data[key1])
            all_axis_max[key1]=max1
            all_axis_min[key1]=min1
        })
        

        return {all_axis_max,all_axis_min,all_axis_colors,all_labels_and_colors}
    }

    const Axis =({where_to_place_labels,all_axis_min,all_axis_max,all_axis_colors})=>{
        let all_visualisations=[]
        let label_count=1
        let label_offset
        Object.keys(all_axis_max).map(key1=>{
            label_offset = distance_between_labels*label_count
            let axis_color
            // here if there are more than 1 axis then add a color indicators
            if(Object.keys(all_axis_max).length>1){
                // now check how many colors is there 
                if(all_axis_colors[key1].length>1){
                    // if more than 1 then add squares
                    let count=0
                    all_axis_colors[key1].map(col1=>{
                        count+=1
                        axis_color=col1
                        all_visualisations.push(<rect x={side_offset-10-5-count*size_of_multi_axis_square}
                            y={where_to_place_labels+label_offset}
                            width={size_of_multi_axis_square} 
                            height={size_of_multi_axis_square}
                        style={{fill: col1, stroke: "black"}}/>)  
                        all_visualisations.push(<line x1={side_offset-extra_space_for_axis_start_end} y1={where_to_place_labels+label_offset+count} x2={max_bar_value+side_offset+extra_space_for_axis_start_end} y2={where_to_place_labels+label_offset+count} stroke={col1} />)    
                    })
                }else{
                    // if 1 then color the actal axis.
                    axis_color=all_axis_colors[key1][0]
                    all_visualisations.push(<line x1={side_offset-extra_space_for_axis_start_end} y1={where_to_place_labels+label_offset} x2={max_bar_value+side_offset+extra_space_for_axis_start_end} y2={where_to_place_labels+label_offset} stroke={all_axis_colors[key1][0]} />)    
                }
            }else{
                axis_color='black'
                all_visualisations.push(<line x1={side_offset-extra_space_for_axis_start_end} y1={where_to_place_labels+label_offset} x2={max_bar_value+side_offset+extra_space_for_axis_start_end} y2={where_to_place_labels+label_offset} stroke="black" />)    
            }
            // Now lets add the increment values
            // alert(key1)
            let max = all_axis_max[key1]
            let min = all_axis_min[key1]

            
            let divider

            let divide_options =[0.5,1,5,10,20,50,100,200,500,1000,2000,5000,10000,20000,50000,100000,200000,500000,1000000,2000000,5000000,10000000,20000000,50000000,100000000,200000000]
            let interval_devision
            for (var i = 0; i < divide_options.length; i++) {
                divider = divide_options[i]
                interval_devision = all_axis_max[key1]/divider
                // alert(interval_devision)
                if (interval_devision > 4 && interval_devision < 17) {
                    break 
                }
            }
            // alert(divider)
            // Make axis in either 0.5s 1s 5s or 10s or 100s
            let value_norm_factor = (max_bar_value-side_offset)/max
            // alert(divider)
            for (var i = 0; i < max+divider; i+=divider) {
                all_visualisations.push(<line x1={i*value_norm_factor+100} y1={where_to_place_labels+label_offset-3} x2={i*value_norm_factor+100} y2={0+top_offset} strokeOpacity="0.3" stroke={axis_color} />)    
                
                all_visualisations.push(<line x1={i*value_norm_factor+100} y1={where_to_place_labels+label_offset-3} x2={i*value_norm_factor+100} y2={where_to_place_labels+label_offset+3} stroke={axis_color} />)    
                all_visualisations.push(
                    <foreignObject  x={i*value_norm_factor+100} y={where_to_place_labels+label_offset-13} width="40" height={'40'}>
                        <div className={"div_label"}><p style={{color:axis_color}} className={"label_style2"} xmlns="http://www.w3.org/1999/xhtml">{i}</p></div>
                    </foreignObject>      
                    // <text
                    //           className={""} x={i*value_norm_factor+100}
                    //           y={where_to_place_labels+label_offset} 
                    //           fontSize={"33"}
                    //     ></text>    
                )
            }
            // alert(`${min} ${max}`)
            label_count+=1

            
        })




        all_visualisations.push(<line x1={side_offset} y1={top_offset} x2={side_offset} y2={where_to_place_labels+label_offset+10} stroke="black" />)
        return all_visualisations
    }

    const Legends = ({all_labels_and_colors})=>{
        let all_visualisations=[]
        let count=0
        Object.keys(all_labels_and_colors).map(label1=>{
            count+=1
            all_visualisations.push(<rect x={side_offset}
                y={20+count*legend_height}
                width={legend_width} 
                height={legend_height-space_between_legends}
            style={{fill: all_labels_and_colors[label1], stroke: "black"}}/>)
            all_visualisations.push(<foreignObject  x={side_offset+legend_width+5} y={count*legend_height} width="500" height={distancing_between_bar_groups}>
            <div width="500" height={"10"}><p className={"label_style div_p"} xmlns="http://www.w3.org/1999/xhtml">{label1}</p></div>
        </foreignObject>  
            )
        })
        return all_visualisations
    }
    const VisualiseData =({labels,distancing_between_bar_groups,datasets})=>{
        let all_visualisations=[]
        const all_bar_backgrounds = prepeare_backgrounds(labels)

        const all_bar_data = data_type_selection(datasets,'bar')
        const all_line_data = data_type_selection(datasets,'line')
        // console.log(all_line_data)
        // alert('all_line_data')
        // Now lets get the max values for each of the axis.
        // lets generate the x-axis

        let {all_axis_max,all_axis_min,all_axis_colors,all_labels_and_colors} = get_each_axis_max(datasets)
        const where_to_place_labels = labels.length*distancing_between_bar_groups
        
        // if axis is more than 1 then add the corresponding label boxes next to it to indicate which datasets corespond
        all_visualisations.push( <Legends all_labels_and_colors={all_labels_and_colors}/>)
        all_visualisations.push( <Labels labels={labels} distancing_between_bar_groups={distancing_between_bar_groups}/>)
        all_visualisations.push( <Boxes all_bar_backgrounds={all_bar_backgrounds} distancing_between_bar_groups={distancing_between_bar_groups} offset={0+top_offset}  popup={false} extras='NA'/>)
        all_visualisations.push( <Display_Charts all_axis_max={all_axis_max} labels={labels} all_line_data={all_line_data} all_bar_data={all_bar_data} distancing_between_bar_groups={distancing_between_bar_groups}/>)
        all_visualisations.push( <Axis where_to_place_labels={where_to_place_labels+top_offset}  all_axis_min={all_axis_min} all_axis_max={all_axis_max} all_axis_colors={all_axis_colors}/>)
        
        return(all_visualisations)
    }

    // For each Family lets dedicate a certain pixel size -400 px
    const showPopup = (e,text,unique_id) => {
        // console.log('show')
        setTimeout(() => { 
            let myicon = document.getElementById(unique_id);
            let mypopup = document.getElementById(e);
            mypopup.innerHTML = `<h3>${text}</h3>`
            let iconPos = myicon.getBoundingClientRect();
            mypopup.style.left = (iconPos.right - 200) + "px";
            mypopup.style.top = (window.scrollY + iconPos.top -20) + "px";
            mypopup.style.display = "block";
        }, 100);

    }
    
    const hidePopup = (e)=> {
        const mypopup = document.getElementById(e);
        mypopup.style.display = "none";
    }

    return  (
        <Fragment>
        <div id="mypopup"/>
        {/* <svg className='fade' width={windowWidth} height={height} */}
        <svg className='fade' width={windowWidth} height={height}
            id={"multichart_visualisation"}>

                    <VisualiseData  labels={labels} distancing_between_bar_groups={distancing_between_bar_groups} datasets={datasets} />

        </svg>
        </Fragment>
    )
   ;
  }
}
