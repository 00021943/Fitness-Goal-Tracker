function messageHandlerMiddleware(req, res, next) {
    // Initialize message variables
    res.locals.messages = {
        success: null,
        error: null,
    };

    // Method to set messages
    res.setMessage = (type, message) => {
        res.locals.messages[type] = message
    }

    next()
}

module.exports = { messageHandlerMiddleware };