export const SET_BEAD_SHAPE = 'SET_BEAD_SHAPE';
export const SET_BACKGROUND_TYPE = 'SET_BACKGROUND_TYPE';
export const SET_BACKGROUND_PRIMARY_COLOR = 'SET_BACKGROUND_PRIMARY_COLOR';
export const SET_BACKGROUND_SECONDARY_COLOR = 'SET_BACKGROUND_SECONDARY_COLOR';
export const SET_PEG_GRID_ENABLED = 'ENABLE_PEG_GRID';
export const SET_PEG_GRID_COLOR = 'SET_PEG_GRID_COLOR';
export const SET_LINE_GRID_ENABLED = 'ENABLE_LINE_GRID';
export const SET_LINE_GRID_COLOR = 'SET_LINE_GRID_COLOR';
export const SET_BOARD_GRID_ENABLED = 'ENABLE_BOARD_GRID';
export const SET_BOARD_GRID_COLOR = 'SET_BOARD_GRID_COLOR';
export const SET_CUSTOM_GRID_ENABLED = 'ENABLE_CUSTOM_GRID';
export const SET_CUSTOM_GRID_COLOR = 'SET_CUSTOM_GRID_COLOR';
export const SET_CUSTOM_GRID_SIZE = 'SET_CUSTOM_GRID_SIZE';
export const RESTORE_DEFAULT_SETTINGS = 'RESTORE_DEFAULT_SETTINGS';

export const setBeadShape = (beadShape) => ({
  type: SET_BEAD_SHAPE,
  beadShape,
});

export const setBackgroundType = (backgroundType) => ({
  type: SET_BACKGROUND_TYPE,
  backgroundType,
});

export const setBackgroundPrimaryColor = (primaryColor) => ({
  type: SET_BACKGROUND_PRIMARY_COLOR,
  primaryColor,
});

export const setBackgroundSecondaryColor = (secondaryColor) => ({
  type: SET_BACKGROUND_SECONDARY_COLOR,
  secondaryColor,
});

export const setPegGridEnabled = (enabled) => ({
  type: SET_PEG_GRID_ENABLED,
  enabled,
});

export const setPegGridColor = (color) => ({
  type: SET_PEG_GRID_COLOR,
  color,
});

export const setLineGridEnabled = (enabled) => ({
  type: SET_LINE_GRID_ENABLED,
  enabled,
});

export const setLineGridColor = (color) => ({
  type: SET_LINE_GRID_COLOR,
  color,
});

export const setBoardGridEnabled = (enabled) => ({
  type: SET_BOARD_GRID_ENABLED,
  enabled,
});

export const setBoardGridColor = (color) => ({
  type: SET_BOARD_GRID_COLOR,
  color,
});

export const setCustomGridEnabled = (enabled) => ({
  type: SET_CUSTOM_GRID_ENABLED,
  enabled,
});

export const setCustomGridColor = (color) => ({
  type: SET_CUSTOM_GRID_COLOR,
  color,
});

export const setCustomGridSize = (size) => ({
  type: SET_CUSTOM_GRID_SIZE,
  size,
});

export const restoreDefaultSettings = () => ({
  type: RESTORE_DEFAULT_SETTINGS,
});
