let requests = {}

const rateLimiter = (configuration) => {
    return (req, res, next) => {
        const key = `${req.ip}:${configuration.page}`
        let user = requests[key]

        if (!user) {
            user = {
                count: 0,
                start_time: Date.now()
            }
            requests[key] = user
        }

        // 15 minutes passed
        if (Date.now() - user.start_time >= configuration.window) {
            user.count = 0
            user.start_time = Date.now()
        }

        user.count++

        console.log(key, user.count)
        // in case of too many requests
        if (user.count > configuration.limit) {
            return res.status(429).json({
                error: "Too many requests"
            })
        }

        next()
    }
}

export default rateLimiter;