import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {withLocalize} from 'react-localize-redux';
import {renderToStaticMarkup} from 'react-dom/server';
import englishTranslations from './en.translations';

function AppLocalize(props) {
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
      {props.children}
    </>
  );
}

AppLocalize.propTypes = {
  addTranslationForLanguage: PropTypes.func.isRequired,
  children: PropTypes.any,
  initialize: PropTypes.func.isRequired,
};

export default withLocalize(AppLocalize);
