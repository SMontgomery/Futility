import logger from '../../utils/logger';

export const projectReducer = (state, action) => {
    logger.debug(action, 'projectReducer');
    switch (action.type) {
        case 'SET_BEAD':
            return {
                ...state,
                selectedBead: action.selectedBead
            };
        case 'SET_BRAND':
            return {
                ...state,
                selectedBrand: action.selectedBrand
            };
        default:
            return state;
    }
};