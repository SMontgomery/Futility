import PropTypes from 'prop-types';
import React from 'react';
import { HTMLSelect } from '@blueprintjs/core';
import { setSelectedBrand } from '../../state/actions/projectactions';
import BeadManager from '../../project/beadmanager';

function BrandPicker(props) {

    return (
        <div>
            <HTMLSelect
                value={props.selectedBrand}
                options={props.beadManager.getBrands()}
                onChange={(event) => props.dispatch(setSelectedBrand(event.currentTarget.value))}
            />
        </div>
    );
}

BrandPicker.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    dispatch: PropTypes.func.isRequired,
    selectedBrand: PropTypes.string.isRequired
};

export default BrandPicker;