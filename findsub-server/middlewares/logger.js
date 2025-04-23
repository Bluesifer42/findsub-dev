// /middlewares/logger.js

const logger = (req, res, next) => {
    const start = Date.now();
    const timestamp = new Date().toISOString();
    const { method, originalUrl, body } = req;
  
    console.log(`📥 [${timestamp}] ${method} ${originalUrl}`);
    if (body && Object.keys(body).length > 0) {
      console.log('🧾 Body:', body);
    }
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`✅ Response ${res.statusCode} (${duration}ms) for ${method} ${originalUrl}`);
    });
  
    next();
  };
  
  module.exports = logger;
  