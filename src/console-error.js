const consoleError = () => {
  if (process.env.NODE_ENV !== "test" && !process.env.VERBOSE) {
    console.error(arguments)
  }
}

export default consoleError
