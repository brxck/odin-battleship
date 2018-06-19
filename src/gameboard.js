const Gameboard = size => {
  if (!size) {
    throw Error("Gameboard must have size")
  }

  const board = []
  for (let i = 0; i < size; i++) {
    board.push(new Array(size).fill(0))
  }

  const randomCoordinate = function (min = 0, max = size - 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const newGameboard = {
    size: size,
    board: board,
    ships: [],
    misses: [],
    hits: [],

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

    cell: function (x, y) {
      // if (0) evaluates to false!
      if (this.onBoard(x, y)) {
        return this.board[x][y]
      } else {
        console.error("no such square", [x, y])
      }
    },

    iterate: function (cellCallback = () => {}, rowCallback = () => {}) {
      for (let y = 0; y < this.size; y++) {
        rowCallback(this.board[y], y)
        for (let x = 0; x < this.size; x++) {
          cellCallback(this.board[x][y], x, y)
        }
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
          return false
        }

        if (this.cell(pair.x, pair.y) === 0) {
          spaces.push(pair)
        } else if (this.cell(pair.x, pair.y) !== undefined) {
          console.error("space not empty", pair)
          return false
        } else {
          // square not on board
          console.error("not on board", pair)
          return false
        }
      }

      spaces.forEach((pair, index) => {
        this.setSquare(pair.x, pair.y, { ship: ship, index: index })
      })

      Object.assign(ship, { x: x, y: y, direction: direction })
      this.ships.push(ship)
      return true
    },

    placeRandom: function (ships) {
      console.log("ships", ships)
      ships.forEach(ship => {
        console.log("placing ship", ship)
        const direction = Math.random() < 0.5 ? "h" : "v"
        let x, y
        do {
          if (direction === "h") {
            x = randomCoordinate(0, this.size - 1 - ship.length)
            y = randomCoordinate()
          } else if (direction === "v") {
            x = randomCoordinate()
            y = randomCoordinate(0, this.size - 1 - ship.length)
          }
        } while (this.place(ship, x, y, direction) === false)
      })
    },

    receiveAttack: function (x, y) {
      const square = this.cell(x, y)
      if (square === 0) {
        this.misses.push([x, y])
        return false
      } else if (square.ship) {
        square.ship.hit(square.index)
        this.hits.push([x, y])
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
