import PropTypes from 'prop-types';
import React from 'react';
import { Button,  Icon, Popover } from '@blueprintjs/core';
import { ChromePicker} from 'react-color';

function ColorPicker(props) {
    const [selectedColor, setSelectedColor] = React.useState(props.color || '#000000');

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        if (props.onChange) {
            props.onChange(color.hex);
        }
    };

    const icon = (<Icon icon='full-circle' color={selectedColor} />);
    const picker = (<ChromePicker color={selectedColor} onChange={handleColorChange}/>);

    return (
        <Popover
            content={picker}
            targetTagName='div'
            position='right'
        >
            <Button
                fill={props.buttonFill}
                alignText='left'
                icon={icon}
                rightIcon='caret-down'
                text={props.text || selectedColor}
            />
        </Popover>
    );
}

ColorPicker.propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.string,
    buttonFill: PropTypes.bool
};

export default ColorPicker;

