const render = (gameboard, view) => {
  view.innerHTML = ""
  const boardFragment = composeBoard(gameboard)
  view.appendChild(boardFragment)
  renderShips(gameboard, view)
}

const composeBoard = gameboard => {
  const boardElement = createElement("table")

  for (let y = 0; y < gameboard.size; y++) {
    const row = createElement("tr")
    boardElement.appendChild(row)

    for (let x = 0; x < gameboard.size; x++) {
      const cell = createElement("td", { id: `x${x}y${y}` })
      row.appendChild(cell)
    }
  }
  return boardElement
}

const renderShips = (gameboard, view) => {
  for (let y = 0; y < gameboard.size; y++) {
    for (let x = 0; x < gameboard.size; x++) {
      if (gameboard.cell(x, y).ship) {
        const cellElement = view.querySelector(`#x${x}y${y}`)
        const shipElement = createElement("div", {
          className: "ship",
          "style.height": "100%",
          "style.width": "100%"
        })
        cellElement.appendChild(shipElement)
      }
    }
  }
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

export default render
