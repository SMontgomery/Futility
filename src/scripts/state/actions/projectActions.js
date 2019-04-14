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
export const PLACE_BEADS = 'PLACE_BEADS';
export const REMOVE_BEAD = 'REMOVE_BEAD';
export const REMOVE_BEADS = 'REMOVE_BEADs';

let project;

export function createProject(boardWidth, boardHeight, boardsAcross, boardsDown) {
    project = new Project(boardWidth, boardHeight, boardsAcross, boardsDown);

    return {
        type: CREATE_PROJECT,
        project: project.getProject()
    };
}

export function addBoardColumnToLeft() {
    project.addBoardColumnToLeft();

    return {
        type: ADD_BOARD_COLUMN_TO_LEFT,
        project: project.getProject()
    };
}

export function addBoardColumnToRight() {
    project.addBoardColumnToRight();

    return {
        type: ADD_BOARD_COLUMN_TO_RIGHT,
        project: project.getProject()
    };
}

export function addBoardRowToTop() {
    project.addBoardRowToTop();

    return {
        type: ADD_BOARD_ROW_TO_TOP,
        project: project.getProject()
    };
}

export function addBoardRowToBottom() {
    project.addBoardRowToBottom();

    return {
        type: ADD_BOARD_ROW_TO_BOTTOM,
        project: project.getProject()
    };
}

export function removeBoardColumnFromLeft() {
    project.removeBoardColumnFromLeft();

    return {
        type: REMOVE_BOARD_COLUMN_FROM_LEFT,
        project: project.getProject()
    };
}

export function removeBoardColumnFromRight() {
    project.removeBoardColumnFromRight();

    return {
        type: REMOVE_BOARD_COLUMN_FROM_RIGHT,
        project: project.getProject()
    };
}

export function removeBoardRowFromTop() {
    project.removeBoardRowFromTop();

    return {
        type: REMOVE_BOARD_ROW_FROM_TOP,
        project: project.getProject()
    };
}

export function removeBoardRowFromBottom() {
    project.removeBoardRowFromBottom();

    return {
        type: REMOVE_BOARD_ROW_FROM_BOTTOM,
        project: project.getProject()
    };
}

export function placeBead({boardIndex, boardX, boardY}, bead) {
    project.placeBead(boardIndex, boardX, boardY, bead);

    return {
        type: PLACE_BEAD,
        project: project.getProject()
    };
}

export function removeBead({boardIndex, boardX, boardY}) {
    project.placeBead(boardIndex, boardX, boardY, null);

    return {
        type: REMOVE_BEAD,
        project: project.getProject()
    };
}

export function placeBeads(beadPlacements) {
    beadPlacements.forEach(({boardIndex, boardX, boardY, bead}) => project.placeBead(boardIndex, boardX, boardY, bead));

    return {
        type: PLACE_BEADS,
        project: project.getProject()
    };
}

export function removeBeads(beadPlacements) {
    beadPlacements.forEach(({boardIndex, boardX, boardY}) => project.placeBead(boardIndex, boardX, boardY, null));

    return {
        type: REMOVE_BEADS,
        project: project.getProject()
    };
}
