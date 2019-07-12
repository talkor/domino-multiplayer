import React from 'react';
import './Tile.css';
import { tilesMap } from '../../TilesMap.js';

const Tile = props => {
  const renderedClasses = `tile ${props.rotated ? 'rotated' : ''} ${
    props.placed ? 'placed' : ''
  } ${props.selected ? 'selected' : ''} ${props.isStock ? 'stock' : ''} ${
    props.placeholder ? 'placeholder' : ''
  } ${props.empty ? 'empty' : ''} ${props.rendered ? '' : 'hide'}`;

  return (
    <div
      className={renderedClasses}
      onClick={event => props.onTileClick(event, props.placed)}
      data-tile={props.tile}
      id={props.id}
    >
      <div
        className={`side-a tile-${
          props.reversed ? tilesMap[props.tile].b : tilesMap[props.tile].a
        }`}
      >
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
        <span className="dot dot-4" />
        <span className="dot dot-5" />
        <span className="dot dot-6" />
      </div>
      <div className="divider" />
      <div
        className={`side-b tile-${
          props.reversed ? tilesMap[props.tile].a : tilesMap[props.tile].b
        }`}
      >
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
        <span className="dot dot-4" />
        <span className="dot dot-5" />
        <span className="dot dot-6" />
      </div>
    </div>
  );
};

Tile.defaultProps = {
  rotated: false,
  placed: false,
  isStock: false,
  tile: 0,
  rendered: true
};

export default Tile;
