import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BoardCanvas from './BoardCanvas';
import BeadCanvas from './BeadCanvas';
import { setMouseCoordinates } from '../../state/actions/uiActions';
import { placeBead, removeBead } from '../../state/actions/projectActions';

export function WorkArea(props) {

    const beadSize = 20;

    return (
        <div style={{position: 'relative'}}>
            <BoardCanvas
                beadSize={beadSize}
                backgroundSettings={props.backgroundSettings}
                pegGridSettings={props.pegGridSettings}
                lineGridSettings={props.lineGridSettings}
                boardGridSettings={props.boardGridSettings}
                customGridSettings={props.customGridSettings}
                boardWidth={props.boardWidth}
                boardHeight={props.boardHeight}
                boardsAcross={props.boardsAcross}
                boardsDown={props.boardsDown}
            />
            <BeadCanvas
                beadSize={beadSize}
                beads={props.beads}
                boardHeight={props.boardHeight}
                boardWidth={props.boardWidth}
                boards={props.boards}
                boardsAcross={props.boardsAcross}
                boardsDown={props.boardsDown}
                placeBead={props.placeBead}
                removeBead={props.removeBead}
                selectedBead={props.selectedBead}
                setMouseCoordinates={props.setMouseCoordinates}
            />
        </div>
    );
}

WorkArea.propTypes = {
    backgroundSettings: PropTypes.object.isRequired,
    beads: PropTypes.array.isRequired,
    boardGridSettings: PropTypes.object.isRequired,
    boardHeight: PropTypes.number.isRequired,
    boardWidth: PropTypes.number.isRequired,
    boards: PropTypes.array.isRequired,
    boardsAcross: PropTypes.number.isRequired,
    boardsDown: PropTypes.number.isRequired,
    customGridSettings: PropTypes.object.isRequired,
    lineGridSettings: PropTypes.object.isRequired,
    pegGridSettings: PropTypes.object.isRequired,
    placeBead: PropTypes.func,
    removeBead: PropTypes.func,
    selectedBead: PropTypes.object,
    setMouseCoordinates: PropTypes.func
};

const mapStateToProps = (state) => ({
    backgroundSettings: state.settings.background,
    beads: state.project.beads,
    boardGridSettings: state.settings.boardGrid,
    boardHeight: state.project.boardHeight,
    boardWidth: state.project.boardWidth,
    boards: state.project.boards,
    boardsAcross: state.project.boardsAcross,
    boardsDown: state.project.boardsDown,
    customGridSettings: state.settings.customGrid,
    lineGridSettings: state.settings.lineGrid,
    pegGridSettings: state.settings.pegGrid,
    selectedBead: state.ui.selectedBead
});

const mapDispatchToProps = (dispatch) => ({
    placeBead: (board, x, y, bead) => dispatch(placeBead(board, x, y, bead)),
    removeBead: (board, x, y) => dispatch(removeBead(board, x, y)),
    setMouseCoordinates: (coordinates) => dispatch(setMouseCoordinates(coordinates))
});


export default connect(mapStateToProps, mapDispatchToProps)(WorkArea);

