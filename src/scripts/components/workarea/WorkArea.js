import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BoardCanvas from './BoardCanvas';
import BeadCanvas from './BeadCanvas';
import Project from '../../project/project';

function WorkArea(props) {
    return (
        <div style={{position: 'relative'}}>
            <BoardCanvas
                backgroundSettings={props.backgroundSettings}
                pegGridSettings={props.pegGridSettings}
                lineGridSettings={props.lineGridSettings}
                boardGridSettings={props.boardGridSettings}
                customGridSettings={props.customGridSettings}
                boardWidth={props.project.getBoardWidth()}
                boardHeight={props.project.getBoardHeight()}
                boardsAcross={props.project.getBoardsAcross()}
                boardsDown={props.project.getBoardsDown()}
            />
            <BeadCanvas project={props.project} />
        </div>
    );
}

WorkArea.propTypes = {
    backgroundSettings: PropTypes.object.isRequired,
    boardGridSettings: PropTypes.object.isRequired,
    customGridSettings: PropTypes.object.isRequired,
    lineGridSettings: PropTypes.object.isRequired,
    pegGridSettings: PropTypes.object.isRequired,
    project: PropTypes.instanceOf(Project).isRequired
};

const mapStateToProps = (state) => ({
    backgroundSettings: state.settings.background,
    pegGridSettings: state.settings.pegGrid,
    lineGridSettings: state.settings.lineGrid,
    boardGridSettings: state.settings.boardGrid,
    customGridSettings: state.settings.customGrid
});

export default connect(mapStateToProps)(WorkArea);

