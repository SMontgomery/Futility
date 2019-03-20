import PropTypes from 'prop-types';
import React from 'react';
import Project from '../project/project';
import WorkSurface from './WorkSurface';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import StatusBar from './StatusBar';
import BeadManager from '../project/beadmanager';
import RightSideBar from './RightSideBar';

const project = new Project(10, 10, 2, 2);

function Application(props) {

    return (
        <div className="page">
            <Header className='header' appName={props.appName} />

            <LeftSideBar className='left-sidebar' beadManager={props.beadManager} />

            <WorkSurface className='main' project={project} />

            <RightSideBar className='right-sidebar' />

            <StatusBar className='footer' />
        </div>
    );
}

Application.propTypes = {
    appName: PropTypes.string.isRequired,
    beadManager: PropTypes.instanceOf(BeadManager).isRequired
};

export default Application;

