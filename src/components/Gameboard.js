import React, { Component } from 'react';
import { Utils } from './Utils.js';
import { Apple } from './Apple.js';
import { Snake } from './Snake.js';
import { Cell } from './Cell.js';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.boardSize = props.board_size;
    this.tickMs = props.tick_ms;
    this.started = false;
    this.snake = new Snake(this.boardSize);
    this.state = {
      snakeCells :  this.snake.getSnakeCells()
    }
    this.apple = new Apple(this.snake.getSnakeCells(), this.boardSize);
    this.setKeyHandler();
  }

  setKeyHandler() {
    let checkKey = (e) => {
      e = e || window.event;
      let direction = null;
      switch(e.keyCode) {
        case 38:  direction = 'UP'; break; 
        case 40:  direction = 'DOWN'; break; 
        case 37:  direction = 'LEFT'; break; 
        case 39:  direction = 'RIGHT'; break;
        default: direction = null;
      }
      if(direction) { this.snake.setDirection(direction) };
      e.preventDefault();

      if(!this.started) {
        this.onStart();
      }
    }
    document.onkeydown = checkKey;
  }

  onStart() {
    this.startTimer();
  }

  onStop() {
    this.stopTimer();
  }

  isGameOver() {
    const head = this.snake.getHead();
    return head.row < 0 || head.row >= this.boardSize
        || head.col < 0 || head.col >= this.boardSize
        || Utils.isCellInArray(head, this.snake.getSnakeCellsWithoutHead());
  }

  doesSnakeGetApple() {
    const snakeHead = this.snake.getHead();
    const appleCell = this.apple.getAppleCell();
    return snakeHead.row === appleCell.row && snakeHead.col === appleCell.col;    
  }

  startTimer() {
    if(!this.started) {
      this.interval = setInterval(() => {
        if(this.doesSnakeGetApple()) {
          this.snake.grow();
          this.apple.move();
        } else {
          this.snake.move();
        }
        this.setState({
          snakeCells : this.snake.getSnakeCells()
        });
        if(this.isGameOver()) {
          console.log('GAME OVER');
          this.onStop();
        }
      }, this.tickMs);
    }
    this.started = true;
  }

  stopTimer() {
    clearInterval(this.interval);
    this.started = false;
  }

  render() {
    let board = [];
    let rows = [];
    for(let i = 0; i < this.boardSize; i++) {
      let row = [];
      rows.push(row);
      for(let j = 0; j < this.boardSize; j++) {
        let activeStatus = 'inactive';
        if(this.snake.isSnakeCell(i, j)) {
          activeStatus = 'snake';
        } else if (this.apple.isAppleCell(i, j)) {
          activeStatus = 'apple'
        }
       row.push(<Cell key={i + '_' + j} activeStatus={activeStatus}/>)
      }
      board.push(row);
    }
    return (
      <div>
        <div className="board">{board}</div>
      </div>
    );
  }
}

export { GameBoard };
