import {
    SET_BEAD,
    SET_BRAND,
    SET_MOUSE_COORDINATES
} from '../actions/uiActions';

const uiReducerDefaultState = {};

function uiReducer(state = uiReducerDefaultState, action) {
    switch (action.type) {
        case SET_BEAD:
            return { ...state, selectedBead: action.selectedBead };
        case SET_BRAND:
            return { ...state, selectedBrand: action.selectedBrand };
        case SET_MOUSE_COORDINATES:
            return { ...state, mouseCoordinates: action.coordinates };
        default:
            return state;
    }
}

export default uiReducer;