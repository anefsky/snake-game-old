import { ScreenObject } from './ScreenObject.js';
import { Utils } from './Utils.js';

class Snake extends ScreenObject {
  constructor(boardSize) {
    super(boardSize);
    this.cells= [];
    this.addRandomCell();
    this.direction = null;
  }

  setDirection(newDirection) {
    const oldDirection = this.direction;
    // disallow reverse direction, such as RIGHT to LEFT
    const horizontals = ['LEFT', 'RIGHT'];
    const verticals = ['UP', 'DOWN'];
    if(!((horizontals.includes(newDirection) && horizontals.includes(oldDirection))
      || (verticals.includes(newDirection) && verticals.includes(oldDirection)))) {
      this.direction = newDirection;
    }
  }

  move() {
    this.grow();
    this.removeTail();
  }

  grow() {
    let {row, col} = this.getHead();
    switch(this.direction) {
      case 'UP' : row--; break;
      case 'RIGHT' : col++; break;
      case 'DOWN' : row++; break;
      case 'LEFT' : col--; break;        
      default :
        console.log('bad direction: ', this.direction);
    }
    this.addCell(row, col);
  }

  addRandomCell() {
    let randomCell = this.getRandomCellObject();
    this.addCell(randomCell.row, randomCell.col);
  }

  addCell(row, col) {
    return this.cells.unshift(Utils.getCellObj(row, col));
  }

  getHead() {
    return this.cells[0];
  }

  removeTail() {
    this.cells.pop();
  }

  getSnakeCells() {
    return this.cells;
  }

  getSnakeCellsWithoutHead() {
    return Utils.cloneArray(this.cells).slice(1);
  }

  isSnakeCell(row, col) {
    return this.cells.filter(
      cell => cell.row === row && cell.col === col
    ).length;
  }
}

export { Snake };