import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BoardCanvas from './BoardCanvas';
import BeadCanvas from './BeadCanvas';
import { setMouseCoordinates } from '../../state/actions/uiActions';
import { placeBead, placeBeads, removeBead, removeBeads } from '../../state/actions/projectActions';
import styled from 'styled-components';
import OverlayCanvas from './OverlayCanvas';

const CanvasWrapper = styled.div`
    position: relative;
    width: ${props => props.cssWidth};
    height: ${props => props.cssHeight};
    max-width: ${props => props.maxWidth};
    max-height: ${props => props.maxHeight};
    overflow: hidden;
`;

export function WorkArea(props) {
    const { boardWidth, boardHeight, beadSize, boardsDown, boardsAcross } = props;
    const requiredWidth = beadSize * boardWidth * boardsAcross;
    const requiredHeight = beadSize * boardHeight * boardsDown;

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
                beads={props.beads}
                beadSettings={props.beadSettings}
                beadSize={props.beadSize}
                boardHeight={props.boardHeight}
                boardWidth={props.boardWidth}
                boards={props.boards}
                boardsAcross={props.boardsAcross}
                boardsDown={props.boardsDown}
                requiredWidth={requiredWidth}
                requiredHeight={requiredHeight}
            />
            <OverlayCanvas
                beads={props.beads}
                beadSettings={props.beadSettings}
                beadSize={props.beadSize}
                boardHeight={props.boardHeight}
                boardWidth={props.boardWidth}
                boards={props.boards}
                boardsAcross={props.boardsAcross}
                boardsDown={props.boardsDown}
                placeBead={props.placeBead}
                removeBead={props.removeBead}
                placeBeads={props.placeBeads}
                removeBeads={props.removeBeads}
                selectedBead={props.selectedBead}
                selectedTool={props.selectedTool}
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
    beadSettings: PropTypes.object.isRequired,
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
    placeBeads: PropTypes.func,
    removeBeads: PropTypes.func,
    selectedBead: PropTypes.object,
    setMouseCoordinates: PropTypes.func,
    selectedTool: PropTypes.string.isRequired
};

WorkArea.defaultProps = {
    beadSize: 20
};

const mapStateToProps = (state) => ({
    backgroundSettings: state.settings.background,
    beads: state.project.beads,
    beadSettings: state.settings.bead,
    boardGridSettings: state.settings.boardGrid,
    boardHeight: state.project.boardHeight,
    boardWidth: state.project.boardWidth,
    boards: state.project.boards,
    boardsAcross: state.project.boardsAcross,
    boardsDown: state.project.boardsDown,
    customGridSettings: state.settings.customGrid,
    lineGridSettings: state.settings.lineGrid,
    pegGridSettings: state.settings.pegGrid,
    selectedBead: state.ui.selectedBead,
    selectedTool: state.ui.selectedTool
});

const mapDispatchToProps = (dispatch) => ({
    placeBead: (board, x, y, bead) => dispatch(placeBead(board, x, y, bead)),
    removeBead: (board, x, y) => dispatch(removeBead(board, x, y)),
    placeBeads: (beadPlacements) => dispatch(placeBeads(beadPlacements)),
    removeBeads: (beadPlacements) => dispatch(removeBeads(beadPlacements)),
    setMouseCoordinates: (coordinates) => dispatch(setMouseCoordinates(coordinates))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkArea);
