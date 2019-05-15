import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import CreateProjectDialog from '../dialogs/CreateProjectDialog';
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux';
import {createProject, loadProject} from '../../state/actions/projectActions';
import {projectConstants} from '../../constants/projectConstants';
import {setProjectOpen} from '../../state/actions/sessionActions';
import styled from 'styled-components';
import {appConstants} from '../../constants/appConstants';
import {Translate} from 'react-localize-redux';

const BackgroundDiv = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const CenterDiv = styled.div`
  text-align: center;
  width: 25rem;
`;

function InitialPage(props) {
  const [isCreateDialogOpen, toggleCreateDialog] = React.useState(false);

  const isExistingProject = !!props.existingProject && !!props.existingProject.metadata;

  const handleCreateProject = (boardsAcross, boardsDown) => {
    props.createProject(projectConstants.boardPegsAcross, projectConstants.boardPegsDown, boardsAcross, boardsDown);
    props.setProjectOpen();
  };

  const handleContinueProject = () => {
    props.loadProject(props.existingProject);
    props.setProjectOpen();
  };

  return (
    <BackgroundDiv>
      <CenterDiv>
        <h1>{appConstants.appName}</h1>

        <p>
          {isExistingProject && (
            <Translate id='initialPage.selectOption'/>
          )}
        </p>

        <div>
          <Button onClick={() => toggleCreateDialog(true)}>
            <Translate id='initialPage.createProjectButton'/>
          </Button>
        </div>

        {isExistingProject && (
          <div>
            <Button onClick={handleContinueProject}>
              <Translate id='initialPage.continueProjectButton'/>
            </Button>
          </div>
        )}
      </CenterDiv>

      <Modal backdrop='static' show={isCreateDialogOpen} onHide={() => toggleCreateDialog(false)}>
        <CreateProjectDialog
          showOverwriteWarning={isExistingProject}
          closeDialog={() => toggleCreateDialog(false)}
          createProject={handleCreateProject}
        />
      </Modal>
    </BackgroundDiv>
  );
}

InitialPage.propTypes = {
  existingProject: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
  setProjectOpen: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  existingProject: state.project,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (boardWidth, boardHeight, boardsAcross, boardsDown) =>
    dispatch(createProject(boardWidth, boardHeight, boardsAcross, boardsDown)),
  setProjectOpen: () => dispatch(setProjectOpen(true)),
  loadProject: (existingProject) => dispatch(loadProject(existingProject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);

