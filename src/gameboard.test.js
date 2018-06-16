import Gameboard from "./gameboard"
import Ship from "./ship"

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

  expect(gameboard.square(1, 1)).toEqual(42)
})

test("sets board square", () => {
  const gameboard = Gameboard(3)
  gameboard.setSquare(2, 2, 42)

  expect(gameboard.square(2, 2)).toEqual(42)
})

test("doesn't return offboard square", () => {
  const gameboard = Gameboard(3)
  gameboard.board = [[0, 0, 0], [0, 42, 0], [0, 0, 0]]

  expect(gameboard.square(5, 3)).toEqual(undefined)
})

test("places ship horizontally", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "h")
  expect(gameboard.square(0, 0)).toMatchObject({ ship: ship, index: 0 })
  expect(gameboard.square(1, 0)).toMatchObject({ ship: ship, index: 1 })
  expect(gameboard.square(2, 0)).toMatchObject({ ship: ship, index: 2 })
})

test("places ship vertically", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "v")
  expect(gameboard.square(0, 0)).toMatchObject({ ship: ship, index: 0 })
  expect(gameboard.square(0, 1)).toMatchObject({ ship: ship, index: 1 })
  expect(gameboard.square(0, 2)).toMatchObject({ ship: ship, index: 2 })
})

test("won't place ship offboard", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 1, 2, "h")
  expect(gameboard.board).toEqual(Gameboard(3).board)
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

test("reports all ships sunk", () => {
  const smallShip = { length: 3, isSunk: () => true }
  const largeShip = { length: 5, isSunk: () => false }
  const gameboard = Gameboard(5)
  gameboard.place(smallShip, 0, 1, "v")
  gameboard.place(largeShip, 0, 0, "h")

  expect(gameboard.allShipsSunk()).toEqual(false)

  largeShip.isSunk = () => true
  expect(gameboard.allShipsSunk()).toEqual(true)
})
