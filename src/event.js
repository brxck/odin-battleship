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
        if (process.env.DEBUG) {
          console.log(`${eventName} triggered`, call)
        }
      })
    } else {
      console.error(`event ${eventName} does not exist`)
    }
  }
}

const subscribeFeed = () => {
  eventController.subscribe("playerHit", data => {
    updateFeed(`${data.x}, ${data.y} |> we got 'em!`)
  })
  eventController.subscribe("playerMiss", data => {
    updateFeed(`${data.x}, ${data.y} |> we missed.`)
  })
  eventController.subscribe("cpuHit", data => {
    updateFeed(`${data.x}, ${data.y} |> we're hit!`)
  })
  eventController.subscribe("cpuMiss", data => {
    updateFeed(`${data.x}, ${data.y} <| they missed us.`)
  })
  eventController.subscribe("victory", data => {
    updateFeed("|> we've sunk their fleet!")
    updateFeed("<~ Y O U <> W I N ~>")
  })
  eventController.subscribe("loss", data => {
    updateFeed("<| we've lost the fleet!")
    updateFeed("<~ G A M E <> O V E R ~>")
  })
}

subscribeFeed()

export default eventController
