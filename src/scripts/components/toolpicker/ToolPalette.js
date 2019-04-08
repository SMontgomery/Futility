import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt } from 'react-icons/fa';
import { setSelectedTool } from '../../state/actions/uiActions';
import tools from '../../state/tools';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { getTranslate, Translate } from 'react-localize-redux';

const Palette = styled.div`
    line-height: 0;
`;

const ToolButton = styled(Button)`
    color: ${props => props.selectedTool ? 'white' : ''};
     
`;

function ToolPalette(props) {

    return (
        <Palette>
            <OverlayTrigger
                trigger='hover'
                delay={{ show: 500, hide: 0 }}
                placement='right'
                overlay={
                    <Popover title={props.translate(`tool.${tools.PENCIL}.name`)}>
                        <Translate id={`tool.${tools.PENCIL}.description`}/>
                    </Popover>
                }
            >
                <ToolButton
                    size='lg'
                    selectedTool={props.selectedTool === tools.PENCIL}
                    variant={props.selectedTool === tools.PENCIL ? 'secondary' : 'outline-secondary'}
                    onClick={() => props.selectedTool !== tools.PENCIL && props.setTool(tools.PENCIL)}
                >
                    <FaPencilAlt />
                </ToolButton>
            </OverlayTrigger>
        </Palette>
    );
}

ToolPalette.propTypes = {
    selectedTool: PropTypes.string.isRequired,
    setTool: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    selectedTool: state.ui.selectedTool,
    translate: getTranslate(state.localize)
});

const mapDispatchToProps = (dispatch) => ({
    setTool: (tool) => dispatch(setSelectedTool(tool))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPalette);