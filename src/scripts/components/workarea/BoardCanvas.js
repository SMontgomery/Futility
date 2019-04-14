import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { fillCircle, drawLine, fillRectangle } from '../../utils/canvasUtils';
import backgroundTypes from '../../state/backgroundTypes';

const PEG_RADIUS = 1.5;

function BoardCanvas(props) {
    const { backgroundSettings, pegGridSettings, lineGridSettings, boardGridSettings, customGridSettings } = props;
    const { boardWidth, boardHeight, beadSize } = props;
    const { requiredWidth, requiredHeight } = props;

    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Draw background
        if (backgroundSettings.backgroundType === backgroundTypes.CHECKERBOARD) {
            context.fillStyle = backgroundSettings.primaryColor;
            fillRectangle(context, 0, 0, canvas.width, canvas.height, backgroundSettings.primaryColor);

            const halfBeadSize = beadSize / 2;
            for(let x = 0; x < canvas.width; x += beadSize) {
                for(let y = 0; y < canvas.height; y += beadSize) {
                    fillRectangle(context, x, y, halfBeadSize, halfBeadSize, backgroundSettings.secondaryColor);
                    fillRectangle(context, x + halfBeadSize, y + halfBeadSize, halfBeadSize, halfBeadSize, backgroundSettings.secondaryColor);
                }
            }
        } else {
            fillRectangle(context, 0, 0, canvas.width, canvas.height, backgroundSettings.primaryColor);
        }

        // Draw pegs
        if (pegGridSettings.enabled) {
            for (let x = beadSize / 2; x < canvas.width; x += beadSize) {
                for (let y = beadSize / 2; y < canvas.height; y += beadSize) {
                    fillCircle(context, x, y, PEG_RADIUS, pegGridSettings.color);
                }
            }
        }

        // Draw line grid
        if (lineGridSettings.enabled) {
            // Y lines
            for (let x = 0; x <= canvas.width; x += beadSize) {
                drawLine(context, x, .5, x, canvas.height, 1, lineGridSettings.color);
            }

            // X lines
            for (let y = 0; y <= canvas.height; y += beadSize) {
                drawLine(context, .5, y, canvas.width, y, 1, lineGridSettings.color);
            }
        }

        // Draw custom grid
        if (customGridSettings.enabled) {
            // Y lines
            for (let x = 0; x <= canvas.width; x += beadSize * customGridSettings.size) {
                drawLine(context, x, .5, x, canvas.height, 1, customGridSettings.color);
            }

            // X lines
            for (let y = 0; y <= canvas.height; y += beadSize * customGridSettings.size) {
                drawLine(context, .5, y, canvas.width, y, 1, customGridSettings.color);
            }
        }

        // Draw board grid
        if (boardGridSettings.enabled) {
            // Y lines
            for (let x = 0; x <= canvas.width; x += beadSize * boardHeight) {
                drawLine(context, x, .5, x, canvas.height, 1, boardGridSettings.color);
            }

            // X lines
            for (let y = 0; y <= canvas.height; y += beadSize * boardWidth) {
                drawLine(context, .5, y, canvas.width, y, 1, boardGridSettings.color);
            }
        }
    });

    return (
        <div style={{position: 'absolute', top: 0, left: 0}}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredHeight}
            />
        </div>
    );
}

BoardCanvas.propTypes = {
    backgroundSettings: PropTypes.object.isRequired,
    beadSize: PropTypes.number.isRequired,
    boardGridSettings: PropTypes.object.isRequired,
    boardHeight: PropTypes.number.isRequired,
    boardWidth: PropTypes.number.isRequired,
    boardsAcross: PropTypes.number.isRequired,
    boardsDown: PropTypes.number.isRequired,
    customGridSettings: PropTypes.object.isRequired,
    lineGridSettings: PropTypes.object.isRequired,
    pegGridSettings: PropTypes.object.isRequired,
    requiredHeight: PropTypes.number.isRequired,
    requiredWidth: PropTypes.number.isRequired
};

export default (BoardCanvas);