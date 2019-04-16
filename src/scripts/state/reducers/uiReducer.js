import {
  SET_BEAD,
  SET_BRAND,
  SET_TOOL,
  SET_MOUSE_COORDINATES,
} from '../actions/uiActions';
import tools from '../tools';

const uiReducerDefaultState = {
  selectedTool: tools.PENCIL,
};

function uiReducer(state = uiReducerDefaultState, action) {
  switch (action.type) {
    case SET_BEAD:
      return {...state, selectedBead: action.selectedBead};
    case SET_BRAND:
      return {...state, selectedBrand: action.selectedBrand};
    case SET_TOOL:
      return {...state, selectedTool: action.selectedTool};
    case SET_MOUSE_COORDINATES:
      return {...state, mouseCoordinates: action.coordinates};
    default:
      return state;
  }
}

export default uiReducer;
