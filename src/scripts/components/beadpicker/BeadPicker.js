import PropTypes from 'prop-types';
import React from 'react';
import BeadPalette from './BeadPalette';
import BrandPicker from './BrandPicker';
import SelectedBead from './SelectedBead';
import { useProject } from '../Application';
import BeadManager from '../../project/beadmanager';

function BeadPicker(props) {
    const [projectState, dispatch] = useProject();

    return (
        <div>
            <SelectedBead selectedBead={projectState.selectedBead} />
            <BrandPicker
                dispatch={dispatch}
                beadManager={props.beadManager}
                selectedBrand={projectState.selectedBrand} />
            <BeadPalette
                dispatch={dispatch}
                beadManager={props.beadManager}
                selectedBrand={projectState.selectedBrand} />
        </div>
    );
}

BeadPicker.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired
};

export default BeadPicker;