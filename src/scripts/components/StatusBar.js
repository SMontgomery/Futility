import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

function StatusBar(props) {

    const boardCoordinates = props.mouseCoordinates ? props.mouseCoordinates.board : undefined;

    return (
        <div className={props.className}>
            {boardCoordinates && (
                `${props.translate('common.board')}: ${boardCoordinates.boardIndex} / ${props.translate('common.position')}: ${boardCoordinates.boardX}, ${boardCoordinates.boardY}`
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

