import "./style.scss"
import Gameboard from "./gameboard"
import Player from "./player"
import eventController from "./event"
import { Fleet } from "./ship"
import { renderBoard, renderShips, renderPegs } from "./dom"

process.env.DEBUG = true

const playerView = document.getElementById("player")
const opponentView = document.getElementById("opponent")

const boardOne = Gameboard(10)
const boardTwo = Gameboard(10)
boardOne.placeRandom(Fleet())
boardTwo.placeRandom(Fleet())
const player = Player("player", boardOne, boardTwo)
const computer = Player("cpu", boardTwo, boardOne)
renderBoard(player, computer, playerView)
renderBoard(computer, player, opponentView)
renderShips(player, playerView)
// renderShips(computer, opponentView)

eventController.subscribe("turn", () => {
  renderPegs(boardOne, playerView)
  renderPegs(boardTwo, opponentView)
  if (player.won()) {
    eventController.publish("victory")
  } else if (player.lost()) {
    eventController.publish("loss")
  }
})
