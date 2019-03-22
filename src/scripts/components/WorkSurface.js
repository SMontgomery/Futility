import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import Project from '../project/project';
import { drawCircle, drawLine } from '../utils/draw';
import { throttle } from 'lodash';
import { setMouseCoordinates } from '../state/actions/projectActions';

const PEG_RADIUS = 1.5;

function WorkSurface(props) {
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

    const calculatePegCoordinates = (canvasX, canvasY) => {
        // Determine overall peg x/y coordinates
        const pegX = Math.trunc(canvasX / beadSize);
        const pegY = Math.trunc(canvasY / beadSize);

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
        throttleMouseMove(() =>
            props.setMouseCoordinates(calculatePegCoordinates(nativeEvent.offsetX, nativeEvent.offsetY)));
    };

    return (
        <div className={props.className}>
            <canvas
                ref={canvasRef}
                width={requiredWidth}
                height={requiredWeight}
                onMouseMove={onMouseMove}
            />
        </div>
    );
}

const throttleMouseMove = throttle(func => func(), 125);

WorkSurface.propTypes = {
    className: PropTypes.string,
    project: PropTypes.instanceOf(Project).isRequired,
    setMouseCoordinates: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    setMouseCoordinates: (coordinates) => dispatch(setMouseCoordinates(coordinates))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkSurface);