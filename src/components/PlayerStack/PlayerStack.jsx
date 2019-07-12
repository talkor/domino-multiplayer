import React from 'react';
import Tile from '../Tile/Tile.jsx';
import './PlayerStack.css';

const PlayerStack = props => {
  const handleTileClick = event => {
    event.preventDefault();
    const selectedTile = event.currentTarget.dataset.tile;
    if (!props.isGameOver) {
      props.setSelectedTile(selectedTile);
    }
  };

  return (
    <div className="player-stack">
      {props.playerTiles.map((tile, key) => {
        return (
          <Tile
            tile={tile}
            key={key}
            selected={props.selectedTile == tile}
            onTileClick={handleTileClick.bind(this)}
          />
        );
      })}
    </div>
  );
};

export default PlayerStack;
