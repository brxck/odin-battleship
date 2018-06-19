import { updateFeed } from "./dom"

let sunk = false

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
    if (sunk === true) {
      updateFeed(`${data.x}, ${data.y} |> we sunk one!`)
    } else {
      updateFeed(`${data.x}, ${data.y} |> we hit 'em!`)
    }
    sunk = false
  })
  eventController.subscribe("playerMiss", data => {
    updateFeed(`${data.x}, ${data.y} |> we missed.`)
  })
  eventController.subscribe("cpuHit", data => {
    if (sunk === true) {
      updateFeed(`${data.x}, ${data.y} |> we lost a ship!`)
    } else {
      updateFeed(`${data.x}, ${data.y} |> we're hit!`)
    }
    sunk = false
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
  eventController.subscribe("sunk", () => {
    sunk = true
  })
}

subscribeFeed()

export default eventController
