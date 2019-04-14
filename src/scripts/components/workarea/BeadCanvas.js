import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { fillCircle, fillRectangle, strokeCircle } from '../../utils/canvasUtils';
import { getAllBeads } from '../../project/projectUtils';
import beadShapes from '../../state/beadShapes';
import { calcCanvasCoordsFromBoardCoords, createBoardData } from './utils/coordinateUtils';

const BeadCanvas = (props) => {
    const { boards, beads, beadSize, boardWidth, boardHeight, boardsAcross, boardsDown } = props;
    const { requiredWidth, requiredHeight } = props;
    const halfBeadSize = beadSize / 2;
    const boardData = createBoardData(boardWidth, boardHeight, boardsAcross, boardsDown, beadSize);

    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear background
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw beads
        getAllBeads(boards,beads).forEach(beadInfo => {
            const { x, y } = calcCanvasCoordsFromBoardCoords(beadInfo.boardIndex, beadInfo.boardX, beadInfo.boardY, boardData);
            switch(props.beadSettings.beadShape) {
                case beadShapes.ROUND:
                    fillCircle(context, x, y, halfBeadSize, beadInfo.bead.color);
                    break;
                case beadShapes.SQUARE:
                    fillRectangle(context, x - halfBeadSize, y - halfBeadSize, beadSize, beadSize, beadInfo.bead.color);
                    break;
                case beadShapes.NORMAL:
                default:
                    strokeCircle(context, x, y, halfBeadSize, beadSize / 3, beadInfo.bead.color);
                    break;
            }
        });
    });

    return (
        <div style={{position: 'absolute', top: 0, left: 0}}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredHeight}
                onContextMenu={e => e.preventDefault()}
            />
        </div>
    );
};

BeadCanvas.propTypes = {
    beads: PropTypes.array.isRequired,
    beadSettings: PropTypes.object.isRequired,
    beadSize: PropTypes.number.isRequired,
    boardHeight: PropTypes.number.isRequired,
    boardWidth: PropTypes.number.isRequired,
    boards: PropTypes.array.isRequired,
    boardsAcross: PropTypes.number.isRequired,
    boardsDown: PropTypes.number.isRequired,
    requiredHeight: PropTypes.number.isRequired,
    requiredWidth: PropTypes.number.isRequired
};

export default BeadCanvas;