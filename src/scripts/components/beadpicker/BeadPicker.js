import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import BeadPalette from './BeadPalette';
import BrandPicker from './BrandPicker';
import SelectedBead from './SelectedBead';
import {setSelectedBead, setSelectedBrand} from '../../state/actions/sessionActions';

function BeadPicker(props) {
  return (
    <div>
      <SelectedBead selectedBead={props.selectedBead} />
      <BrandPicker
        brands={props.brands}
        selectedBrand={props.selectedBrand}
        setBrand={props.setBrand}
      />
      <BeadPalette
        beads={props.beads}
        selectedBrand={props.selectedBrand}
        setBead={props.setBead}
      />
    </div>
  );
}

BeadPicker.propTypes = {
  beads: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  selectedBead: PropTypes.object.isRequired,
  selectedBrand: PropTypes.string.isRequired,
  setBead: PropTypes.func.isRequired,
  setBrand: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  beads: state.session.beads,
  brands: state.session.brands,
  selectedBead: state.session.selectedBead,
  selectedBrand: state.session.selectedBrand,
});

const mapDispatchToProps = (dispatch) => ({
  setBrand: (brand) => dispatch(setSelectedBrand(brand)),
  setBead: (bead) => dispatch(setSelectedBead(bead)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeadPicker);
