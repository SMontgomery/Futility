export const SET_BEAD = 'SET_BEAD';
export const SET_BRAND = 'SET_BRAND';
export const SET_MOUSE_COORDINATES = 'SET_MOUSE_COORDINATES';

export const setSelectedBead = (selectedBead) => ({
    type: SET_BEAD,
    selectedBead
});

export const setSelectedBrand = (selectedBrand) => ({
    type: SET_BRAND,
    selectedBrand
});

export const setMouseCoordinates = (coordinates) => ({
    type: SET_MOUSE_COORDINATES,
    coordinates
});