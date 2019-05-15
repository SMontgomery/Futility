import {
  CREATE_PROJECT,
  LOAD_PROJECT,
  ADD_BOARD_COLUMN_TO_LEFT,
  ADD_BOARD_COLUMN_TO_RIGHT,
  ADD_BOARD_ROW_TO_TOP,
  ADD_BOARD_ROW_TO_BOTTOM,
  REMOVE_BOARD_COLUMN_FROM_LEFT,
  REMOVE_BOARD_COLUMN_FROM_RIGHT,
  REMOVE_BOARD_ROW_FROM_TOP,
  REMOVE_BOARD_ROW_FROM_BOTTOM,
  PLACE_BEAD,
  REMOVE_BEAD,
  PLACE_BEADS,
  REMOVE_BEADS,
} from '../actions/projectActions';

const projectReducerDefaultState = {};

function projectReducer(state = projectReducerDefaultState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
    case LOAD_PROJECT:
    case ADD_BOARD_COLUMN_TO_LEFT:
    case ADD_BOARD_COLUMN_TO_RIGHT:
    case ADD_BOARD_ROW_TO_TOP:
    case ADD_BOARD_ROW_TO_BOTTOM:
    case REMOVE_BOARD_COLUMN_FROM_LEFT:
    case REMOVE_BOARD_COLUMN_FROM_RIGHT:
    case REMOVE_BOARD_ROW_FROM_TOP:
    case REMOVE_BOARD_ROW_FROM_BOTTOM:
    case PLACE_BEAD:
    case REMOVE_BEAD:
    case PLACE_BEADS:
    case REMOVE_BEADS:
      return {...state, ...action.project};
    default:
      return state;
  }
}

export default projectReducer;
