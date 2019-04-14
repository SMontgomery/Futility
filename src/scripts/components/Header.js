import PropTypes from 'prop-types';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import backgroundTypes from '../state/backgroundTypes';
import beadShapes from '../state/beadShapes';
import Settings from './settings/Settings';
import {
    setBackgroundType, setBeadShape, setBoardGridEnabled, setCustomGridEnabled, setLineGridEnabled, setPegGridEnabled
} from '../state/actions/settingsActions';
import { getTranslate, Translate } from 'react-localize-redux';

const StyledNavbar = styled(Navbar)`
    .nav-link {
        color: rgba(255,255,255,.5);
    }
    
    .dropright .dropdown-menu {
        margin-left: -.125rem;
    }
`;

const DropdownToggleText = styled.span`
    display: inline-block;
    width: 100%;
`;


const CheckIcon = styled(FontAwesomeIcon)`
    padding-right: .5rem;
`;

const BlankIcon = styled.span`
    display: inline-block;
    width: 1em;
    padding-right: .5em;
`;

function Header(props) {

    const [isDialogOpen, toggleDialog] = React.useState(false);
    const [isBackgroundMenuOpen, toggleBackgroundMenu] = React.useState(false);
    const [isBeadMenuOpen, toggleBeadMenu] = React.useState(false);
    const [isGuidesMenuOpen, toggleGuidesMenu] = React.useState(false);

    return (
        <React.Fragment>
            <StyledNavbar variant='dark' bg='dark' className={props.className}>
                <Navbar.Brand>
                    { props.appName }
                </Navbar.Brand>

                <NavDropdown title={props.translate('menu.edit')}>
                    <NavDropdown.Item onClick={() => toggleDialog(true)}>
                        <Translate id='menu.settings'/>
                    </NavDropdown.Item>
                </NavDropdown>

                <Dropdown as={NavItem}>
                    <Dropdown.Toggle as={NavLink}>
                        <Translate id='menu.view'/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            as={Dropdown} drop='right'
                            show={isBackgroundMenuOpen}
                            onMouseOver={() => toggleBackgroundMenu(true)}
                            onMouseLeave={() => toggleBackgroundMenu(false)}
                        >
                            <Dropdown.Toggle as='span'>
                                <DropdownToggleText>
                                    <Translate id='menu.backgrounds'/>
                                </DropdownToggleText>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => props.setBackgroundType(backgroundTypes.PLAIN)}>
                                    {props.backgroundType === backgroundTypes.PLAIN ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.plain'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setBackgroundType(backgroundTypes.CHECKERBOARD)}>
                                    {props.backgroundType === backgroundTypes.CHECKERBOARD ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.checkerboard'/>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>

                        <Dropdown.Item
                            as={Dropdown} drop='right'
                            show={isBeadMenuOpen}
                            onMouseOver={() => toggleBeadMenu(true)}
                            onMouseLeave={() => toggleBeadMenu(false)}
                        >
                            <Dropdown.Toggle as='span'>
                                <DropdownToggleText>
                                    <Translate id='menu.beads'/>
                                </DropdownToggleText>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => props.setBeadShape(beadShapes.NORMAL)}>
                                    {props.beadShape === beadShapes.NORMAL ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.normal'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setBeadShape(beadShapes.ROUND)}>
                                    {props.beadShape === beadShapes.ROUND ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.round'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setBeadShape(beadShapes.SQUARE)}>
                                    {props.beadShape === beadShapes.SQUARE ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.square'/>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>

                        <Dropdown.Item
                            as={Dropdown} drop='right'
                            show={isGuidesMenuOpen}
                            onMouseOver={() => toggleGuidesMenu(true)}
                            onMouseLeave={() => toggleGuidesMenu(false)}
                        >
                            <Dropdown.Toggle as='span'>
                                <DropdownToggleText>
                                    <Translate id='menu.guides'/>
                                </DropdownToggleText>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => props.setPegGridEnabled(!props.pegGridEnabled)}>
                                    {props.pegGridEnabled ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.pegGrid'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setLineGridEnabled(!props.lineGridEnabled)}>
                                    {props.lineGridEnabled ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.lineGrid'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setBoardGridEnabled(!props.boardGridEnabled)}>
                                    {props.boardGridEnabled ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.boardGrid'/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.setCustomGridEnabled(!props.customGridEnabled)}>
                                    {props.customGridEnabled ? (<CheckIcon icon={faCheck}/>) : (<BlankIcon />)}
                                    <Translate id='menu.customGrid'/>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

            </StyledNavbar>

            <Modal size='lg' backdrop='static' show={isDialogOpen} onHide={() => toggleDialog(false)}>
                <Settings closeDialog={() => toggleDialog(false)} />
            </Modal>
        </React.Fragment>
    );
}

Header.propTypes = {
    appName: PropTypes.string.isRequired,
    backgroundType: PropTypes.string.isRequired,
    beadShape: PropTypes.string.isRequired,
    boardGridEnabled: PropTypes.bool.isRequired,
    className: PropTypes.string,
    customGridEnabled: PropTypes.bool.isRequired,
    lineGridEnabled: PropTypes.bool.isRequired,
    pegGridEnabled: PropTypes.bool.isRequired,
    setBackgroundType: PropTypes.func.isRequired,
    setBeadShape: PropTypes.func.isRequired,
    setBoardGridEnabled: PropTypes.func.isRequired,
    setCustomGridEnabled: PropTypes.func.isRequired,
    setLineGridEnabled: PropTypes.func.isRequired,
    setPegGridEnabled: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    beadShape: state.settings.bead.beadShape,
    backgroundType: state.settings.background.backgroundType,
    pegGridEnabled: state.settings.pegGrid.enabled,
    lineGridEnabled: state.settings.lineGrid.enabled,
    boardGridEnabled: state.settings.boardGrid.enabled,
    customGridEnabled: state.settings.customGrid.enabled,
    translate: getTranslate(state.localize)
});

const mapDispatchToProps = (dispatch) => ({
    setBeadShape: (beadShape) => dispatch(setBeadShape(beadShape)),
    setBackgroundType: (backgroundType) => dispatch(setBackgroundType(backgroundType)),
    setPegGridEnabled: (enabled) => dispatch(setPegGridEnabled(enabled)),
    setLineGridEnabled: (enabled) => dispatch(setLineGridEnabled(enabled)),
    setBoardGridEnabled: (enabled) => dispatch(setBoardGridEnabled(enabled)),
    setCustomGridEnabled: (enabled) => dispatch(setCustomGridEnabled(enabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

