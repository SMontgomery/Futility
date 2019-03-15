import PropTypes from 'prop-types';
import React from 'react';
import Project from '../project/project';
import { drawCircle, drawLine } from '../utils/draw';

const PEG_RADIUS = 1.5;

export class WorkSurface extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            beadSize: 20,
            backgroundColor: 'white',
            pegColor: 'gray',
            lineGridColor: 'gray',
            boardGridColor: 'blue'
        };
    }

    componentDidMount() {
        const { project } = this.props;
        const canvas = this.refs.board;
        const context = canvas.getContext('2d');

        // Draw background
        context.fillStyle = this.state.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw pegs
        context.fillStyle = this.state.pegColor;
        for (let x = this.state.beadSize / 2; x < canvas.width; x += this.state.beadSize) {
            for (let y = this.state.beadSize / 2; y < canvas.height; y += this.state.beadSize) {
                drawCircle(context, x, y, PEG_RADIUS);
            }
        }

        // Draw line grid
        context.strokeStyle = this.state.lineGridColor;
        // Y lines
        for (let x = 0; x <= canvas.width; x += this.state.beadSize) {
            drawLine(context, x, .5, x, canvas.height);
        }

        // X lines
        for (let y = 0; y <= canvas.height; y += this.state.beadSize) {
            drawLine(context, .5, y, canvas.width, y);
        }

        // Draw board grid
        context.strokeStyle = this.state.boardGridColor;
        // Y lines
        for (let x = 0; x <= canvas.width; x += this.state.beadSize * project.boardHeight) {
            drawLine(context, x, .5, x, canvas.height);
        }

        // X lines
        for (let y = 0; y <= canvas.height; y += this.state.beadSize * project.boardWidth) {
            drawLine(context, .5, y, canvas.width, y);
        }

    }

    render() {
        const { project } = this.props;

        const requiredWidth = this.state.beadSize * project.getPegsAcross();
        const requiredWeight = this.state.beadSize * project.getPegsDown();

        return (
            <div>
                <canvas ref="board" width={requiredWidth} height={requiredWeight} />
            </div>
        );
    }

}

WorkSurface.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired
};