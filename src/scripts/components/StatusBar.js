import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function StatusBar(props) {
    return (
        <div className={props.className}>
            {props.mouseCoordinates && (
                `Board: ${props.mouseCoordinates.boardIndex} / Position: ${props.mouseCoordinates.boardX}, ${props.mouseCoordinates.boardY}`
            )}
        </div>
    );
}

StatusBar.propTypes = {
    className: PropTypes.string,
    mouseCoordinates: PropTypes.object
};

const mapStateToProps = (state) => ({
    mouseCoordinates: state.project.mouseCoordinates
});

export default connect(mapStateToProps)(StatusBar);

