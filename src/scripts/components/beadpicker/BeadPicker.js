import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BeadPalette from './BeadPalette';
import BrandPicker from './BrandPicker';
import SelectedBead from './SelectedBead';
import BeadManager from '../../project/beadManager';
import { setSelectedBead, setSelectedBrand } from '../../state/actions/uiActions';

function BeadPicker(props) {

    return (
        <div>
            <SelectedBead selectedBead={props.selectedBead} />
            <BrandPicker
                beadManager={props.beadManager}
                selectedBrand={props.selectedBrand}
                setBrand={props.setBrand}
            />
            <BeadPalette
                beadManager={props.beadManager}
                selectedBrand={props.selectedBrand}
                setBead={props.setBead}
            />
        </div>
    );
}

BeadPicker.propTypes = {
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    selectedBead: PropTypes.object.isRequired,
    selectedBrand: PropTypes.string.isRequired,
    setBead: PropTypes.func.isRequired,
    setBrand: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    selectedBead: state.ui.selectedBead,
    selectedBrand: state.ui.selectedBrand
});

const mapDispatchToProps = (dispatch) => ({
    setBrand: (brand) => dispatch(setSelectedBrand(brand)),
    setBead: (bead) => dispatch(setSelectedBead(bead))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeadPicker);