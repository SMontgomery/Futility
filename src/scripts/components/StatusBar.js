import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {getTranslate, Translate} from 'react-localize-redux';

function StatusBar(props) {
  const coordinates = props.mouseCoordinates ? props.mouseCoordinates.board : undefined;

  return (
    <div className={props.className}>
      {coordinates && (
          <>
            <Translate id='common.board'/>
            {`: ${coordinates.boardIndex} / `}
            <Translate id='common.position'/>
            {`: ${coordinates.boardX}, ${coordinates.boardY}`}
          </>
      )}
    </div>
  );
}

StatusBar.propTypes = {
  className: PropTypes.string,
  mouseCoordinates: PropTypes.object,
  translate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mouseCoordinates: state.ui.mouseCoordinates,
  translate: getTranslate(state.localize),
});

export default connect(mapStateToProps)(StatusBar);

