import PropTypes from 'prop-types';
import React from 'react';
import BeadPicker from './beadpicker/BeadPicker';
import ToolPalette from './toolpicker/ToolPalette';

function LeftSideBar(props) {
  return (
    <div className={props.className}>
      <ToolPalette/>
      <BeadPicker/>
    </div>
  );
}

LeftSideBar.propTypes = {
  className: PropTypes.string,
};

export default LeftSideBar;

