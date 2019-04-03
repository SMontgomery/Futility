import PropTypes from 'prop-types';
import React from 'react';
import { Card, H6 } from '@blueprintjs/core';
import styled from 'styled-components';

const CardBody = styled.div`
    padding-left: 1rem;
`;

function Section(props) {
    return (
        <Card>
            <H6>{props.title}</H6>

            <CardBody>
                {props.children}
            </CardBody>
        </Card>
    );
}

Section.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
};

Section.defaultProps = {
    title: 'Title',
    children: 'Body'
};

export default Section;

