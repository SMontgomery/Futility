import PropTypes from 'prop-types';
import React from 'react';
import BoardCanvas from './BoardCanvas';
import BeadCanvas from './BeadCanvas';
import Project from '../../project/project';

function WorkArea(props) {
    return (
        <div style={{position: 'relative'}}>
            <BoardCanvas project={props.project} />
            <BeadCanvas project={props.project} />
        </div>
    );
}

export default WorkArea;

WorkArea.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired
};