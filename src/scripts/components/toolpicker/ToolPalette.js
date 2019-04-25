import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {faSlash} from '@fortawesome/free-solid-svg-icons/faSlash';
import {setSelectedTool} from '../../state/actions/uiActions';
import tools from '../../state/tools';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {getTranslate, Translate} from 'react-localize-redux';

const tooltipShowDelay = 750;
const tooltipHideDelay = 0;

const Palette = styled.div`
    line-height: 0;
`;

const ToolButton = ({selectedTool, ...otherProps}) => (
  <Button {...otherProps}>{otherProps.children}</Button>
);

ToolButton.propTypes = {
  children: PropTypes.any,
  selectedTool: PropTypes.bool,
};

const StyledToolButton = styled(ToolButton)`
    color: ${(props) => props.selectedTool ? 'white' : ''};
     
`;

function ToolPalette(props) {
  return (
    <Palette>
      <OverlayTrigger
        trigger='hover'
        delay={{show: tooltipShowDelay, hide: tooltipHideDelay}}
        placement='right'
        overlay={
          <Popover title={props.translate(`tool.${tools.PENCIL}.name`)}>
            <Translate id={`tool.${tools.PENCIL}.description`}/>
          </Popover>
        }
      >
        <StyledToolButton
          size='lg'
          selectedTool={props.selectedTool === tools.PENCIL}
          variant={props.selectedTool === tools.PENCIL ? 'secondary' : 'outline-secondary'}
          onClick={() => props.selectedTool !== tools.PENCIL && props.setTool(tools.PENCIL)}
        >
          <FontAwesomeIcon icon={faPencilAlt} fixedWidth/>
        </StyledToolButton>
      </OverlayTrigger>

      <OverlayTrigger
        trigger='hover'
        delay={{show: tooltipShowDelay, hide: tooltipHideDelay}}
        placement='right'
        overlay={
          <Popover title={props.translate(`tool.${tools.LINE}.name`)}>
            <Translate id={`tool.${tools.LINE}.description`}/>
          </Popover>
        }
      >
        <StyledToolButton
          size='lg'
          selectedTool={props.selectedTool === tools.LINE}
          variant={props.selectedTool === tools.LINE ? 'secondary' : 'outline-secondary'}
          onClick={() => props.selectedTool !== tools.LINE && props.setTool(tools.LINE)}
        >
          <FontAwesomeIcon icon={faSlash} flip='horizontal' fixedWidth />
        </StyledToolButton>
      </OverlayTrigger>

    </Palette>
  );
}

ToolPalette.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setTool: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedTool: state.ui.selectedTool,
  translate: getTranslate(state.localize),
});

const mapDispatchToProps = (dispatch) => ({
  setTool: (tool) => dispatch(setSelectedTool(tool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPalette);

