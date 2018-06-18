import "./style.scss"
import render from "./dom"
import Gameboard from "./gameboard"
import Ship from "./ship"

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const gameLoop = () => {
  const playerBoard = Gameboard(10)
  const opponentBoard = Gameboard(10)
  opponentBoard.place(Ship(3), 0, 0, "h")
  opponentBoard.place(Ship(3), 2, 2, "v")
  render(playerBoard, playerView)
  render(opponentBoard, opponentView)
}

gameLoop()

export default gameLoop
