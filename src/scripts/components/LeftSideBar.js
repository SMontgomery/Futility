import PropTypes from 'prop-types';
import React from 'react';
import BeadPicker from './beadpicker/BeadPicker';
import BeadManager from '../project/beadManager';
import ToolPalette from './toolpicker/ToolPalette';

function LeftSideBar(props) {
    return (
        <div className={props.className}>
            <ToolPalette/>
            <BeadPicker beadManager={props.beadManager} />
        </div>
    );
}

LeftSideBar.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    className: PropTypes.string
};

export default LeftSideBar;

