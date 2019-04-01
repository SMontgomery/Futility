import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { drawCircle } from '../../utils/draw';
import { getAllBeads } from '../../project/projectUtils';

const BeadCanvas = (props) => {

    const { boardWidth, boardHeight, boardsAcross, boards, beads, beadSize } = props;
    const { requiredWidth, requiredHeight } = props;

    const leftMousePressed = useRef(false);
    const rightMousePressed = useRef(false);
    const lastMousePosition = useRef({});
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear background
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw beads

        getAllBeads(boards,beads).forEach(beadInfo => {
            const { x, y } = calculateCanvasCoordiantes(beadInfo.boardIndex, beadInfo.boardX, beadInfo.boardY);
            context.fillStyle = beadInfo.bead.color;
            drawCircle(context, x, y, beadSize / 2);
        });
    });

    const calculateCanvasCoordiantes = (board, x, y) => {
        // Determine the board x/y coordinates
        const boardX = board % boardsAcross;
        const boardY = Math.trunc(board / boardsAcross);

        // Determine the overall peg x/y coordinates
        const pegX = (boardX * boardWidth) + x;
        const pegY = (boardY * boardHeight) + y;

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
        const boardX = Math.trunc(pegX / boardWidth);
        const boardY = Math.trunc(pegY / boardHeight);

        // Determine board index
        const boardIndex = boardX + (boardY * boardsAcross);

        // Determine x/y coordinate on the board
        const x = pegX % boardWidth;
        const y = pegY % boardHeight;

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

        if (props.setMouseCoordinates) {
            props.setMouseCoordinates(coordinates);
        }

        if (leftMousePressed.current) {
            if (props.placeBead && props.selectedBead) {
                props.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
            }
        } else if (rightMousePressed.current) {
            if (props.removeBead) {
                props.removeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY);
            }
        }
    };

    const onMouseDown = (event) => {
        if (event.button === 0) {
            leftMousePressed.current = true;
            if (props.placeBead && props.selectedBead) {
                const nativeEvent = event.nativeEvent;
                const coordinates = calculatePegCoordinates(nativeEvent);
                props.placeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY, props.selectedBead);
            }
        } else if (event.button === 2) {
            rightMousePressed.current = true;
            if (props.removeBead) {
                const nativeEvent = event.nativeEvent;
                const coordinates = calculatePegCoordinates(nativeEvent);
                props.removeBead(coordinates.boardIndex, coordinates.boardX, coordinates.boardY);
            }
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
        <div style={{position: 'absolute', top: 0, left: 0}}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredHeight}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onContextMenu={e => e.preventDefault()}
            />

        </div>
    );
};

BeadCanvas.propTypes = {
    beadSize: PropTypes.number.isRequired,
    beads: PropTypes.array.isRequired,
    boardHeight: PropTypes.number.isRequired,
    boardWidth: PropTypes.number.isRequired,
    boards: PropTypes.array.isRequired,
    boardsAcross: PropTypes.number.isRequired,
    boardsDown: PropTypes.number.isRequired,
    placeBead: PropTypes.func,
    removeBead: PropTypes.func,
    requiredHeight: PropTypes.number.isRequired,
    requiredWidth: PropTypes.number.isRequired,
    selectedBead: PropTypes.object,
    setMouseCoordinates: PropTypes.func
};

export default BeadCanvas;