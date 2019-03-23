import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useRef } from 'react';

import { drawCircle, drawLine } from '../../utils/draw';
import Project from '../../project/project';

const PEG_RADIUS = 1.5;

function BoardCanvas(props) {

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


    return (
        <div className={props.className} style={{position: 'absolute', top: 0, left: 0}}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredWeight}
            />

        </div>
    );
}

BoardCanvas.propTypes = {
    className: PropTypes.string,
    project: PropTypes.instanceOf(Project).isRequired
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardCanvas);