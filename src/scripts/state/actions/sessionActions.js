export const SET_BEAD = 'SET_BEAD';
export const SET_BRAND = 'SET_BRAND';
export const SET_TOOL = 'SET_TOOL';
export const SET_MOUSE_COORDINATES = 'SET_MOUSE_COORDINATES';
export const SET_PROJECT_OPEN = 'SET_PROJECT_OPEN';

export function setSelectedBead(selectedBead) {
  return {
    type: SET_BEAD,
    selectedBead,
  };
}

export function setSelectedBrand(selectedBrand) {
  return {
    type: SET_BRAND,
    selectedBrand,
  };
}

export function setSelectedTool(selectedTool) {
  return {
    type: SET_TOOL,
    selectedTool,
  };
}

export function setMouseCoordinates(coordinates) {
  return {
    type: SET_MOUSE_COORDINATES,
    coordinates,
  };
}

export function setProjectOpen(isProjectOpen) {
  return {
    type: SET_PROJECT_OPEN,
    isProjectOpen,
  };
}
