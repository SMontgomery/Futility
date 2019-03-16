import PropTypes from 'prop-types';
import React from 'react';
import Project from '../project/project';
import WorkSurface from './WorkSurface';
import Header from './Header';

function Application(props) {
    const project = new Project(10, 10, 2, 2);

    return (
        <React.Fragment>
            <Header appName={props.appName} />

            <WorkSurface project={project} />
        </React.Fragment>
    );
}

Application.propTypes = {
    appName: PropTypes.string.isRequired
};

export default Application;

