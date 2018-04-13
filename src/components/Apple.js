import { ScreenObject } from './ScreenObject.js';
import { Utils } from './Utils.js';


class Apple extends ScreenObject {
  constructor(snakeCells, boardSize) {
    super(boardSize);
    this.snakeCells = snakeCells;
    this.appleCell = null;
    this.createAppleCell();
  }

  getAppleCell() { return this.appleCell; }

  isAppleCell(row, col) { 
    return this.appleCell.row === row && this.appleCell.col === col;
  }

  createAppleCell() {
    let foundEmptyCell = false;
    let chosenCell = null;
    while(!foundEmptyCell) {
      chosenCell = this.getRandomCellObject();
      const matches = Utils.isCellInArray(chosenCell, this.snakeCells);
      if(!matches) { foundEmptyCell = true; }
    }
    this.appleCell = chosenCell;
  }

  move() {
    this.appleCell = null;
    this.createAppleCell();
  }
}

export { Apple };