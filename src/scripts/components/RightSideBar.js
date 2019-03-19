import PropTypes from 'prop-types';
import React from 'react';

function RightSideBar(props) {
    return (
        <div className={props.className}>
            Side Bar 2
        </div>
    );
}

RightSideBar.propTypes = {
    className: PropTypes.string
};

export default RightSideBar;

