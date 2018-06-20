import Gameboard from "../src/gameboard"
import { Ship } from "../src/ship"

jest.mock("../src/event")

test("has size", () => {
  const gameboard = Gameboard(10)
  expect(gameboard.size).toEqual(10)
})

test("must have size", () => {
  expect(() => Gameboard()).toThrow()
})

test("has sized board", () => {
  const gameboard = Gameboard(3)
  expect(gameboard.board).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
})

test("returns board square", () => {
  const gameboard = Gameboard(3)
  gameboard.board = [[0, 0, 0], [0, 42, 0], [0, 0, 0]]

  expect(gameboard.cell(1, 1)).toEqual(42)
})

test("sets board square", () => {
  const gameboard = Gameboard(3)
  gameboard.setSquare(2, 2, 42)

  expect(gameboard.cell(2, 2)).toEqual(42)
})

test("doesn't return offboard square", () => {
  const gameboard = Gameboard(3)
  gameboard.board = [[0, 0, 0], [0, 42, 0], [0, 0, 0]]

  expect(gameboard.cell(5, 3)).toEqual(undefined)
})

test("iterates over board", () => {
  const gameboard = Gameboard(3)
  const result = []
  const cellCallback = (cell, x) => {
    result.push(x)
  }
  const rowCallback = (row, y) => {
    result.push(y)
  }

  gameboard.iterate(cellCallback, rowCallback)
  expect(result).toEqual([0, 0, 1, 2, 1, 0, 1, 2, 2, 0, 1, 2])
})

test("places ship horizontally", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "h")
  expect(gameboard.cell(0, 0)).toMatchObject({ ship: ship, index: 0 })
  expect(gameboard.cell(1, 0)).toMatchObject({ ship: ship, index: 1 })
  expect(gameboard.cell(2, 0)).toMatchObject({ ship: ship, index: 2 })
  expect(ship).toMatchObject({ x: 0, y: 0, direction: "h" })
})

test("places ship vertically", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "v")
  expect(gameboard.cell(0, 0)).toMatchObject({ ship: ship, index: 0 })
  expect(gameboard.cell(0, 1)).toMatchObject({ ship: ship, index: 1 })
  expect(gameboard.cell(0, 2)).toMatchObject({ ship: ship, index: 2 })
  expect(ship).toMatchObject({ x: 0, y: 0, direction: "v" })
})

test("won't place ship offboard", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 1, 2, "h")
  expect(gameboard.board).toEqual(Gameboard(3).board)
})

test("moves ship", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(5)

  gameboard.place(ship, 0, 2, "h")
  gameboard.move(0, 2, 1, 2)
  expect(gameboard.cell(1, 2)).toMatchObject({ ship: ship, index: 0 })
})

test("rotates ship", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "h")
  expect(gameboard.rotate(0, 0)).toEqual(true)
  expect(gameboard.cell(0, 2)).toMatchObject({ ship: ship, index: 2 })
})

test("returns attack outcome", () => {
  const ship = Ship(3)
  const gameboard = Gameboard(3)
  gameboard.place(ship, 0, 0, "h")

  expect(gameboard.receiveAttack(1, 0)).toEqual(true)
  expect(gameboard.receiveAttack(2, 2)).toEqual(false)
})

test("sends attack to ship", () => {
  const ship = Ship(3)
  const gameboard = Gameboard(3)
  gameboard.place(ship, 0, 0, "h")

  gameboard.receiveAttack(1, 0)
  expect(ship.hits).toEqual([0, 1, 0])
})

test("tracks missed attacks", () => {
  const gameboard = Gameboard(3)
  gameboard.receiveAttack(0, 0)

  expect(gameboard.misses.search(0, 0)).toEqual(true)
})

test("reports all ships sunk", () => {
  const smallShip = { length: 3, isSunk: () => true }
  const largeShip = { length: 5, isSunk: () => false }
  const gameboard = Gameboard(5)
  gameboard.place(smallShip, 0, 1, "v")
  gameboard.place(largeShip, 0, 0, "h")

  expect(gameboard.allSunk()).toEqual(false)

  largeShip.isSunk = () => true
  expect(gameboard.allSunk()).toEqual(true)
})
