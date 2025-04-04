function log(req, res, next) {
    // Log method and URL for each request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    next();
  }
  
  module.exports = { log };
  