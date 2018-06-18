import "./style.scss"
import render from "./dom"
import Gameboard from "./gameboard"
import Ship from "./ship"

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const gameLoop = () => {
  const playerBoard = Gameboard(10)
  const opponentBoard = Gameboard(10)
  const ships = [Ship(2), Ship(3), Ship(5)]
  opponentBoard.placeRandom(ships)
  playerBoard.placeRandom(ships)
  render(playerBoard, playerView)
  render(opponentBoard, opponentView)

  console.log(opponentBoard)
  console.log(playerBoard)
}

gameLoop()

export default gameLoop
