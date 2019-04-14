import PropTypes from 'prop-types';
import React from 'react';
import { ChromePicker} from 'react-color';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ButtonContent = styled.span`
    white-space: nowrap;
`;

const ColorIcon = styled(FontAwesomeIcon)`
    color: ${props => props.color};
    margin-right: .5rem;
    border: 1px solid black;
`;

function ColorPicker(props) {
    const [selectedColor, setSelectedColor] = React.useState(props.color || '#000000');

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        if (props.onChange) {
            props.onChange(color.hex);
        }
    };

    const picker = (
        <Popover>
            <ChromePicker color={selectedColor} onChange={handleColorChange}/>
        </Popover>
    );

    return (
        <OverlayTrigger trigger={props.trigger} placement={props.placement} overlay={picker}>
            <Button variant='secondary' size='sm'>
                <ButtonContent>
                    <ColorIcon icon={faSquare} color={selectedColor}/>
                    {props.text || selectedColor}
                </ButtonContent>
            </Button>
        </OverlayTrigger>
    );
}

ColorPicker.propTypes = {
    buttonFill: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
    placement: PropTypes.string,
    text: PropTypes.string,
    trigger: PropTypes.string
};

export default ColorPicker;

ColorPicker.defaultProps = {
    placement: 'right',
    trigger: 'click'
};