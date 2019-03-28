import {
    SET_BEAD_SHAPE,
    SET_BACKGROUND_TYPE,
    SET_BACKGROUND_PRIMARY_COLOR,
    SET_BACKGROUND_SECONDARY_COLOR,
    SET_PEG_GRID_ENABLED,
    SET_PEG_GRID_COLOR,
    SET_LINE_GRID_ENABLED,
    SET_LINE_GRID_COLOR,
    SET_BOARD_GRID_ENABLED,
    SET_BOARD_GRID_COLOR,
    SET_CUSTOM_GRID_ENABLED,
    SET_CUSTOM_GRID_COLOR,
    SET_CUSTOM_GRID_SIZE,
    RESTORE_DEFAULT_SETTINGS
} from '../actions/settingsActions';
import beadShapes from '../beadShapes';
import backgroundTypes from '../backgroundTypes';

const settingsReducerDefaultState = {
    bead: {
        beadShape: beadShapes.NORMAL
    },
    background: {
        backgroundType: backgroundTypes.PLAIN,
        primaryColor: '#ffffff',
        secondaryColor: '#e5e5e5'
    },
    pegGrid: {
        enabled: true,
        color: '#b2b2b2'
    },
    lineGrid: {
        enabled: false,
        color: '#808080'
    },
    boardGrid: {
        enabled: true,
        color: '#0000ff'
    },
    customGrid: {
        enabled: false,
        color: '#ff0000',
        size: 10
    }
};

function beadSettingsReducer(state, action) {
    switch (action.type) {
        case SET_BEAD_SHAPE:
            return { ...state, beadShape: action.beadShape };
        default:
            return state;
    }
}

function backgroundSettingsReducer(state, action) {
    switch (action.type) {
        case SET_BACKGROUND_TYPE:
            return { ...state, backgroundType: action.backgroundType };
        case SET_BACKGROUND_PRIMARY_COLOR:
            return { ...state, primaryColor: action.primaryColor };
        case SET_BACKGROUND_SECONDARY_COLOR:
            return { ...state, secondaryColor: action.secondaryColor };
        default:
            return state;
    }
}

function pegGridSettingsReducer(state, action) {
    switch (action.type) {
        case SET_PEG_GRID_ENABLED:
            return { ...state, enabled: action.enabled };
        case SET_PEG_GRID_COLOR:
            return { ...state, color: action.color };
        default:
            return state;
    }
}

function lineGridSettingsReducer(state, action) {
    switch (action.type) {
        case SET_LINE_GRID_ENABLED:
            return { ...state, enabled: action.enabled };
        case SET_LINE_GRID_COLOR:
            return { ...state, color: action.color };
        default:
            return state;
    }
}

function boardGridSettingsReducer(state, action) {
    switch (action.type) {
        case SET_BOARD_GRID_ENABLED:
            return { ...state, enabled: action.enabled };
        case SET_BOARD_GRID_COLOR:
            return { ...state, color: action.color };
        default:
            return state;
    }
}

function customGridSettingsReducer(state, action) {
    switch (action.type) {
        case SET_CUSTOM_GRID_ENABLED:
            return { ...state, enabled: action.enabled };
        case SET_CUSTOM_GRID_COLOR:
            return { ...state, color: action.color };
        case SET_CUSTOM_GRID_SIZE:
            return { ...state, size: action.size };
        default:
            return state;
    }
}

function settingsReducer(state = settingsReducerDefaultState, action) {
    if (action.type === RESTORE_DEFAULT_SETTINGS) {
        return settingsReducerDefaultState;
    } else {
        return {
            bead: beadSettingsReducer(state.bead, action),
            background: backgroundSettingsReducer(state.background, action),
            pegGrid: pegGridSettingsReducer(state.pegGrid, action),
            lineGrid: lineGridSettingsReducer(state.lineGrid, action),
            boardGrid: boardGridSettingsReducer(state.boardGrid, action),
            customGrid: customGridSettingsReducer(state.customGrid, action)
        };
    }
}

export default settingsReducer;
