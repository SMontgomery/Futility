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
                    <Popover title='Pencil Tool'>
                        Left Mouse - Place bead on board.
                        Right Mouse - Remove bead from board.
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
    setTool: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    selectedTool: state.ui.selectedTool
});

const mapDispatchToProps = (dispatch) => ({
    setTool: (tool) => dispatch(setSelectedTool(tool))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPalette);