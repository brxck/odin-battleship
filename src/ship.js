const Ship = length => {
  return {
    length: length,
    hits: new Array(length).fill(0),
    hit: function (index) {
      if (index >= 0 && index < length) {
        this.hits[index] = 1
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

export default Ship
