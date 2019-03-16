import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Project from '../project/project';
import { drawCircle, drawLine } from '../utils/draw';

const PEG_RADIUS = 1.5;

function WorkSurface(props) {
    const canvasRef = useRef();
    const beadSize = 20;
    const backgroundColor = 'white';
    const pegColor = 'gray';
    const lineGridColor = 'gray';
    const boardGridColor = 'blue';

    const requiredWidth = beadSize * props.project.getPegsAcross();
    const requiredWeight = beadSize * props.project.getPegsDown();

    useEffect(() => {
        const { project } = props;
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
        for (let x = 0; x <= canvas.width; x += beadSize * project.boardHeight) {
            drawLine(context, x, .5, x, canvas.height);
        }

        // X lines
        for (let y = 0; y <= canvas.height; y += beadSize * project.boardWidth) {
            drawLine(context, .5, y, canvas.width, y);
        }
    });

    return (
        <div>
            <canvas ref={canvasRef} width={requiredWidth} height={requiredWeight} />
        </div>
    );

}

WorkSurface.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired
};

export default WorkSurface;