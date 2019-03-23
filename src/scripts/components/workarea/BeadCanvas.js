import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useRef, useReducer } from 'react';

import { drawCircle } from '../../utils/draw';
import { setMouseCoordinates } from '../../state/actions/projectActions';
import Project from '../../project/project';

const PEG_RADIUS = 1.5;

const BeadCanvas = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const leftMousePressed = useRef(false);
    const rightMousePressed = useRef(false);
    const lastMousePosition = useRef({});
    const canvasRef = useRef();

    const { project } = props;
    const beadSize = 20;
    const requiredWidth = beadSize * project.getPegsAcross();
    const requiredWeight = beadSize * project.getPegsDown();


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear background
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw beads
        project.getAllBeads().forEach(beadInfo => {
            const { x, y } = calculateCanvasCoordiantes(beadInfo.boardIndex, beadInfo.boardX, beadInfo.boardY);
            context.fillStyle = beadInfo.bead.color;
            drawCircle(context, x, y, PEG_RADIUS + 5);
        });
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

        if (pegX !== lastMousePosition.current.pegX || pegY !== lastMousePosition.current.pegY ) {
            lastMousePosition.current = { pegX, pegY };
        } else {
            return;
        }

        const coordinates = calculatePegCoordinates(nativeEvent);
        props.setMouseCoordinates(coordinates);

        if (leftMousePressed.current) {
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
            forceUpdate();
        } else if (rightMousePressed.current) {
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, null);
            forceUpdate();
        }
    };

    const onMouseDown = (event) => {
        if (event.button === 0) {
            leftMousePressed.current = true;
            const nativeEvent = event.nativeEvent;
            const coordinates = calculatePegCoordinates(nativeEvent);
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
            forceUpdate();
        } else if (event.button === 2) {
            rightMousePressed.current = true;
            const nativeEvent = event.nativeEvent;
            const coordinates = calculatePegCoordinates(nativeEvent);
            project.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, null);
            forceUpdate();
        } else {
            return;
        }
    };

    const onMouseUp = (event) => {
        if (event.button === 0) {
            leftMousePressed.current = false;
        } else if (event.button === 2) {
            rightMousePressed.current =false;
        }
    };

    return (
        <div className={props.className} style={{position: 'absolute', top: 0, left: 0}}>
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
};

BeadCanvas.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BeadCanvas);