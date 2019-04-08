import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

const ColorButton = styled.div`
    background-color: ${props => props.color};
    display: inline-block;
    width: 3rem;
    height: 3rem;
    margin: 0;
    padding: 0;
    border: 1px solid black;
`;

function SelectedBead(props) {
    return (
        <div>
            <ColorButton color={props.selectedBead.color}>&nbsp;</ColorButton>
            <div><Translate id={`brand.${props.selectedBead.brand}`}/></div>
            <div>{props.selectedBead.name}</div>
        </div>
    );
}

SelectedBead.propTypes = {
    selectedBead: PropTypes.object.isRequired
};

export default SelectedBead;