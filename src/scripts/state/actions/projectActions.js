import Project from '../../project/project';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const ADD_BOARD_COLUMN_TO_LEFT = 'ADD_BOARD_COLUMN_TO_LEFT';
export const ADD_BOARD_COLUMN_TO_RIGHT = 'ADD_BOARD_COLUMN_TO_RIGHT';
export const ADD_BOARD_ROW_TO_TOP = 'ADD_BOARD_ROW_TO_TOP';
export const ADD_BOARD_ROW_TO_BOTTOM = 'ADD_BOARD_ROW_TO_BOTTOM';
export const REMOVE_BOARD_COLUMN_FROM_LEFT = 'REMOVE_BOARD_COLUMN_FROM_LEFT';
export const REMOVE_BOARD_COLUMN_FROM_RIGHT = 'REMOVE_BOARD_COLUMN_FROM_RIGHT';
export const REMOVE_BOARD_ROW_FROM_TOP = 'REMOVE_BOARD_ROW_FROM_TOP';
export const REMOVE_BOARD_ROW_FROM_BOTTOM = 'REMOVE_BOARD_ROW_FROM_BOTTOM';
export const PLACE_BEAD = 'PLACE_BEAD';
export const PLACE_BEADS = 'PLACE_BEADs';
export const REMOVE_BEAD = 'REMOVE_BEAD';
export const REMOVE_BEADS = 'REMOVE_BEADs';

let project;

export const createProject = (boardWidth, boardHeight, boardsAcross, boardsDown) => {

    project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

    return {
        type: CREATE_PROJECT,
        project: project.getProject()
    };
};

export const addBoardColumnToLeft = () => {

    project.addBoardColumnToLeft();

    return {
        type: ADD_BOARD_COLUMN_TO_LEFT,
        project: project.getProject()
    };
};

export const addBoardColumnToRight = () => {

    project.addBoardColumnToRight();

    return {
        type: ADD_BOARD_COLUMN_TO_RIGHT,
        project: project.getProject()
    };
};

export const addBoardRowToTop = () => {

    project.addBoardRowToTop();

    return {
        type: ADD_BOARD_ROW_TO_TOP,
        project: project.getProject()
    };
};

export const addBoardRowToBottom = () => {

    project.addBoardRowToBottom();

    return {
        type: ADD_BOARD_ROW_TO_BOTTOM,
        project: project.getProject()
    };
};

export const removeBoardColumnFromLeft = () => {

    project.removeBoardColumnFromLeft();

    return {
        type: REMOVE_BOARD_COLUMN_FROM_LEFT,
        project: project.getProject()
    };
};

export const removeBoardColumnFromRight = () => {

    project.removeBoardColumnFromRight();

    return {
        type: REMOVE_BOARD_COLUMN_FROM_RIGHT,
        project: project.getProject()
    };
};

export const removeBoardRowFromTop = () => {

    project.removeBoardRowFromTop();

    return {
        type: REMOVE_BOARD_ROW_FROM_TOP,
        project: project.getProject()
    };
};

export const removeBoardRowFromBottom = () => {

    project.removeBoardRowFromBottom();

    return {
        type: REMOVE_BOARD_ROW_FROM_BOTTOM,
        project: project.getProject()
    };
};

export const placeBead = (board, x, y, bead) => {
    project.placeBead(board, x, y, bead);

    return {
        type: PLACE_BEAD,
        project: project.getProject()
    };
};

export const removeBead = (board, x, y) => {

    project.placeBead(board, x, y, null);

    return {
        type: REMOVE_BEAD,
        project: project.getProject()
    };
};

// TODO
//   * Add actions for PLACE_BEADS and REMOVE_BEADS
//   * Make project either throw exceptions or return success/fail boolean so we can record errors in redux

