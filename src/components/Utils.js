class Utils {
  static isCellInArray(cellObj, arrCells) {
    return arrCells.filter(cell => cell.row === cellObj.row 
      && cell.col === cellObj.col).length > 0;
  }

  static getCellObj(row, col) {
    return {
      row: row,
      col: col
    }
  }

  static cloneArray(arr) {
    return JSON.parse(JSON.stringify(arr))
  }
}

export { Utils };