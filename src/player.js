const Player = (name, gameboard) => {
  if (!name || !gameboard) {
    throw Error("player missing arguments")
  }
  const newPlayer = {
    name: name,
    gameboard: gameboard
  }

  return newPlayer
}

export default Player
