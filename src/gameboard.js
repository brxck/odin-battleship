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
    ships: [],
    misses: [],

    onBoard: function (x, y) {
      if (this.board[x] !== undefined && this.board[x][y] !== undefined) {
        return true
      } else {
        return false
      }
    },

    setSquare: function (x, y, value) {
      if (this.onBoard(x, y)) {
        this.board[x][y] = value
      } else {
        console.error("no such square", [x, y])
      }
    },

    square: function (x, y) {
      // if (0) evaluates to false!
      if (this.onBoard(x, y)) {
        return this.board[x][y]
      } else {
        console.error("no such square", [x, y])
      }
    },

    place: function (ship, x, y, direction) {
      let spaces = []
      let pair

      for (let i = 0; i < ship.length; i++) {
        if (direction === "h") {
          pair = { x: x + i, y: y }
        } else if (direction === "v") {
          pair = { x: x, y: y + i }
        } else {
          console.error("invalid direction", direction)
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

      this.ships.push(ship)
    },

    receiveAttack: function (x, y) {
      const square = this.square(x, y)
      if (square === 0) {
        this.misses.push([x, y])
        return false
      } else if (square.ship) {
        square.ship.hit(square.index)
        return true
      }
    },

    allShipsSunk: function () {
      let allSunk = true
      this.ships.forEach(ship => {
        if (!ship.isSunk()) {
          allSunk = false
        }
      })
      return allSunk
    }
  }

  return newGameboard
}

export default Gameboard
