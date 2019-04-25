import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {connect} from 'react-redux';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import StatusBar from './StatusBar';
import BeadManager from '../project/beadManager';
import RightSideBar from './RightSideBar';
import WorkArea from './workarea/WorkArea';
import {createProject} from '../state/actions/projectActions';
import {isEmpty} from 'lodash';
import {withLocalize} from 'react-localize-redux';
import englishTranslations from '../../translations/en.translations';

function Application(props) {
  useEffect(() => {
    props.initialize({
      languages: [
        {name: 'English', code: 'en'},
      ],
      options: {
        renderToStaticMarkup,
        renderInnerHtml: true,
        defaultLanguage: 'en',
      },
    });

    props.addTranslationForLanguage(englishTranslations, 'en');
  }, []);

  return (
    <>
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
    </>
  );
}

Application.propTypes = {
  addTranslationForLanguage: PropTypes.func.isRequired,
  appName: PropTypes.string.isRequired,
  beadManager: PropTypes.instanceOf(BeadManager).isRequired,
  createProject: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (boardWidth, boardHeight, boardsAcross, boardsDown) =>
    dispatch(createProject(boardWidth, boardHeight, boardsAcross, boardsDown)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(Application));

