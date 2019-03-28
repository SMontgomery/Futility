import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, Label } from '@blueprintjs/core';
import ColorPicker from './ColorPicker';

const GridSettings = (props) => (
    <div className={props.className}>
        <Label>{props.label}</Label>

        <Checkbox
            css={`margin-left: auto;`}
            checked={props.enabled}
            label="Enabled"
            onChange={props.onEnabledChange}
        />

        <ColorPicker
            css={`margin-left: 5rem;`}
            text='Grid Color'
            color={props.color}
            onChange={props.onColorChange}
        />
    </div>
);

GridSettings.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onEnabledChange: PropTypes.func.isRequired
};

const StyledGridSettings = styled(GridSettings)`
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    margin-top: .75rem;
`;

export default StyledGridSettings;
