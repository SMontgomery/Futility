import PropTypes from 'prop-types';
import React, { useContext, useReducer } from 'react';
import Project from '../project/project';
import WorkSurface from './WorkSurface';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import StatusBar from './StatusBar';
import BeadManager from '../project/beadmanager';
import { projectReducer } from '../state/reducers/projectreducer';
import RightSideBar from './RightSideBar';
import brands from '../project/brands';

const ProjectContext = React.createContext();
const project = new Project(10, 10, 2, 2);
const beadManager = new BeadManager();
const defaultBrand = brands.PERLER;
const initialState = {
    selectedBrand: defaultBrand,
    selectedBead: beadManager.getBeads(defaultBrand)[0]
};

function Application(props) {
    const contextValue = useReducer(projectReducer, initialState);

    return (
        <ProjectContext.Provider value={contextValue}>
            <div className="page">
                <Header className='header' appName={props.appName} />

                <LeftSideBar className='left-sidebar' beadManager={beadManager} />

                <WorkSurface className='main' project={project} />

                <RightSideBar className='right-sidebar' />

                <StatusBar className='footer' />
            </div>
        </ProjectContext.Provider>
    );
}

const useProject = () => {
    return useContext(ProjectContext);
};

Application.propTypes = {
    appName: PropTypes.string.isRequired
};

export { useProject };
export default Application;

