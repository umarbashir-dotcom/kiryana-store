import colors from "colors"
let counter = 1
const logger = (req, res, next) => {
    const methodColors = {
        GET: "green",
        PUT: "yellow",
        POST: "blue",
        DELETE: "red"
    }

    const color = methodColors[req.method]

    console.log(`${counter} ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[color])
    counter++;
    next()
}

export default logger