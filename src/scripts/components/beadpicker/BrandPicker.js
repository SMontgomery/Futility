import PropTypes from 'prop-types';
import React from 'react';
import { HTMLSelect } from '@blueprintjs/core';
import BeadManager from '../../project/beadmanager';

function BrandPicker(props) {

    return (
        <div>
            <HTMLSelect
                value={props.selectedBrand}
                options={props.beadManager.getBrands()}
                onChange={(event) => props.setBrand(event.currentTarget.value)}
            />
        </div>
    );
}

BrandPicker.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    selectedBrand: PropTypes.string.isRequired,
    setBrand: PropTypes.func.isRequired
};

export default BrandPicker;