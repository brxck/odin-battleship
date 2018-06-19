import { updateFeed } from "./dom"

const eventController = {
  events: {},
  subscribe: function (eventName, call) {
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
}

subscribeFeed()

export default eventController
