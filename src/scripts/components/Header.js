import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

function Header(props) {
    return (
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>{ props.appName }</NavbarHeading>
            </NavbarGroup>
        </Navbar>
    );
}

Header.propTypes = {
    appName: PropTypes.string.isRequired
};

export default Header;

