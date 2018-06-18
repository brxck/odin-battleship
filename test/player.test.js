import Player from "../src/player"
import Ship from "../src/ship"
import Gameboard from "../src/gameboard"

test("has name and gameboard", () => {
  const player = Player("Marvin", {})

  expect(() => Player()).toThrow()
  expect(player.name).toEqual("Marvin")
})

test("successful move returns true", () => {
  const player = Player("x", {})
  const gameboard = Gameboard(3)
  const ship = Ship(3)
  gameboard.place(ship, 0, 0, "h")

  // misses are still "successful"
  expect(player.attack(gameboard, 2, 2)).toEqual(true)
  expect(player.attack(gameboard, 1, 0)).toEqual(true)
  expect(ship.hits).toEqual([0, 1, 0])
})

test("unsuccessful move returns false", () => {
  const player = Player("x", {})
  const gameboard = Gameboard(3)

  expect(player.attack(gameboard, 5, 5)).toEqual(false)
})

test.skip("moves randomly", () => {
  const player = Player("x", {})
  const gameboard = Gameboard(3)

  expect(player.randomAttack())
})
