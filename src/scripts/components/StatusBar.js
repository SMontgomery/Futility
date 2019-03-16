import PropTypes from 'prop-types';
import React from 'react';

function StatusBar(props) {
    return (
        <div className={props.className}>
            Status
        </div>
    );
}

StatusBar.propTypes = {
    className: PropTypes.string
};

export default StatusBar;

