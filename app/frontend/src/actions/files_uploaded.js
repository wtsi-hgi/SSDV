import axios from "axios";
import {GET_FILES, DELETE_FILES} from "./types";


//Get Files
export const getFiles = () => (dispatch, getState) => {
    alert("getting")
    axios.get('/api_scrna/files/')
        .then(res => {
        dispatch({
            type: GET_FILES,
            payload: res.data
        });

    }).catch(err => console.log(err));
}

// Delet files
export const deleteFiles = (id) => (dispatch, getState) => {
    
    axios.delete(`/api_scrna/files/${id}`)
        .then(res => {
        dispatch({
            type: DELETE_FILES,
            payload: id
        });

    }).catch(err => console.log(err));
}