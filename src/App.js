import React, { Component } from 'react';
import './App.css';
import { GameBoard } from './components/Gameboard.js';

const BOARD_SIZE = 20;
const TICK_MS = 150;

class App extends Component {
  render() {
    return (
      <div className="App">
          <GameBoard tick_ms={TICK_MS} board_size={BOARD_SIZE} />
      </div>
    );
  }
}

export default App;
