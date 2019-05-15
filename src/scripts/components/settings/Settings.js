import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Slider from 'rc-slider';
import backgroundTypes from '../../state/backgroundTypes';
import beadShapes from '../../state/beadShapes';
import ColorPicker from './ColorPicker';
import {WorkArea} from '../workarea/WorkArea';
import Section from './Section';
import {
  restoreDefaultSettings, setBackgroundPrimaryColor, setBackgroundSecondaryColor, setBackgroundType, setBeadShape,
  setBoardGridColor, setBoardGridEnabled, setCustomGridColor, setCustomGridEnabled, setCustomGridSize,
  setLineGridColor, setLineGridEnabled, setPegGridColor, setPegGridEnabled,
} from '../../state/actions/settingsActions';
import {getTranslate, Translate} from 'react-localize-redux';

const alignItemsCenter = `align-items: center;`;

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
    <Section title={props.translate('settings.section.backgroundType.title')}>
      <Container>
        <Row noGutters css={alignItemsCenter}>
          <Col md={6}>
            <Form.Check
              type='radio'
              label={props.translate('settings.section.backgroundType.plain')}
              checked={ backgroundType === backgroundTypes.PLAIN }
              onChange={ () => setBackgroundType(backgroundTypes.PLAIN) }/>
          </Col>
          <Col md={6}>
            <ColorPicker
              text={props.translate('settings.section.backgroundType.primaryColor')}
              color={ backgroundPrimaryColor }
              onChange={ (color) => setBackgroundPrimaryColor(color) }
              buttonFill />
          </Col>
        </Row>
        <Row noGutters css={alignItemsCenter}>
          <Col md={6}>
            <Form.Check
              type='radio'
              label={props.translate('settings.section.backgroundType.checkerboard')}
              checked={ backgroundType === backgroundTypes.CHECKERBOARD }
              onChange={ () => setBackgroundType(backgroundTypes.CHECKERBOARD) }/>
          </Col>
          <Col md={6}>
            <ColorPicker
              text={props.translate('settings.section.backgroundType.secondaryColor')}
              color={ backgroundSecondaryColor }
              onChange={ (color) => setBackgroundSecondaryColor(color) }
              buttonFill />
          </Col>
        </Row>
      </Container>
    </Section>
  );

  const renderBeadSettings = () => (
    <Section title={props.translate('settings.section.beadShape.title')}>
      <Container>
        <Row noGutters>
          <Col>
            <Form.Check
              type='radio'
              label={props.translate('settings.section.beadShape.normal')}
              checked={ beadShape === beadShapes.NORMAL }
              onChange={ () =>setBeadShape(beadShapes.NORMAL) }
            />
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label={props.translate('settings.section.beadShape.round')}
              checked={ beadShape === beadShapes.ROUND }
              onChange={ () =>setBeadShape(beadShapes.ROUND) }
            />
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label={props.translate('settings.section.beadShape.square')}
              checked={ beadShape === beadShapes.SQUARE }
              onChange={ () =>setBeadShape(beadShapes.SQUARE) }
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );

  const renderGridSettings = (label, enabled, setEnabled, color, setColor) => (
    <Row noGutters>
      <Col md={4}>
        {label}
      </Col>
      <Col md={4}>
        <Form.Check
          type='checkbox'
          label={props.translate('settings.section.guides.enabled')}
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
      </Col>
      <Col md={4}>
        <ColorPicker
          text={props.translate('settings.section.guides.gridColor')}
          color={color}
          onChange={(color) => setColor(color)}
        />
      </Col>
    </Row>
  );

  const renderGuideSettings = () => (
    <Section title={props.translate('settings.section.guides.title')}>
      <Container>
        {renderGridSettings(props.translate('settings.section.guides.pegGrid'), pegGridEnabled, setPegGridEnabled,
            pegGridColor, setPegGridColor)}
        <hr/>
        {renderGridSettings(props.translate('settings.section.guides.lineGrid'), lineGridEnabled, setLineGridEnabled,
            lineGridColor, setLineGridColor)}
        <hr/>
        {renderGridSettings(props.translate('settings.section.guides.boardGrid'), boardGridEnabled, setBoardGridEnabled,
            boardGridColor, setBoardGridColor)}
        <hr/>
        {renderGridSettings(props.translate('settings.section.guides.customGrid'), customGridEnabled,
            setCustomGridEnabled, customGridColor, setCustomGridColor)}
        <br/>
        <Row noGutters css={alignItemsCenter}>
          <Col md={{offset: 4, span: 4}}>
            <Translate id='settings.section.guides.gridSize'/> ({customGridSize})
          </Col>
          <Col md={4}>
            <Slider
              min={1}
              max={25}
              onChange={(size) => setCustomGridSize(size)}
              value={customGridSize}
              included={false}
              railStyle={{backgroundColor: 'grey'}}
              handleStyle={{borderColor: 'grey'}}
              dotStyle={{display: 'none'}}
              marks={{1: 1, 25: 25}}
            />
          </Col>
        </Row>
      </Container>
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
  const boards = [{'0': {'0': 0}, '1': {'1': 0}, '2': {'2': 0}, '3': {'3': 0}, '4': {'4': 0}, '5': {'5': 0},
    '6': {'6': 0}, '7': {'7': 0}, '8': {'8': 0}, '9': {'9': 0}}, {}, {}, {}];

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translate id='settings.title'/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={7}>
              { renderBackgroundSettings() }
              { renderBeadSettings() }
              { renderGuideSettings() }
            </Col>

            <Col md={5}>
              <Section title={props.translate('settings.section.preview.title')}>
                <WorkArea
                  backgroundSettings={
                    {backgroundType, primaryColor: backgroundPrimaryColor, secondaryColor: backgroundSecondaryColor}
                  }
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
                  maxWidth='240px'
                />

                <Translate id='settings.section.preview.sizeNote' data={{boardSize: 15}}/>
              </Section>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.closeDialog }>
          <Translate id='settings.button.cancel'/>
        </Button>
        <Button onClick={ handleRestore }>
          <Translate id='settings.button.reset'/>
        </Button>
        <Button onClick={ handleSave } variant='primary'>
          <Translate id='settings.button.save'/>
        </Button>
      </Modal.Footer>
    </>
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
  customGridSize: state.settings.customGrid.size,
  translate: getTranslate(state.localize),
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
  restoreDefaultSettings: () => dispatch(restoreDefaultSettings()),
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
  setPegGridEnabled: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

