import React from 'react';

const Cell = ({ activeStatus }) => {
  const classes = `cell ${activeStatus}`
  return (
      <div className={classes}></div>
  );
}

export { Cell };