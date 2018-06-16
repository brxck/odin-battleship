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

test("doesn't return offboard square", () => {
  const gameboard = Gameboard(3)
  gameboard.board = [[0, 0, 0], [0, 42, 0], [0, 0, 0]]

  expect(gameboard.square(5, 3)).toEqual(undefined)
})

test("places ship horizontally", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "h")
  expect(gameboard.board[0][0]).toEqual(ship)
  expect(gameboard.board[1][0]).toEqual(ship)
  expect(gameboard.board[2][0]).toEqual(ship)
})

test("places ship vertically", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 0, 0, "v")
  expect(gameboard.board[0][0]).toEqual(ship)
  expect(gameboard.board[0][1]).toEqual(ship)
  expect(gameboard.board[0][2]).toEqual(ship)
})

test("won't place ship offboard", () => {
  const ship = { length: 3 }
  const gameboard = Gameboard(3)

  gameboard.place(ship, 1, 2, "h")
  expect(gameboard.board).toEqual(Gameboard(3).board)
})
