import eventController from "../src/event"

test("rejects non function callbacks", () => {
  const testController = Object.create(eventController)
  expect(() => testController.subscribe("test", "t")).toThrow()
})

test("tracks subscriptions", () => {
  const testController = Object.create(eventController)
  const callback = () => {}

  testController.subscribe("test", callback)
  expect(testController.events["test"][0]).toEqual(callback)
})

test("call subscriptions on publish", () => {
  const testController = Object.create(eventController)
  const testObject = { success: false }
  const callback = () => (testObject.success = true)

  testController.subscribe("test", callback)
  testController.publish("test")
  expect(testObject.success).toEqual(true)
})
