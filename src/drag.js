import dragula from "dragula"

const drag = dragula({
  revertOnSpill: true,
  invalid: function (element, handle) {
    if (element.classList.contains("ship")) {
      return false
    } else {
      return true
    }
  }
})

export default drag
