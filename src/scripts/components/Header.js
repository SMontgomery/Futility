import PropTypes from 'prop-types';
import React from 'react';
import { Button, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import SettingsDialog from './settings/SettingsDialog';

function Header(props) {

    const [isDialogOpen, toggleDialog] = React.useState(false);

    return (
        <Navbar className={props.className}>
            <NavbarGroup>
                <NavbarHeading>{ props.appName }</NavbarHeading>
                <Button onClick={() => toggleDialog(isOpen => !isOpen)}>Settings</Button>
                <SettingsDialog isOpen={isDialogOpen} closeDialog={() => toggleDialog(!isDialogOpen)} />
            </NavbarGroup>
        </Navbar>
    );
}

Header.propTypes = {
    appName: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Header;

