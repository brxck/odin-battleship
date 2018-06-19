const EventController = () => {
  return {
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
}

export default EventController
