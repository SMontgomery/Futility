import PropTypes from 'prop-types';
import React from 'react';

function SideBar(props) {
    return (
        <div className={props.className}>
            Side Bar
        </div>
    );
}

SideBar.propTypes = {
    className: PropTypes.string
};

export default SideBar;

