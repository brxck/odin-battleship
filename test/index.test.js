import helloWorld from "../src/index"

test("it works", () => {
  expect(helloWorld()).toEqual("hello world")
})
