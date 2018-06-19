import eventController from "../src/event"

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
  console.log(testController.events)
  testController.publish("test")
  expect(testObject.success).toEqual(true)
})
