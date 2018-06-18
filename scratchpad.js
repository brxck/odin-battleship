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

let element = createElement("div", { "style.height": "100%" })
console.log(element.style.height)
