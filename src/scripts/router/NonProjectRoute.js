import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

function NonProjectRoute({isProjectOpen, component: Component, ...rest}) {
  return (
    <Route {...rest} component={() => (
      isProjectOpen ? (
        <Redirect to='/project' />
      ) : (
        <Component {...rest} />
      )
    )}/>
  );
}

NonProjectRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isProjectOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isProjectOpen: !!state.session && !!state.session.isProjectOpen,
});

export default connect(mapStateToProps)(NonProjectRoute);
