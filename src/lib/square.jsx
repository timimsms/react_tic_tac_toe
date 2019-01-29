import React from 'react'; // eslint-disable-line no-unused-vars

function Square(props) { // eslint-disable-line no-unused-vars
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
