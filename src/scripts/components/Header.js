import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

function Header(props) {
    return (
        <Navbar className={props.className}>
            <NavbarGroup>
                <NavbarHeading>{ props.appName }</NavbarHeading>
            </NavbarGroup>
        </Navbar>
    );
}

Header.propTypes = {
    appName: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Header;

