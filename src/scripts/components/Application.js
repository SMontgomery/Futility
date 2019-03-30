import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import StatusBar from './StatusBar';
import BeadManager from '../project/beadManager';
import RightSideBar from './RightSideBar';
import WorkArea from './workarea/WorkArea';
import { createProject } from '../state/actions/projectActions';
import { isEmpty } from 'lodash';

function Application(props) {

    return (
        <React.Fragment>
            {isEmpty(props.project) ?
                (
                    <div>
                        {props.createProject(10, 10, 2, 2) && ''}
                    </div>
                ) : (
                    <div className="page">
                        <Header className='header' appName={props.appName} />

                        <LeftSideBar className='left-sidebar' beadManager={props.beadManager} />

                        <WorkArea className='main' project={props.project} />

                        <RightSideBar className='right-sidebar' />

                        <StatusBar className='footer' />
                    </div>
                )
            }
        </React.Fragment>
    );
}

Application.propTypes = {
    appName: PropTypes.string.isRequired,
    beadManager: PropTypes.instanceOf(BeadManager).isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    project: state.project
});

const mapDispatchToProps = (dispatch) => ({
    createProject: (boardWidth, boardHeight, boardsAcross, boardsDown) =>
        dispatch(createProject(boardWidth, boardHeight, boardsAcross, boardsDown))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);

