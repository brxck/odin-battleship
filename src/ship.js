import eventController from "./event"

const Ship = (length, name) => {
  if (!length) {
    throw Error("ship requires length")
  }

  return {
    name: name,
    length: length,
    hits: new Array(length).fill(0),
    hit: function (index) {
      if (index >= 0 && index < length) {
        this.hits[index] = 1
        if (this.isSunk()) {
          eventController.publish("sunk")
        }
      } else if (process.env.NODE_ENV !== "test") {
        console.error("hit index out of ship range")
      }
    },
    isSunk: function () {
      const totalHits = this.hits.reduce((total, x) => total + x)
      if (totalHits === this.length) {
        return true
      } else {
        return false
      }
    }
  }
}

const Fleet = () => {
  return [
    Ship(5, "carrier"),
    Ship(4, "battleship"),
    Ship(3, "cruiser"),
    Ship(2, "destroyer"),
    Ship(2, "destroyer"),
    Ship(1, "submarine"),
    Ship(1, "submarine")
  ]
}

export { Ship, Fleet }
