import Player from "../src/player"
import { Ship } from "../src/ship"
import Gameboard from "../src/gameboard"

jest.mock("../src/event")

test("has name and board", () => {
  const player = Player("Marvin", {}, {})

  expect(() => Player()).toThrow()
  expect(player.name).toEqual("Marvin")
})

test("successful move returns true", () => {
  const antiBoard = Gameboard(3)
  const player = Player("x", {}, antiBoard)
  const ship = Ship(3)
  antiBoard.place(ship, 0, 0, "h")

  // misses are still "successful"
  expect(player.attack(2, 2)).toEqual(true)
  expect(player.attack(1, 0)).toEqual(true)
  expect(ship.hits).toEqual([0, 1, 0])
})

test("unsuccessful move returns false", () => {
  const antiBoard = Gameboard(3)
  const player = Player("x", {}, antiBoard)

  expect(player.attack(5, 5)).toEqual(false)
})

test("registers victory", () => {
  const antiBoard = { allSunk: () => true }
  const player = Player("x", {}, antiBoard)

  expect(player.won()).toEqual(true)
})

test("registers loss", () => {
  const board = { allSunk: () => true }
  const player = Player("x", board, {})

  expect(player.lost()).toEqual(true)
})

test.skip("moves randomly", () => {
  const player = Player("x", {}, {})
  const board = Gameboard(3)

  expect(player.randomAttack())
})
