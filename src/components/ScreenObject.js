import { Component } from 'react';


class ScreenObject extends Component {

  constructor(boardSize) {
    super();
    this.boardSize = boardSize;
  }

  getRandomCellObject() {
    return {
      row: Math.floor(Math.random() * this.boardSize),
      col: Math.floor(Math.random() * this.boardSize)
    }
  }
}

export { ScreenObject};