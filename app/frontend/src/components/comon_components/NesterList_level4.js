import React, { Fragment, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Card, Box } from '@material-ui/core';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InfoIcon from '@material-ui/icons/Info';
import Logo from '../../../media_files/excel.svg';
import GetAppIcon from '@material-ui/icons/GetApp';
import NestedList_CardDisplay from './NestedList_CardDisplay';
import { getFiles, deleteFiles } from '../../actions/files_uploaded'
import { connect } from 'react-redux';

class NestedList_level4 extends Component {

  classes = {
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },

  }

  state = {
    "open1": false,
    "open2": false,
    "open3": false,
    "open4": false,
  }


  Delete = (id) => {
    var txt;
    var r = confirm("Are you sure you want to permenantly delete this data?");
    if (r == true) {
      const delete_id = Object.keys(id)[0]
      this.props.deleteFiles(delete_id)
      txt = `You deleted files with id = ${delete_id}!`;
    } else {
      txt = "You pressed Cancel!";
    } 
  }

  render() {
    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    const handleClick = (id) => {

      const state_id = this.state
      const state_vals = state_id[id]
      if (state_vals === true) {
        state_id[id] = false
        this.setState({ state_id })
      }
      else {
        state_id[id] = true
        this.setState({ state_id })
      }
    };


    const visualise = (id) => {
      let data = document.getElementById(id)
      if (data.style.display === "none") {
        data.style.display = "block"
      }
      else {
        data.style.display = "none"
      }
    }


    const full_dropdown_list = this.props.experiments
    return (
      <div style={{ paddingLeft: "20px" }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader">

          <div className={'row'}>
            <div className={'col-11'}><ListItem button onClick={() => handleClick("open1")} id='level2' >
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.element} />
            {this.state['open1'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            </div><div className="col-1">
            <button id ={"delete_button"} onClick={() => this.Delete(full_dropdown_list)} className="btn btn-danger btn-sm">Delete</button>
            
           </div>
            </div>

          <Collapse in={this.state["open1"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                Object.keys(full_dropdown_list).map(experiment => {
                  
                  return(
                    <Fragment> 
                    <NestedList_CardDisplay all_files={full_dropdown_list[experiment]}/></Fragment>
                  )
                  
                })
              }
            </List>
          </Collapse>
        </List>
      </div>
    );
  }

}


const mapStateToProps = (state /*, ownProps*/) => {
  return {
      
  }
}
const mapDispatchToProps = { deleteFiles }

export default connect(mapStateToProps, mapDispatchToProps)(NestedList_level4)