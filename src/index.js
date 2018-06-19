import "./style.scss"
import { renderBoard, renderShips } from "./dom"
import Gameboard from "./gameboard"
import Ship from "./ship"

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const gameLoop = () => {
  const playerBoard = Gameboard(10)
  const opponentBoard = Gameboard(10)
  const playerShips = [Ship(2), Ship(3), Ship(5)]
  const opponentShips = [Ship(2), Ship(3), Ship(5)]
  opponentBoard.placeRandom(opponentShips)
  playerBoard.placeRandom(playerShips)
  renderBoard(playerBoard, playerView)
  renderBoard(opponentBoard, opponentView)
  renderShips(playerBoard, playerView)
  // renderShips(opponentBoard, opponentView)

  console.log(opponentBoard)
  console.log(playerBoard)
}

gameLoop()

export default gameLoop
