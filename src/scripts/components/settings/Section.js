import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';

function Section(props) {
    return (
        <Card>
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                {props.children}
            </Card.Body>
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

