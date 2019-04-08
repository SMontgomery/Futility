import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

function StatusBar(props) {
    return (
        <div className={props.className}>
            {props.mouseCoordinates && (
                `${props.translate('common.board')}: ${props.mouseCoordinates.boardIndex} / ${props.translate('common.position')}: ${props.mouseCoordinates.boardX}, ${props.mouseCoordinates.boardY}`
            )}
        </div>
    );
}

StatusBar.propTypes = {
    className: PropTypes.string,
    mouseCoordinates: PropTypes.object,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    mouseCoordinates: state.ui.mouseCoordinates,
    translate: getTranslate(state.localize)
});

export default connect(mapStateToProps)(StatusBar);

