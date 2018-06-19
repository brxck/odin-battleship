const Player = (name, gameboard, antiBoard) => {
  if (!name || !gameboard || !antiBoard) {
    throw Error("player missing arguments")
  }
  const newPlayer = {
    name: name,
    gameboard: gameboard,
    antiBoard: antiBoard,

    attack: function (x, y) {
      if (antiBoard.onBoard(x, y)) {
        if (antiBoard.receiveAttack(x, y)) {
          console.log("hit")
        } else {
          console.log("miss")
        }
        return true
      } else {
        return false
      }
    },

    won: function () {
      return antiBoard.allSunk()
    },

    lost: function () {
      return gameboard.allSunk()
    }
  }

  return newPlayer
}

export default Player
