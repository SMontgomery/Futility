const projectReducerDefaultState = {

};

export default (state = projectReducerDefaultState, action) => {
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

        case 'SET_MOUSE_COORDINATES':
            return {
                ...state,
                mouseCoordinates: action.coordinates
            };

        default:
            return state;
    }
};