const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode)
    console.log(error)
    res.json({
        success: false,
        error: error.message
    })
}

export default errorHandler