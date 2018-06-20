import drag from "./drag"

const attackElement = (x, y, opponent) => {
  opponent.attack(x, y)
}

const renderBoard = (player, opponent, view) => {
  const gameboard = player.gameboard
  const boardElement = createElement("table")

  for (let y = 0; y < gameboard.size; y++) {
    const row = createElement("tr")
    boardElement.appendChild(row)

    for (let x = 0; x < gameboard.size; x++) {
      const cell = createElement("td", { id: `cell-${x}-${y}` })
      if (player.name === "cpu") {
        cell.addEventListener("click", () => attackElement(x, y, opponent))
      }
      drag.containers.push(cell)
      row.appendChild(cell)
    }
  }
  view.innerHTML = ""
  view.appendChild(boardElement)

  if (player.name === "player") {
    drag.on("drop", (element, target, source) => {
      // Integer string mixups are really fun
      const [, x0, y0] = source.id.split("-").map(item => Number(item))
      const [, x1, y1] = target.id.split("-").map(item => Number(item))
      if (!player.gameboard.move(x0, y0, x1, y1)) {
        drag.cancel()
      }
    })
  }
}

const renderShips = (player, view) => {
  const gameboard = player.gameboard

  const createShipElement = (cell, x, y) => {
    if (cell.ship !== undefined && cell.index === 0) {
      const ship = cell.ship
      const cellElement = view.querySelector(`#cell-${x}-${y}`)
      let width, height
      if (ship.direction === "h") {
        width = `calc(${100 * cell.ship.length}% + ${cell.ship.length}px)`
        height = "100%"
      } else if (ship.direction === "v") {
        width = "100%"
        height = `calc(${100 * cell.ship.length}% + ${cell.ship.length}px)`
      }
      const shipElement = createElement("div", {
        className: "ship",
        "style.height": height,
        "style.width": width
      })
      shipElement.addEventListener("click", event => {
        if (gameboard.rotate(x, y)) {
          const newWidth = event.target.style.height
          event.target.style.height = event.target.style.width
          event.target.style.width = newWidth
        }
      })
      cellElement.appendChild(shipElement)
    }
  }
  gameboard.iterate(createShipElement)
}

const renderPegs = (gameboard, view) => {
  gameboard.hits.iterate((hit, x, y) => {
    if (hit === true) {
      let pegElement = createElement("div", {
        className: "peg hit"
      })
      view.querySelector(`#cell-${x}-${y}`).append(pegElement)
      hit = false
    }
  })
  gameboard.misses.iterate((miss, x, y) => {
    if (miss === true) {
      let pegElement = createElement("div", {
        className: "peg miss"
      })
      view.querySelector(`#cell-${x}-${y}`).append(pegElement)
      miss = false
    }
  })
}

const feedQueue = []

const updateFeed = message => {
  const messageElement = createElement("p", { textContent: message })
  feedQueue.push(messageElement)
}

const renderFeed = () => {
  const feed = document.getElementById("feed")
  feedQueue.forEach(messageElement => {
    feed.prepend(messageElement)
  })
}

const createElement = (tag, properties) => {
  const element = document.createElement(tag)

  // Sets nested properties from string
  for (const item in properties) {
    const split = item.split(".")

    let property = element
    let i
    for (i = 0; i < split.length - 1; i++) {
      property = property[split[i]]
    }
    property[split[i]] = properties[item]
  }
  return element
}

const disableDrag = () => {
  drag.containers = []
}

export {
  renderBoard,
  renderShips,
  updateFeed,
  renderPegs,
  renderFeed,
  disableDrag
}
