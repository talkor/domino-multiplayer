import React from 'react';
import Tile from '../Tile/Tile.jsx';
import './DominoEffect.css';

const NUM_TILES = 28;
const NUM_EFFECT_TILE = 3;

class DominoEffect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: []
    };
  }
  // const handleTileClick = event => {
  //   event.preventDefault();
  //   const selectedTile = event.currentTarget.dataset.tile;
  //   if (!props.isGameOver) {
  //     props.setSelectedTile(selectedTile);
  //   }
  // };

  render() {
    return (
      <div className="domino-effect">
        {this.state.tiles.map((tile, index) => (
          <Tile
            placed={true}
            tile={tile}
            key={index}
            rotated={tile % 2 === 0}
            placed={true}
            onTileClick={() => {}}
          />
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.generateRandomTiles();
  }

  generateRandomTiles() {
    const tiles = [];

    for (let i = 0; i < NUM_EFFECT_TILE; i++) {
      const randomIndex = Math.floor(Math.random() * Math.floor(NUM_TILES));

      tiles.push(randomIndex);
    }

    this.setState({ tiles });
  }
}

export default DominoEffect;
