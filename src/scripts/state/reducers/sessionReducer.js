import BeadManager from '../../project/beadManager';
import brands from '../../project/brands';
import {
  SET_BEAD,
  SET_BRAND,
  SET_TOOL,
  SET_MOUSE_COORDINATES,
  SET_PROJECT_OPEN,
} from '../actions/sessionActions';
import tools from '../tools';

const defaultBrand = brands.PERLER;
const beadManager = new BeadManager();
const uiReducerDefaultState = {
  brands: beadManager.getBrands(),
  beads: beadManager.getBeads(defaultBrand),
  selectedTool: tools.PENCIL,
  selectedBrand: defaultBrand,
  selectedBead: beadManager.getBeads(defaultBrand)[0],
};

function sessionReducer(state = uiReducerDefaultState, action) {
  switch (action.type) {
    case SET_BEAD:
      return {...state, selectedBead: action.selectedBead};
    case SET_BRAND:
      return {
        ...state,
        selectedBrand: action.selectedBrand,
        beads: beadManager.getBeads(action.selectedBrand),
        selectedBead: beadManager.getBeads(action.selectedBrand)[0],
      };
    case SET_TOOL:
      return {...state, selectedTool: action.selectedTool};
    case SET_MOUSE_COORDINATES:
      return {...state, mouseCoordinates: action.coordinates};
    case SET_PROJECT_OPEN:
      return {...state, isProjectOpen: action.isProjectOpen};
    default:
      return state;
  }
}

export default sessionReducer;
