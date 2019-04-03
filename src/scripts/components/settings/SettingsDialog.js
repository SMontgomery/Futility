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
            canOutsideClickClose={false}
            style={{width: 830, minWidth: 830}}
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

