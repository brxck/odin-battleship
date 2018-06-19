const eventController = {
  events: {},
  subscribe: function (eventName, call) {
    if (this.events[eventName] !== undefined) {
      this.events[eventName].push(call)
    } else {
      this.events[eventName] = call
    }
  },
  publish: function (eventName, data) {
    this.events[eventName].forEach(call => {
      call(data)
    })
  }
}

export default eventController
