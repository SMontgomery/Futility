import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, Classes, Divider, Label, Radio, Slider } from '@blueprintjs/core';
import { Flex, Box } from '@rebass/grid';
import backgroundTypes from '../../state/backgroundTypes';
import beadShapes from '../../state/beadShapes';
import ColorPicker from './ColorPicker';
import GridSettings from './GridSettings';
import { WorkArea } from '../workarea/WorkArea';
import Section from './Section';
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

function Settings(props) {
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
        <Section title='Background Type'>
            <Flex flexWrap='wrap' alignItems='baseline'>
                <Box width={.45} order={1}>
                    <Radio
                        label='Plain'
                        checked={backgroundType === backgroundTypes.PLAIN}
                        onChange={() => setBackgroundType(backgroundTypes.PLAIN)}
                    />
                </Box>

                <Box width={.45} order={3}>
                    <Radio
                        label='Checkerboard'
                        checked={backgroundType === backgroundTypes.CHECKERBOARD}
                        onChange={() =>setBackgroundType(backgroundTypes.CHECKERBOARD)}
                    />
                </Box>

                <Box width={.55} order={2} css={`text-align: right`}>
                    <ColorPicker
                        text='Primary Color'
                        color={backgroundPrimaryColor}
                        onChange={(color) => setBackgroundPrimaryColor(color)}
                        buttonFill
                    />
                </Box>

                <Box width={.55} order={4} css={`text-align: right`}>
                    <ColorPicker
                        text='Secondary Color'
                        color={backgroundSecondaryColor}
                        onChange={(color) => setBackgroundSecondaryColor(color)}
                        buttonFill
                    />
                </Box>
            </Flex>
        </Section>
    );

    const renderBeadSettings = () => (
        <Section title='Bead Shape'>
            <Flex justifyContent='space-between'>
                <Box>
                    <Radio
                        label='Normal'
                        checked={beadShape === beadShapes.NORMAL}
                        onChange={() =>setBeadShape(beadShapes.NORMAL)}
                    />
                </Box>

                <Box>
                    <Radio
                        label='Round'
                        checked={beadShape === beadShapes.ROUND}
                        onChange={() =>setBeadShape(beadShapes.ROUND)}
                    />
                </Box>

                <Box>
                    <Radio
                        label='Square'
                        checked={beadShape === beadShapes.SQUARE}
                        onChange={() =>setBeadShape(beadShapes.SQUARE)}
                    />
                </Box>
            </Flex>
        </Section>
    );

    const renderGridSettings = () => (
        <Section title='Guides'>
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

            <Flex justifyContent='flex-end'>
                <Box pr={4}>
                    <Label>Grid Size</Label>
                </Box>
                <Box pr={2}>
                    <Slider
                        min={1}
                        max={25}
                        stepSize={1}
                        onChange={(size) => setCustomGridSize(size)}
                        value={customGridSize}
                        labelStepSize={24}
                    />
                </Box>
            </Flex>
        </Section>
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

    const beads = [{bead: {brand: 'PERLER', code: 'P18', name: 'Black', type: 'regular', color: '#2e2f32'}, count: 10}];
    const boards = [{'0': {'0': 0},'1': {'1': 0},'2': {'2': 0},'3': {'3': 0},'4': {'4': 0},'5': {'5': 0},'6': {'6': 0},'7': {'7': 0},'8': {'8': 0},'9': {'9': 0}},{},{},{}];

    return (
        <React.Fragment>
            <div className={ Classes.DIALOG_BODY }>

                <Flex>
                    <Box width={.52} pr='.5rem'>
                        <Flex flexDirection='column'>
                            <Box pb='1rem'>
                                { renderBackgroundSettings() }
                            </Box>
                            <Box pb='1rem'>
                                { renderBeadSettings() }
                            </Box>
                            <Box>
                                { renderGridSettings() }
                            </Box>
                        </Flex>
                    </Box>

                    <Box width={.48} pl='.5rem'>
                        <Section title='Preview'>
                            <WorkArea
                                backgroundSettings={{backgroundType, primaryColor: backgroundPrimaryColor, secondaryColor: backgroundSecondaryColor}}
                                beads={beads}
                                beadSettings={{beadShape: beadShape}}
                                boardGridSettings={{enabled: boardGridEnabled, color: boardGridColor}}
                                boardHeight={15}
                                boardWidth={15}
                                boards={boards}
                                boardsAcross={2}
                                boardsDown={2}
                                customGridSettings={{enabled: customGridEnabled, color: customGridColor, size: customGridSize}}
                                lineGridSettings={{enabled: lineGridEnabled, color: lineGridColor}}
                                pegGridSettings={{enabled: pegGridEnabled, color: pegGridColor}}
                                beadSize={16}
                                maxWidth='305px'
                            />

                            This preview uses a board size of 15 in order to better display the board grid.
                        </Section>


                    </Box>
                </Flex>
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button text='Cancel' onClick={ props.closeDialog } />
                    <Button text='Reset to Defaults' onClick={ handleRestore } />
                    <Button text='Save' onClick={ handleSave } intent="primary" />
                </div>
            </div>
        </React.Fragment>
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

Settings.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

