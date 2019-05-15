import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Palette = styled.div`
    line-height: 0;
`;

const ColorButton = styled.div`
    background-color: ${(props) => props.color};
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin: 0;
    padding: 0;
    border: 1px solid black;
`;

function BeadPalette(props) {
  return (
    <Palette>
      {props.beads.map((bead) => {
        return (
          <ColorButton
            key={bead.code}
            color={bead.color}
            onClick={() => props.setBead(bead)}
          />
        );
      })}
    </Palette>
  );
}

BeadPalette.propTypes = {
  beads: PropTypes.array.isRequired,
  selectedBrand: PropTypes.string.isRequired,
  setBead: PropTypes.func.isRequired,
};

export default BeadPalette;
