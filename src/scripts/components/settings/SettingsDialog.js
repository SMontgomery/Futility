import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Classes, Card, Divider, H6, Label, Radio, RadioGroup, Slider, Dialog } from '@blueprintjs/core';
import backgroundTypes from '../../state/backgroundTypes';
import beadShapes from '../../state/beadShapes';
import ColorPicker from './ColorPicker';
import {
    restoreDefaultSettings,
    setBackgroundPrimaryColor,
    setBackgroundSecondaryColor,
    setBackgroundType,
    setBeadShape,
    setBoardGridColor,
    setBoardGridEnabled, setCustomGridColor, setCustomGridEnabled, setCustomGridSize,
    setLineGridColor,
    setLineGridEnabled,
    setPegGridColor,
    setPegGridEnabled
} from '../../state/actions/settingsActions';
import GridSettings from './GridSettings';

function SettingsDialog(props) {
    const [backgroundType, setBackgroundType] = useState(props.backgroundType);
    const [backgroundPrimaryColor, setBackgroundPrimaryColor] = useState(props.backgroundPrimaryColor);
    const [backgroundSecondaryColor, setBackgroundSecondaryColor] = useState(props.backgroundSecondaryColor);
    const [beadShape, setBeadShape] = useState(props.beadShape);
    const [pegGridEnabled, setPegGridEnabled] = useState(props.pegGridEnabled);
    const [pegGridColor, setPegGridColor] = useState(props.pegGridColor);
    const [lineGridEnabled, setLineGridEnabled] = useState(props.lineGridEnabled);
    const [lineGridColor, setLineGridColor] = useState(props.lineGridColor);
    const [boardGridEnabled, setBoardGridEnabled] = useState(props.boardGridEnabled);
    const [boardGridColor, setBoardGridColor] = useState(props.boardGridColor);
    const [customGridEnabled, setCustomGridEnabled] = useState(props.customGridEnabled);
    const [customGridColor, setCustomGridColor] = useState(props.customGridColor);
    const [customGridSize, setCustomGridSize] = useState(props.customGridSize);

    const renderBackgroundSettings = () => (
        <StyledCard>
            <H6>Background Type</H6>

            <CardBody>
                <RadioGroup
                    css={`display: flex; justify-content: space-evenly;`}
                    inline='true'
                    onChange={(event) => setBackgroundType(event.target.value)}
                    selectedValue={backgroundType}
                >
                    <Radio label='Plain' value={backgroundTypes.PLAIN} />
                    <Radio label='Checkerboard' value={backgroundTypes.CHECKERBOARD} />
                </RadioGroup>

                <div css={`display: flex; justify-content: space-evenly;`}>
                    <ColorPicker
                        text='Primary Color'
                        color={backgroundPrimaryColor}
                        onChange={(color) => setBackgroundPrimaryColor(color)}
                    />
                    <ColorPicker
                        text='Secondary Color'
                        color={backgroundSecondaryColor}
                        onChange={(color) => setBackgroundSecondaryColor(color)}
                    />
                </div>
            </CardBody>
        </StyledCard>
    );

    const renderBeadSettings = () => (
        <StyledCard>
            <H6>Bead Shape</H6>

            <CardBody>
                <RadioGroup
                    css={`display: flex; justify-content: space-evenly;`}
                    inline='true'
                    onChange={(event) => setBeadShape(event.target.value)}
                    selectedValue={beadShape}
                >
                    <Radio label='Normal' value={beadShapes.NORMAL} />
                    <Radio label='Round' value={beadShapes.ROUND} />
                    <Radio label='Square' value={beadShapes.SQUARE} />
                </RadioGroup>
            </CardBody>
        </StyledCard>
    );

    const renderGridSettings = () => (
        <StyledCard>
            <H6>Guides</H6>
            <CardBody>
                <GridSettings
                    label='Peg Grid'
                    enabled={pegGridEnabled}
                    onEnabledChange={(event) => setPegGridEnabled(event.target.checked)}
                    color={pegGridColor}
                    onColorChange={(color) => setPegGridColor(color)}
                />
                <Divider />
                <GridSettings
                    label='Line Grid'
                    enabled={lineGridEnabled}
                    onEnabledChange={(event) => setLineGridEnabled(event.target.checked)}
                    color={lineGridColor}
                    onColorChange={(color) => setLineGridColor(color)}
                />
                <Divider />
                <GridSettings
                    label='Board Grid'
                    enabled={boardGridEnabled}
                    onEnabledChange={(event) => setBoardGridEnabled(event.target.checked)}
                    color={boardGridColor}
                    onColorChange={(color) => setBoardGridColor(color)}
                />
                <Divider />
                <GridSettings
                    label='Custom Grid'
                    enabled={customGridEnabled}
                    onEnabledChange={(event) => setCustomGridEnabled(event.target.checked)}
                    color={customGridColor}
                    onColorChange={(color) => setCustomGridColor(color)}
                />

                <div css={`display: flex; margin-left: 8.5rem; margin-top: .5rem`}>
                    <Label css={`flex: 1`}>Grid Size</Label>
                    <Slider
                        css={`flex: 3; margin-right: .5rem;`}
                        min={1}
                        max={25}
                        stepSize={1}
                        onChange={(size) => setCustomGridSize(size)}
                        value={customGridSize}
                        labelStepSize={24}
                    />
                </div>

            </CardBody>
        </StyledCard>
    );

    const handleSave = () => {
        if (beadShape !== props.beadShape) {
            props.setBeadShape(beadShape);
        }

        if (backgroundType !== props.backgroundType) {
            props.setBackgroundType(backgroundType);
        }

        if (backgroundPrimaryColor !== props.backgroundPrimaryColor) {
            props.setBackgroundPrimaryColor(backgroundPrimaryColor);
        }

        if (backgroundSecondaryColor !== props.backgroundSecondaryColor) {
            props.setBackgroundSecondaryColor(backgroundSecondaryColor);
        }

        if (pegGridEnabled !== props.pegGridEnabled) {
            props.setPegGridEnabled(pegGridEnabled);
        }

        if (pegGridColor !== props.pegGridColor) {
            props.setPegGridColor(pegGridColor);
        }

        if (lineGridEnabled !== props.lineGridEnabled) {
            props.setLineGridEnabled(lineGridEnabled);
        }

        if (lineGridColor !== props.lineGridColor) {
            props.setLineGridColor(lineGridColor);
        }

        if (boardGridEnabled !== props.boardGridEnabled) {
            props.setBoardGridEnabled(boardGridEnabled);
        }

        if (boardGridColor !== props.boardGridColor) {
            props.setBoardGridColor(boardGridColor);
        }

        if (customGridEnabled !== props.customGridEnabled) {
            props.setCustomGridEnabled(customGridEnabled);
        }

        if (customGridColor !== props.customGridColor) {
            props.setCustomGridColor(customGridColor);
        }

        if (customGridSize !== props.customGridSize) {
            props.setCustomGridSize(customGridSize);
        }

        props.closeDialog();
    };

    const handleRestore = () => {
        props.restoreDefaultSettings();
        props.closeDialog();
    };

    return (
        <Dialog
            isOpen={props.isOpen}
            title='Settings'
            onClose={props.closeDialog}
        >

            <div className={ Classes.DIALOG_BODY }>
                { renderBackgroundSettings() }
                { renderBeadSettings() }
                { renderGridSettings() }
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button text='Cancel' onClick={ props.closeDialog } />
                    <Button text='Reset to Defaults' onClick={ handleRestore } />
                    <Button text='Save' onClick={ handleSave } intent="primary" />
                </div>
            </div>
        </Dialog>
    );
}

const mapStateToProps = (state) => ({
    beadShape: state.settings.bead.beadShape,
    backgroundType: state.settings.background.backgroundType,
    backgroundPrimaryColor: state.settings.background.primaryColor,
    backgroundSecondaryColor: state.settings.background.secondaryColor,
    pegGridEnabled: state.settings.pegGrid.enabled,
    pegGridColor: state.settings.pegGrid.color,
    lineGridEnabled: state.settings.lineGrid.enabled,
    lineGridColor: state.settings.lineGrid.color,
    boardGridEnabled: state.settings.boardGrid.enabled,
    boardGridColor: state.settings.boardGrid.color,
    customGridEnabled: state.settings.customGrid.enabled,
    customGridColor: state.settings.customGrid.color,
    customGridSize: state.settings.customGrid.size
});

const mapDispatchToProps = (dispatch) => ({
    setBeadShape: (beadShape) => dispatch(setBeadShape(beadShape)),
    setBackgroundType: (backgroundType) => dispatch(setBackgroundType(backgroundType)),
    setBackgroundPrimaryColor: (color) => dispatch(setBackgroundPrimaryColor(color)),
    setBackgroundSecondaryColor: (color) => dispatch(setBackgroundSecondaryColor(color)),
    setPegGridEnabled: (enabled) => dispatch(setPegGridEnabled(enabled)),
    setPegGridColor: (color) => dispatch(setPegGridColor(color)),
    setLineGridEnabled: (enabled) => dispatch(setLineGridEnabled(enabled)),
    setLineGridColor: (color) => dispatch(setLineGridColor(color)),
    setBoardGridEnabled: (enabled) => dispatch(setBoardGridEnabled(enabled)),
    setBoardGridColor: (color) => dispatch(setBoardGridColor(color)),
    setCustomGridEnabled: (enabled) => dispatch(setCustomGridEnabled(enabled)),
    setCustomGridColor: (color) => dispatch(setCustomGridColor(color)),
    setCustomGridSize: (size) => dispatch(setCustomGridSize(size)),
    restoreDefaultSettings: () => dispatch(restoreDefaultSettings())
});

SettingsDialog.propTypes = {
    backgroundPrimaryColor: PropTypes.string.isRequired,
    backgroundSecondaryColor: PropTypes.string.isRequired,
    backgroundType: PropTypes.string.isRequired,
    beadShape: PropTypes.string.isRequired,
    boardGridColor: PropTypes.string.isRequired,
    boardGridEnabled: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    customGridColor: PropTypes.string.isRequired,
    customGridEnabled: PropTypes.bool.isRequired,
    customGridSize: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    lineGridColor: PropTypes.string.isRequired,
    lineGridEnabled: PropTypes.bool.isRequired,
    pegGridColor: PropTypes.string.isRequired,
    pegGridEnabled: PropTypes.bool.isRequired,
    restoreDefaultSettings: PropTypes.func.isRequired,
    setBackgroundPrimaryColor: PropTypes.func.isRequired,
    setBackgroundSecondaryColor: PropTypes.func.isRequired,
    setBackgroundType: PropTypes.func.isRequired,
    setBeadShape: PropTypes.func.isRequired,
    setBoardGridColor: PropTypes.func.isRequired,
    setBoardGridEnabled: PropTypes.func.isRequired,
    setCustomGridColor: PropTypes.func.isRequired,
    setCustomGridEnabled: PropTypes.func.isRequired,
    setCustomGridSize: PropTypes.func.isRequired,
    setLineGridColor: PropTypes.func.isRequired,
    setLineGridEnabled: PropTypes.func.isRequired,
    setPegGridColor: PropTypes.func.isRequired,
    setPegGridEnabled: PropTypes.func.isRequired
};

const StyledCard = styled(Card)`
    margin: .5rem 0rem;
    padding: .5rem;
`;

const CardBody = styled.div`
    padding-left: 1rem;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);

