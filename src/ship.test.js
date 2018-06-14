import Ship from "./ship"

test("returns correct length", () => {
  const ship = Ship(3)
  /* eslint-disable-next-line jest/prefer-to-have-length */
  expect(ship.length).toEqual(3)
})

test("returns hit array", () => {
  const ship = Ship(5)
  expect(ship.hits).toEqual([0, 0, 0, 0, 0])
})

test("registers hit", () => {
  const ship = Ship(4)
  ship.hit(0)
  expect(ship.hits).toEqual([1, 0, 0, 0])
})

test("rejects out of range hit", () => {
  const ship = Ship(3)
  ship.hit(3)
  ship.hit(-1)
  expect(ship.hits).toEqual([0, 0, 0])
})

test("is sunk when hit everywhere", () => {
  const ship = Ship(3)
  ship.hit(0)
  ship.hit(1)
  expect(ship.isSunk()).toBe(false)
  ship.hit(2)
  expect(ship.isSunk()).toBe(true)
})
