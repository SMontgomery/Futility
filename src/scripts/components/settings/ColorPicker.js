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
        >
            <Button
                className={props.className}
                icon={icon}
                rightIcon='caret-down'
                text={props.text || selectedColor}
            />
        </Popover>
    );
}

ColorPicker.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.string
};

export default ColorPicker;

