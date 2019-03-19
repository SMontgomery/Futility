import PropTypes from 'prop-types';
import React from 'react';
import { setSelectedBead } from '../../state/actions/projectactions';
import { Button } from '@blueprintjs/core';
import BeadManager from '../../project/beadmanager';

function BeadPalette(props) {
    return (
        <div>
            {props.beadManager.getBeads(props.selectedBrand).map((bead) => {
                return (
                    <Button
                        key={bead.code}
                        style={{background: bead.color}}
                        onClick={() => props.dispatch(setSelectedBead(bead))}
                    >
                        &nbsp;
                    </Button>
                );
            })}

        </div>
    );
}

BeadPalette.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    dispatch: PropTypes.func.isRequired,
    selectedBrand: PropTypes.string.isRequired
};

export default BeadPalette;