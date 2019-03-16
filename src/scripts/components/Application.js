import PropTypes from 'prop-types';
import React from 'react';
import Project from '../project/project';
import WorkSurface from './WorkSurface';
import Header from './Header';
import SideBar from './SideBar';
import StatusBar from './StatusBar';

function Application(props) {
    const project = new Project(10, 10, 2, 2);

    return (
        <div className="page">
            <Header appName={props.appName} className='header' />

            <SideBar className='left-sidebar'/>

            <WorkSurface project={project} className='main' />

            <SideBar className='right-sidebar'/>

            <StatusBar className='footer'/>
        </div>
    );
}

Application.propTypes = {
    appName: PropTypes.string.isRequired
};

export default Application;

