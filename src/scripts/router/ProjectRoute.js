import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

function ProjectRoute({isProjectOpen, component: Component, ...rest}) {
  return (
    <Route {...rest} component={() => (
      isProjectOpen ? (
        <Component {...rest} />
      ) : (
        <Redirect to='/' />
      )
    )}/>
  );
}

ProjectRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isProjectOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isProjectOpen: !!state.session && !!state.session.isProjectOpen,
});

export default connect(mapStateToProps)(ProjectRoute);
