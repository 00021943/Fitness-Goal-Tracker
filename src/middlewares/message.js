function messageHandlerMiddleware (req, res, next) {
    res.locals.messages = {
        success: null,
        error: null,
    }

    // Метод для установки сообщений
    res.setMessage = (type, message) => {
        res.locals.messages[type] = message
    }

    next()
}

module.exports = { messageHandlerMiddleware };