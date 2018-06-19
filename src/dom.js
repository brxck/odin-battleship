const attackElement = (x, y, gameboard) => {
  gameboard.receiveAttack(x, y)
}

const renderBoard = (gameboard, view) => {
  const boardElement = createElement("table")

  for (let y = 0; y < gameboard.size; y++) {
    const row = createElement("tr")
    boardElement.appendChild(row)

    for (let x = 0; x < gameboard.size; x++) {
      const cell = createElement("td", { id: `x${x}y${y}` })
      cell.addEventListener("click", () => attackElement(x, y, gameboard))
      row.appendChild(cell)
    }
  }
  view.innerHTML = ""
  view.appendChild(boardElement)
}

const renderShips = (gameboard, view) => {
  const createShipElement = (cell, x, y) => {
    if (cell.ship !== undefined && cell.index === 0) {
      const ship = cell.ship
      const cellElement = view.querySelector(`#x${x}y${y}`)
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
      cellElement.appendChild(shipElement)
    }
  }
  gameboard.iterate(createShipElement)
}

const renderPegs = (gameboard, view) => {
  gameboard.hits.forEach(hit => {
    if (hit[2] === true) {
      let pegElement = createElement("div", {
        className: "peg hit"
      })
      view.querySelector(`#x${hit[0]}y${hit[1]}`).append(pegElement)
      hit[2] = false
    }
  })
  gameboard.misses.forEach(miss => {
    if (miss[2] === true) {
      let pegElement = createElement("div", {
        className: "peg miss"
      })
      view.querySelector(`#x${miss[0]}y${miss[1]}`).append(pegElement)
      miss[2] = false
    }
  })
}

const updateFeed = message => {
  const feed = document.getElementById("feed")
  const messageElement = createElement("p", { textContent: "> " + message })
  if (feed.childElementCount >= 8) {
    feed.lastChild.remove()
  }
  feed.prepend(messageElement)
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

export { renderBoard, renderShips, updateFeed, renderPegs }
