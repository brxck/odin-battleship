import eventController from "./event"

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
        const result = antiBoard.receiveAttack(x, y)
        if (result === true) {
          eventController.publish("playerHit", { x: x, y: y })
          eventController.publish("turn")
        } else if (result === false) {
          eventController.publish("playerMiss", { x: x, y: y })
          eventController.publish("turn")
        }
        return true
      } else {
        return false
      }
    },

    randomAttack: function () {
      while (true) {
        let xy = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10)
        ]
        if (
          !antiBoard.misses.search(xy[0], xy[1]) ||
          !antiBoard.hits.search(xy[0], xy[1])
        ) {
          if (antiBoard.receiveAttack(xy[0], xy[1])) {
            eventController.publish("cpuHit", { x: xy[0], y: xy[1] })
          } else {
            eventController.publish("cpuMiss", { x: xy[0], y: xy[1] })
          }
          break
        }
      }
    },

    won: function () {
      return antiBoard.allSunk()
    },

    lost: function () {
      return gameboard.allSunk()
    }
  }

  antiBoard.opponent = newPlayer
  return newPlayer
}

export default Player
