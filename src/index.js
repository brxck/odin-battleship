import "./style.scss"
import Gameboard from "./gameboard"
import { Fleet } from "./ship"
import Player from "./player"
import { renderBoard, renderShips } from "./dom"

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const gameLoop = () => {
  const boardOne = Gameboard(10).placeRandom(Fleet())
  const boardTwo = Gameboard(10).placeRandom(Fleet())
  const playerOne = Player("human", boardOne, boardTwo)
  const playerTwo = Player("computer", boardTwo, boardOne)
  renderBoard(playerOne.gameboard, playerView)
  renderBoard(playerTwo.gameboard, opponentView)
  renderShips(playerOne, playerView)
  // renderShips(opponentBoard, opponentView)
}

gameLoop()

export default gameLoop
