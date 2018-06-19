import "./style.scss"
import render from "./dom"
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
  render(playerBoard, playerView)
  render(opponentBoard, opponentView)

  opponentBoard.addEventListener("click", () =>
    render(opponentBoard, opponentView)
  )

  console.log(opponentBoard)
  console.log(playerBoard)
}

gameLoop()

export default gameLoop
