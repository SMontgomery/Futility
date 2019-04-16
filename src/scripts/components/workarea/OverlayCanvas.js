import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import tools from '../../state/tools';
import {drawX, fillCircle, fillRectangle, strokeCircle, strokeRectangle} from '../../utils/canvasUtils';
import beadShapes from '../../state/beadShapes';
import {determineLineCoordinates} from './utils/lineTool';
import {calcBoardCoordsFromPegCoords, calcCoordinates, createBoardData} from './utils/coordinateUtils';

const overlayAddBorderColor = '#0000ff';
const overlayAddBackgroundColor = '#0000ff11';
const overlayRemoveBorderColor = '#ff0000';
const overlayRemoveBackgroundColor = '#ff000011';

const OverlayCanvas = (props) => {
  const [toolOverlay, setToolOverlay] = useState(undefined);
  const leftMousePressed = useRef(false);
  const rightMousePressed = useRef(false);
  const lastMousePosition = useRef(undefined);
  const canvasRef = useRef();

  const {boardWidth, boardHeight, boardsAcross, boardsDown, beadSize} = props;
  const {requiredWidth, requiredHeight} = props;
  const halfBeadSize = beadSize / 2;
  const boardData = createBoardData(boardWidth, boardHeight, boardsAcross, boardsDown, beadSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw overlay
    if (toolOverlay) {
      // Determine canvas coordinates
      let overlayStartX = toolOverlay.start.canvas.x;
      let overlayStartY = toolOverlay.start.canvas.y;
      let overlayEndX = toolOverlay.end.canvas.x;
      let overlayEndY = toolOverlay.end.canvas.y;

      if (overlayStartX <= overlayEndX) {
        overlayStartX -= halfBeadSize;
        overlayEndX += halfBeadSize;
      } else {
        overlayStartX += halfBeadSize;
        overlayEndX -= halfBeadSize;
      }

      if (overlayStartY <= overlayEndY) {
        overlayStartY -= halfBeadSize;
        overlayEndY += halfBeadSize;
      } else {
        overlayStartY += halfBeadSize;
        overlayEndY -= halfBeadSize;
      }

      const width = overlayEndX - overlayStartX;
      const height = overlayEndY - overlayStartY;
      const backgroundColor = toolOverlay.type === 'ADD' ? overlayAddBackgroundColor : overlayRemoveBackgroundColor;
      const borderColor = toolOverlay.type === 'ADD' ? overlayAddBorderColor : overlayRemoveBorderColor;

      fillRectangle(context, overlayStartX, overlayStartY, width, height, backgroundColor);
      strokeRectangle(context, overlayStartX, overlayStartY, width, height, 1, borderColor);

      // Draw beads
      toolOverlay.pegs.forEach((coordinates) => {
        const x = (coordinates.x * beadSize) + halfBeadSize;
        const y = (coordinates.y * beadSize) + halfBeadSize;

        if (toolOverlay.type === 'ADD') {
          switch (props.beadSettings.beadShape) {
            case beadShapes.ROUND:
              fillCircle(context, x, y, beadSize / 2, props.selectedBead.color);
              break;
            case beadShapes.SQUARE:
              fillRectangle(context, x - halfBeadSize, y - halfBeadSize, beadSize, beadSize, props.selectedBead.color);
              break;
            case beadShapes.NORMAL:
            default:
              strokeCircle(context, x, y, beadSize / 2, beadSize / 3, props.selectedBead.color);
              break;
          }

          strokeRectangle(context, x - halfBeadSize, y - halfBeadSize, beadSize, beadSize, 1, borderColor);
        } else {
          strokeRectangle(context, x - halfBeadSize, y - halfBeadSize, beadSize, beadSize, 1, borderColor);
          drawX(context, x - halfBeadSize, y - halfBeadSize, x + halfBeadSize, y + halfBeadSize, 1, borderColor);
        }
      });
    }
  });

  const handleUseTool = (coordinates, start = false, end = false) => {
    switch (props.selectedTool) {
      case tools.LINE: {
        handleUseToolWithOverlay(coordinates, start, end);
        return;
      }

      case tools.PENCIL: {
        if (leftMousePressed.current && props.placeBead && props.selectedBead) {
          props.placeBead(coordinates.board, props.selectedBead);
        } else if (rightMousePressed.current && props.removeBead) {
          props.removeBead(coordinates.board);
        }
        return;
      }

      default:
                // Nothing to do
    }
  };

  const handleUseToolWithOverlay = (coordinates, start, end) => {
    const overlayStart = toolOverlay ? toolOverlay.start.peg : coordinates.peg;
    const overlayEnd = coordinates.peg;

    let coordinatesArray = [];
    switch (props.selectedTool) {
      case tools.LINE:
        coordinatesArray = determineLineCoordinates(overlayStart.pegX, overlayStart.pegY, overlayEnd.pegX,
            overlayEnd.pegY);
        break;
      default:
        // Nothing to do
        return;
    }

    if (start) {
      setToolOverlay({
        start: coordinates,
        end: coordinates,
        type: leftMousePressed.current ? 'ADD' : 'REMOVE',
        pegs: coordinatesArray,
      });
    } else if (end) {
      if (toolOverlay) {
        const beadPlacements = coordinatesArray.map((coordinates) => {
          const boardCoordinates = calcBoardCoordsFromPegCoords(coordinates.x, coordinates.y, boardData);
          return {...boardCoordinates, bead: (toolOverlay.type === 'ADD') ? props.selectedBead : null};
        });

        if (beadPlacements.length > 0) {
          if (toolOverlay.type === 'ADD') {
            props.placeBeads(beadPlacements);
          } else {
            props.removeBeads(beadPlacements);
          }
        }
      }

      setToolOverlay(undefined);
    } else {
      setToolOverlay({
        ...toolOverlay,
        end: coordinates,
        pegs: coordinatesArray,
      });
    }
  };

  const onMouseDown = (event) => {
    if (event.button === 0) {
      leftMousePressed.current = true;
      rightMousePressed.current = false;
    } else if (event.button === 2) {
      rightMousePressed.current = true;
      leftMousePressed.current = false;
    } else {
      return;
    }

    const coordinates = calcCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, boardData);
    handleUseTool(coordinates, true);
  };

  const onMouseMove = (event) => {
    const coordinates = calcCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, boardData);

    if (lastMousePosition.current) {
      if (coordinates.peg.pegX === lastMousePosition.current.peg.pegX &&
                    coordinates.peg.pegY === lastMousePosition.current.peg.pegY) {
        return;
      }
    }

    lastMousePosition.current = coordinates;

    if (props.setMouseCoordinates) {
      props.setMouseCoordinates(coordinates);
    }

    if (leftMousePressed.current || rightMousePressed.current) {
      handleUseTool(coordinates);
    }
  };

  const onMouseUp = (event) => {
    if (event.button === 0) {
      leftMousePressed.current = false;
    } else if (event.button === 2) {
      rightMousePressed.current =false;
    }

    const coordinates = calcCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, boardData);
    handleUseTool(coordinates, false, true);
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
        onContextMenu={(e) => e.preventDefault()}
      />

    </div>
  );
};

OverlayCanvas.propTypes = {
  beadSettings: PropTypes.object.isRequired,
  beadSize: PropTypes.number.isRequired,
  beads: PropTypes.array.isRequired,
  boardHeight: PropTypes.number.isRequired,
  boardWidth: PropTypes.number.isRequired,
  boards: PropTypes.array.isRequired,
  boardsAcross: PropTypes.number.isRequired,
  boardsDown: PropTypes.number.isRequired,
  placeBead: PropTypes.func,
  placeBeads: PropTypes.func,
  removeBead: PropTypes.func,
  removeBeads: PropTypes.func,
  requiredHeight: PropTypes.number.isRequired,
  requiredWidth: PropTypes.number.isRequired,
  selectedBead: PropTypes.object,
  selectedTool: PropTypes.string.isRequired,
  setMouseCoordinates: PropTypes.func,
};

export default OverlayCanvas;
