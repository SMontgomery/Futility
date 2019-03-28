import PropTypes from 'prop-types';
import React from 'react';
import { Dialog } from '@blueprintjs/core';
import Settings from './Settings';

function SettingsDialog(props) {

    return (
        <Dialog
            isOpen={props.isOpen}
            title='Settings'
            onClose={props.closeDialog}
        >
            <Settings closeDialog={props.closeDialog} />
        </Dialog>
    );
}

SettingsDialog.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default SettingsDialog;

