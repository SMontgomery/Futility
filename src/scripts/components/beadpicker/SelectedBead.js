import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@blueprintjs/core';

function SelectedBead(props) {
    return (
        <div>
            <Button style={{background: props.selectedBead.color}} >&nbsp;</Button>
            <div>{props.selectedBead.brand}</div>
            <div>{props.selectedBead.name}</div>
        </div>
    );
}

SelectedBead.propTypes = {
    selectedBead: PropTypes.object.isRequired
};

export default SelectedBead;