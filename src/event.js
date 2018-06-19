import { updateFeed } from "./dom"

const eventController = {
  events: {},
  subscribe: function (eventName, call) {
    if (typeof call !== "function") {
      console.error({
        eventName: eventName,
        call: call
      })
      throw Error("callback is not a function")
    }
    if (this.events[eventName]) {
      this.events[eventName].push(call)
    } else {
      this.events[eventName] = [call]
    }
  },
  publish: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(call => {
        call(data)
      })
    } else {
      console.error(`event ${eventName} does not exist`)
    }
  }
}

const subscribeFeed = () => {
  eventController.subscribe("hit", data => {
    updateFeed(`${data.opponent.name} hit at ${data.x}, ${data.y}`)
  })
  eventController.subscribe("miss", data => {
    updateFeed(`${data.opponent.name} missed at ${data.x}, ${data.y}`)
  })
  eventController.subscribe("victory", data => {
    updateFeed("you won!")
  })
  eventController.subscribe("loss", data => {
    updateFeed("you lost!")
  })
}

subscribeFeed()

export default eventController
