import Player from "./player"

test("has name and gameboard", () => {
  const player = Player("Marvin", {})

  expect(() => Player()).toThrow()
  expect(player.name).toEqual("Marvin")
})

test("makes moves", () => {})
