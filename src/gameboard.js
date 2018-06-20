const HitTracker = () => {
  return {
    log: {},
    store: function (x, y) {
      this.log[`${x}-${y}`] = true
    },
    search: function (x, y) {
      if (this.log[`${x}-${y}`] !== undefined) {
        return this.log[`${x}-${y}`]
      }
    },
    retrieve: function (x, y) {
      if (this.log[`${x}-${y}`] !== undefined) {
        this.log[`${x}-${y}`] = false
        return this.log[`${x}-${y}`]
      }
    },
    iterate: function (callback) {
      for (let item in this.log) {
        callback(this.log[item], item.split("-")[0], item.split("-")[1])
      }
    }
  }
}

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
    misses: HitTracker(),
    hits: HitTracker(),
    opponent: undefined,

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

    gatherSpaces: function (ship, x, y, direction) {
      const pairs = []
      for (let i = 0; i < ship.length; i++) {
        if (direction === "h") {
          if (this.cell(x + i, y) !== 0) {
            console.log("xy", [x, y, i])
            console.log("cell", this.cell(x + i, y))
            return false
          }
          pairs.push({ x: x + i, y: y })
        } else if (direction === "v") {
          if (this.cell(x, y + i) !== 0) {
            return false
          }
          pairs.push({ x: x, y: y + i })
        } else {
          console.error("invalid direction")
          return false
        }
      }
      return pairs
    },

    place: function (ship, x, y, direction) {
      const spaces = this.gatherSpaces(ship, x, y, direction)

      if (spaces === false) {
        console.error("not empty")
        return false
      }

      spaces.forEach((pair, index) => {
        this.setSquare(pair.x, pair.y, { ship: ship, index: index })
      })

      Object.assign(ship, { x: x, y: y, direction: direction })
      this.ships.push(ship)
      return true
    },

    remove: function (ship) {
      for (let i = 0; i < ship.length; i++) {
        if (ship.direction === "h") {
          this.setSquare(ship.x + i, ship.y, 0)
        } else if (ship.direction === "v") {
          this.setSquare(ship.x + i, ship.y, 0)
        }
      }
      this.ships.slice(this.ships.indexOf(ship))
    },

    move: function (x0, y0, x1, y1) {
      const ship = this.cell(x0, y0).ship
      if (!ship) {
        throw Error("no ship to move")
      }

      this.remove(ship)
      return this.place(ship, x1, y1, ship.direction)
    },

    rotate: function (x, y) {
      const ship = this.cell(x, y).ship
      if (!ship) {
        throw Error("no ship to move")
      }

      this.remove(ship)
      this.place(ship, x, y, ship.direction === "h" ? "v" : "h")
    },

    placeRandom: function (ships) {
      ships.forEach(ship => {
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
      if (this.hits.search(x, y) || this.misses.search(x, y)) {
        return false
      }
      const square = this.cell(x, y)
      if (square === 0) {
        this.misses.store(x, y)
        return false
      } else if (square.ship) {
        square.ship.hit(square.index)
        this.hits.store(x, y)
        return true
      }
    },

    allSunk: function () {
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
