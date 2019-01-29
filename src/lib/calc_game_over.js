function calculateGameOver(squares) {
  return squares.every((currentValue) => currentValue !== null);
}

export default calculateGameOver;
