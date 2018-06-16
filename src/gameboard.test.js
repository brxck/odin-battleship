import Gameboard from "./gameboard"

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

test.skip("receives attack", () => {
  const ship = Ship(3)
  const gameboard = Gameboard(3)
  gameboard.please(ship, 0, 0, "h")

  gameboard.attack(0, 0)
})
