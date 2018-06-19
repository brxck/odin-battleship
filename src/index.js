import "./style.scss"
import Gameboard from "./gameboard"
import { Fleet } from "./ship"
import Player from "./player"
import { renderBoard, renderShips } from "./dom"

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const gameLoop = () => {
  // setup
  const boardOne = Gameboard(10)
  const boardTwo = Gameboard(10)
  boardOne.placeRandom(Fleet())
  boardTwo.placeRandom(Fleet())
  const playerOne = Player("human", boardOne, boardTwo)
  const playerTwo = Player("computer", boardTwo, boardOne)
  console.log(boardOne)
  renderBoard(boardOne, playerView)
  renderBoard(boardTwo, opponentView)
  renderShips(boardOne, playerView)
  renderShips(boardTwo, opponentView)

  // game loop
}

gameLoop()

export default gameLoop
