import React from 'react';
import Tile from '../Tile/Tile.jsx';
import './Stock.css';

const Stock = props => {
  return (
    <React.Fragment>
      {props.isGameOver ? (
        ''
      ) : (
        <Tile
          empty={props.empty}
          tile="0"
          isStock
          onTileClick={props.onStockWithdrawal}
        />
      )}
    </React.Fragment>
  );
};

export default Stock;
