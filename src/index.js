import "./style.scss"
import Gameboard from "./gameboard"
import Player from "./player"
import eventController from "./event"
import { Fleet } from "./ship"
import { renderBoard, renderShips, renderPegs } from "./dom"

process.env.DEBUG = true

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const loop = { continue: true }

const boardOne = Gameboard(10)
const boardTwo = Gameboard(10)
boardOne.placeRandom(Fleet())
boardTwo.placeRandom(Fleet())
const playerOne = Player("you", boardOne, boardTwo)
const playerTwo = Player("cpu", boardTwo, boardOne)
renderBoard(boardOne, playerView)
renderBoard(boardTwo, opponentView)
renderShips(boardOne, playerView)
renderShips(boardTwo, opponentView)
eventController.subscribe("turn", () => {
  console.log("next loop")
  renderPegs(boardOne, playerView)
  renderPegs(boardTwo, opponentView)
  if (playerOne.won()) {
    eventController.publish("victory")
  } else if (playerOne.lost()) {
    eventController.publish("loss")
  }
  loop.continue = false
})

export default start()
