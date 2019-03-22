import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useRef, useReducer, useState } from 'react';
import Project from '../project/project';
import { drawCircle, drawLine } from '../utils/draw';
import { setMouseCoordinates } from '../state/actions/projectActions';

const PEG_RADIUS = 1.5;

function WorkSurface(props) {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [leftMousePressed, setLeftMousePressed] = useState(false);
    const [rightMousePressed, setRightMousePressed] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({});

    const { project } = props;
    const canvasRef = useRef();
    const beadSize = 20;
    const backgroundColor = 'white';
    const pegColor = 'gray';
    const lineGridColor = 'gray';
    const boardGridColor = 'blue';

    const requiredWidth = beadSize * project.getPegsAcross();
    const requiredWeight = beadSize * project.getPegsDown();


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Draw background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw pegs
        context.fillStyle = pegColor;
        for (let x = beadSize / 2; x < canvas.width; x += beadSize) {
            for (let y = beadSize / 2; y < canvas.height; y += beadSize) {
                drawCircle(context, x, y, PEG_RADIUS);
            }
        }

        // Draw beads
        project.getAllBeads().forEach(beadInfo => {
            const { x, y } = calculateCanvasCoordiantes(beadInfo.boardIndex, beadInfo.boardX, beadInfo.boardY);
            context.fillStyle = beadInfo.bead.color;
            drawCircle(context, x, y, PEG_RADIUS + 5);
        });

        // Draw line grid
        context.strokeStyle = lineGridColor;
        // Y lines
        for (let x = 0; x <= canvas.width; x += beadSize) {
            drawLine(context, x, .5, x, canvas.height);
        }

        // X lines
        for (let y = 0; y <= canvas.height; y += beadSize) {
            drawLine(context, .5, y, canvas.width, y);
        }

        // Draw board grid
        context.strokeStyle = boardGridColor;
        // Y lines
        for (let x = 0; x <= canvas.width; x += beadSize * project.getBoardHeight()) {
            drawLine(context, x, .5, x, canvas.height);
        }

        // X lines
        for (let y = 0; y <= canvas.height; y += beadSize * project.getBoardWidth()) {
            drawLine(context, .5, y, canvas.width, y);
        }
    });

    const calculateCanvasCoordiantes = (board, x, y) => {
        // Determine the board x/y coordinates
        const boardX = board % project.getBoardsAcross();
        const boardY = Math.trunc(board / project.getBoardsAcross());

        // Determine the overall peg x/y coordinates
        const pegX = (boardX * project.getBoardWidth()) + x;
        const pegY = (boardY * project.getBoardHeight()) + y;

        // Determine canvas x/y for the center of the peg
        return {
            x: (pegX * beadSize) + (beadSize / 2),
            y: (pegY * beadSize) + (beadSize / 2)
        };
    };

    const calculatePegCoordinates = (event) => {
        // Determine overall peg x/y coordinates
        const pegX = Math.trunc(event.offsetX / beadSize);
        const pegY = Math.trunc(event.offsetY / beadSize);

        // Determine board x/y coordinates
        const boardX = Math.trunc(pegX / project.getBoardWidth());
        const boardY = Math.trunc(pegY / project.getBoardHeight());

        // Determine board index
        const boardIndex = boardX + (boardY * project.getBoardsAcross());

        // Determine x/y coordinate on the board
        const x = pegX % project.getBoardWidth();
        const y = pegY % project.getBoardHeight();

        return {
            boardIndex,
            boardX: x,
            boardY: y
        };
    };

    const onMouseMove = (event) => {
        const nativeEvent = event.nativeEvent;
        const pegX = Math.trunc(nativeEvent.offsetX / beadSize);
        const pegY = Math.trunc(nativeEvent.offsetY / beadSize);

        if (pegX !== lastMousePosition.pegX || pegY !== lastMousePosition.pegY ) {
            setLastMousePosition({ pegX, pegY });
        } else {
            return;
        }

        const coordinates = calculatePegCoordinates(nativeEvent);
        props.setMouseCoordinates(coordinates);

        if (leftMousePressed) {
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
            forceUpdate();
        } else if (rightMousePressed) {
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, null);
            forceUpdate();
        }
    };

    const onMouseDown = (event) => {
        if (event.button === 0) {
            setLeftMousePressed(true);
        } else if (event.button === 2) {
            setRightMousePressed(true);
        } else {
            return;
        }

        const nativeEvent = event.nativeEvent;
        const coordinates = calculatePegCoordinates(nativeEvent);
        project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
        forceUpdate();
    };

    const onMouseUp = (event) => {
        if (event.button === 0) {
            setLeftMousePressed(false);
        } else if (event.button === 2) {
            setRightMousePressed(false);
        }
    }

    return (
        <div className={props.className}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredWeight}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onContextMenu={e => e.preventDefault()}
            />

        </div>
    );
}

WorkSurface.propTypes = {
    className: PropTypes.string,
    project: PropTypes.instanceOf(Project).isRequired,
    setMouseCoordinates: PropTypes.func.isRequired,
    selectedBead: PropTypes.object
};

const mapStateToProps = (state) => ({
    selectedBead: state.project.selectedBead
});

const mapDispatchToProps = (dispatch) => ({
    setMouseCoordinates: (coordinates) => dispatch(setMouseCoordinates(coordinates))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkSurface);