const Player = (name, gameboard) => {
  if (!name || !gameboard) {
    throw Error("player missing arguments")
  }
  const newPlayer = {
    name: name,
    gameboard: gameboard,

    attack: function (gameboard, x, y) {
      if (gameboard.onBoard(x, y)) {
        gameboard.receiveAttack(x, y)
        return true
      } else {
        return false
      }
    }
  }

  return newPlayer
}

export default Player
