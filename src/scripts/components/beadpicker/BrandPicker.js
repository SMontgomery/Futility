import PropTypes from 'prop-types';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BeadManager from '../../project/beadManager';
import { Translate } from 'react-localize-redux';

function BrandPicker(props) {

    const brands = props.beadManager.getBrands();

    return (
        <div>
            <DropdownButton size='sm' title={props.selectedBrand}>
                {brands.map(brand => (
                    <Dropdown.Item key={brand} onClick={() => props.setBrand(brand)}>
                        <Translate id={`brand.${brand}`}/>
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
}

BrandPicker.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    selectedBrand: PropTypes.string.isRequired,
    setBrand: PropTypes.func.isRequired
};

export default BrandPicker;