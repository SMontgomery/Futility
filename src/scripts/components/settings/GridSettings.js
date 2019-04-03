import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Label } from '@blueprintjs/core';
import ColorPicker from './ColorPicker';
import { Flex, Box } from '@rebass/grid';

const GridSettings = (props) => (
    <Flex alignItems='baseline'>
        <Box width={.3}>
            <Label>{props.label}</Label>
        </Box>

        <Box width={.3}>
            <Checkbox
                checked={props.enabled}
                label="Enabled"
                onChange={props.onEnabledChange}
            />
        </Box>

        <Box width={.4}>
            <ColorPicker
                text='Grid Color'
                color={props.color}
                onChange={props.onColorChange}
            />
        </Box>
    </Flex>
);

GridSettings.propTypes = {
    color: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onEnabledChange: PropTypes.func.isRequired
};

export default GridSettings;
