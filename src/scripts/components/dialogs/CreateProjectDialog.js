import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Translate} from 'react-localize-redux';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import {projectConstants} from '../../constants/projectConstants';

const minBoardsAnyDirection = projectConstants.minBoardsAnyDirection;
const maxBoardsAnyDirection = projectConstants.maxBoardsAnyDirection;

function CreateProjectDialog(props) {
  const [boardsAcross, setBoardsAcross] = React.useState(projectConstants.defaultBoardsAnyDirection);
  const [boardsDown, setBoardsDown] = React.useState(projectConstants.defaultBoardsAnyDirection);
  const [boardsAcrossError, setBoardsAcrossError] = React.useState(undefined);
  const [boardsDownError, setBoardsDownError] = React.useState(undefined);

  const handleSubmit = () => {
    let noErrors = true;

    if (!boardsAcross || boardsAcross < minBoardsAnyDirection || boardsAcross > maxBoardsAnyDirection) {
      setBoardsAcrossError({id: 'create.widthError', data: {min: minBoardsAnyDirection, max: maxBoardsAnyDirection}});
      noErrors = false;
    } else {
      setBoardsAcrossError(undefined);
    }

    if (!boardsDown || boardsDown < minBoardsAnyDirection || boardsDown > maxBoardsAnyDirection) {
      setBoardsDownError({id: 'create.heightError', data: {min: minBoardsAnyDirection, max: maxBoardsAnyDirection}});
      noErrors = false;
    } else {
      setBoardsDownError(undefined);
    }

    if (noErrors) {
      props.createProject(boardsAcross, boardsDown);
      props.closeDialog();
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          <Translate id='create.title'/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Row>
            <Form.Group as={Col} controlId='formGroupBoardsAcross'>
              <Form.Label><Translate id='create.boardsAcross' /></Form.Label>
              <Form.Control
                required
                type='number'
                value={boardsAcross}
                onChange={(e) => setBoardsAcross(e.target.valueAsNumber)}
                isInvalid={!!boardsAcrossError}
              />
              <Form.Control.Feedback type='invalid'>
                {boardsAcrossError && (
                  <Translate id={boardsAcrossError.id} data={boardsAcrossError.data} />
                )}
              </Form.Control.Feedback>
              <Form.Text className='text-muted'>
                <Translate id='create.widthNotice' data={{width: boardsAcross * projectConstants.boardPegsAcross}}/>
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId='formGroupBoardsDown'>
              <Form.Label><Translate id='create.boardsDown' /></Form.Label>
              <Form.Control
                required
                type='number'
                value={boardsDown}
                onChange={(e) => setBoardsDown(e.target.valueAsNumber)}
                isInvalid={!!boardsDownError}
              />
              <Form.Control.Feedback type='invalid'>
                {boardsDownError && (
                  <Translate id={boardsDownError.id} data={boardsDownError.data} />
                )}
              </Form.Control.Feedback>
              <Form.Text className='text-muted'>
                <Translate id='create.heightNotice' data={{height: boardsDown * projectConstants.boardPegsDown}}/>
              </Form.Text>
            </Form.Group>
          </Form.Row>
        </Form>

        {props.showOverwriteWarning && (
          <Alert variant='warning'>
            <Alert.Heading><Translate id='create.warning.title'/></Alert.Heading>
            <Translate id='create.warning.message'/>
          </Alert>
        )}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeDialog}>
          <Translate id='common.cancel'/>
        </Button>
        <Button onClick={handleSubmit}>
          <Translate id='create.createButton'/>
        </Button>
      </Modal.Footer>
    </>
  );
}

CreateProjectDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  showOverwriteWarning: PropTypes.bool,
  createProject: PropTypes.func.isRequired,
};

export default CreateProjectDialog;
