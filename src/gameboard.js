const Gameboard = size => {
  if (!size) {
    throw Error("Gameboard must have size")
  }

  const board = []
  for (let i = 0; i < size; i++) {
    board.push(new Array(size).fill(0))
  }

  const newGameboard = {
    size: size,
    board: board,

    setSquare: function (x, y, value) {
      if (this.board[x] !== undefined && this.board[x][y] !== undefined) {
        this.board[x][y] = value
      } else {
        console.error("no such square", [x, y])
      }
    },

    square: function (x, y) {
      // if (0) evaluates to false!
      if (this.board[x] !== undefined && this.board[x][y] !== undefined) {
        return this.board[x][y]
      } else {
        console.error("no such square", [x, y])
      }
    },

    place: function (ship, x, y, dir) {
      let spaces = []
      let pair

      for (let i = 0; i < ship.length; i++) {
        if (dir === "h") {
          pair = { x: x + i, y: y }
        } else if (dir === "v") {
          pair = { x: x, y: y + i }
        } else {
          console.error("invalid direction", dir)
          return
        }

        if (this.square(pair.x, pair.y) === 0) {
          spaces.push(pair)
        } else if (this.square(pair.x, pair.y) !== undefined) {
          console.error("space not empty", pair)
          return
        } else {
          // square not on board
          console.error("not on board", pair)
          return
        }
      }

      spaces.forEach((pair, index) => {
        this.setSquare(pair.x, pair.y, { ship: ship, index: index })
      })
    }
  }

  return newGameboard
}

export default Gameboard
