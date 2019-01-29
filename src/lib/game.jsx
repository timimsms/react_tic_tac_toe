/* eslint max-statements: ["error", 20] */
import React from 'react';
import Board from './board'; // eslint-disable-line no-unused-vars

import calculateWinner from './calc_winner';
import calculateGameOver from './calc_game_over';
import buildMovesList from './build_moves.jsx';

class Game extends React.Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        claimedSquare: null,
        player: null,
        squares: Array(9).fill(null),
      }],
      isXNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        claimedSquare: i,
        player: this.state.xIsNext ? 'X' : 'O',
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isGameOver = calculateGameOver(current.squares);
    const moves = buildMovesList(history, this);

    let status;
    if (winner) {
      status = 'Winner: ' + winner + ' 🏆';
    } else if (isGameOver) {
      status = 'Game Over 👹';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
