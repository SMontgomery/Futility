import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@blueprintjs/core';
import BeadManager from '../../project/beadManager';

function BeadPalette(props) {
    return (
        <div>
            {props.beadManager.getBeads(props.selectedBrand).map((bead) => {
                return (
                    <Button
                        key={bead.code}
                        style={{background: bead.color}}
                        onClick={() => props.setBead(bead)}
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
    selectedBrand: PropTypes.string.isRequired,
    setBead: PropTypes.func.isRequired
};

export default BeadPalette;