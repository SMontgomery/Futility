import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setSelectedBead, setSelectedBrand} from '../state/actions/sessionActions';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import StatusBar from './StatusBar';
import RightSideBar from './RightSideBar';
import WorkArea from './workarea/WorkArea';

function Application(props) {
  return (
    <div className="page">
      <Header className='header' />

      <LeftSideBar className='left-sidebar' />

      <WorkArea className='main' project={props.project} />

      <RightSideBar className='right-sidebar' />

      <StatusBar className='footer' />
    </div>
  );
}

Application.propTypes = {
  project: PropTypes.object.isRequired,
  setBead: PropTypes.func.isRequired,
  setBrand: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

const mapDispatchToProps = (dispatch) => ({
  setBrand: (brand) => dispatch(setSelectedBrand(brand)),
  setBead: (bead) => dispatch(setSelectedBead(bead)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);

