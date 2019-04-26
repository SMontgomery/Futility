import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Translate} from 'react-localize-redux';
import {appConstants} from '../../constants/appConstants';
import {buildConstants} from '../../constants/buildConstants';

function About(props) {
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translate id='about.title' data={{appName: appConstants.appName}}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
        <div>
          <div><Translate id='app.version' data={{version: buildConstants.version}}/></div>
          <div><Translate id='app.buildDate' data={{buildDate: buildConstants.buildDate}}/></div>
        </div>

        <div>
          <Translate
            id='app.copyright'
            data={{
              copyrightYear: appConstants.copyrightYear,
              appFounder: appConstants.appFounder,
              appName: appConstants.appName,
            }}
          />
        </div>

        <div>
          <Translate id='app.affiliation' data={{appName: appConstants.appName}}/>
        </div>

        <div>
          <span><Translate id='app.specialThanks'/>:</span>
          <ul>
            {buildConstants.directDependencies.map((dependency, index) =>
              <li key={index}>
                <a href={dependency.repository}>{dependency.name}</a>
              </li>
            )}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.closeDialog }>
          <Translate id='common.ok'/>
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
}

About.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};

export default About;
