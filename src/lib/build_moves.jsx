import React from 'react'; // eslint-disable-line no-unused-vars

function buildMovesList(history, board) {
  return history.map((step, move) => {
    const desc = move
      ? 'Go to move #' + move
      : 'Go to game start';
    const moveMessage = move
      ? step.player + ' claimed Square ' + step.claimedSquare + '.'
      : 'Game Start!';
    return (
      <li key={move}>
        {moveMessage}&nbsp;&nbsp;
        <button onClick={() => board.jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });
}

export default buildMovesList;
