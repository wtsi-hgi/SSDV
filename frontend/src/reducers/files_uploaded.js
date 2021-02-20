import { GET_FILES, DELETE_FILES } from "../actions/types.js"

const initialState = {
    data_files: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILES:
            return {
                ...state,
                data_files: action.payload
            };
        case DELETE_FILES:
            return {
                ...state,
                data_files: state.data_files.filter(data_file=>
                    parseInt(data_file.id)!==parseInt(action.payload)
                )
            };
        default:
            return state;
    }

}