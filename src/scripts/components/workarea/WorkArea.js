import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BoardCanvas from './BoardCanvas';
import BeadCanvas from './BeadCanvas';
import { setMouseCoordinates } from '../../state/actions/uiActions';
import { placeBead, removeBead } from '../../state/actions/projectActions';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
    position: relative;
    width: ${props => props.cssWidth};
    height: ${props => props.cssHeight};
    max-width: ${props => props.maxWidth};
    max-height: ${props => props.maxHeight};
    overflow: hidden;
`;


export function WorkArea(props) {

    const requiredWidth = props.beadSize * props.boardWidth * props.boardsAcross;
    const requiredHeight = props.beadSize * props.boardHeight * props.boardsDown;

    return (
        <CanvasWrapper
            cssWidth={`${requiredWidth}px`}
            cssHeight={`${requiredHeight}px`}
            maxWidth={props.maxWidth ? props.maxWidth : `${requiredWidth}px`}
            maxHeight={props.maxHeight ? props.maxHeight : `${requiredHeight}px`}
        >
            <BoardCanvas
                beadSize={props.beadSize}
                backgroundSettings={props.backgroundSettings}
                pegGridSettings={props.pegGridSettings}
                lineGridSettings={props.lineGridSettings}
                boardGridSettings={props.boardGridSettings}
                customGridSettings={props.customGridSettings}
                boardWidth={props.boardWidth}
                boardHeight={props.boardHeight}
                boardsAcross={props.boardsAcross}
                boardsDown={props.boardsDown}
                requiredWidth={requiredWidth}
                requiredHeight={requiredHeight}
            />
            <BeadCanvas
                beadSize={props.beadSize}
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
                requiredWidth={requiredWidth}
                requiredHeight={requiredHeight}
            />
        </CanvasWrapper>
    );
}

WorkArea.propTypes = {
    backgroundSettings: PropTypes.object.isRequired,
    beadSize: PropTypes.number.isRequired,
    beads: PropTypes.array.isRequired,
    boardGridSettings: PropTypes.object.isRequired,
    boardHeight: PropTypes.number.isRequired,
    boardWidth: PropTypes.number.isRequired,
    boards: PropTypes.array.isRequired,
    boardsAcross: PropTypes.number.isRequired,
    boardsDown: PropTypes.number.isRequired,
    customGridSettings: PropTypes.object.isRequired,
    lineGridSettings: PropTypes.object.isRequired,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string,
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

WorkArea.defaultProps = {
    beadSize: 20
};
