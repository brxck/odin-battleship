const Gameboard = size => {
  if (!size) {
    throw Error("Gameboard must have size")
  }
  return {
    size: size,
    board: new Array(size).fill(new Array(size).fill(0)),
    place: function (ship, x, y, dir) {
      let spaces = []
      let pair

      for (let i = 0; i < ship.length; i++) {
        if (dir === "h") {
          pair = { x: x + i, y: y }
        } else if (dir === "v") {
          pair = { x: x, y: y + i }
        } else {
          console.error("invalid direction")
          return
        }

        if (this.board[pair.x][pair.y] === 0) {
          spaces.push(pair)
        } else {
          // square not on board
          console.error("not on board", pair)
          return
        }
      }

      spaces.forEach(pair => {
        this.board[pair.x][pair.y] = ship
      })
    },

    onBoard: function (x, y) {
      if (this.board[x][y]) {
        return true
      } else {
        return false
      }
    }
  }
}

export default Gameboard
