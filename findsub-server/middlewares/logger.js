// File: /middlewares/logger.js
// Purpose: Express middleware for detailed API request and response logging
// Standards:
// - Centralized logging
// - Timestamps and duration tracking
// - Clear separation of request and response

const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  const { method, originalUrl, body } = req;

  console.log(`📥 [${timestamp}] ${method} ${originalUrl}`);
  if (body && Object.keys(body).length > 0) {
    console.log('🧾 Request Body:', JSON.stringify(body, null, 2));
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ [${timestamp}] ${method} ${originalUrl} ➡️ ${res.statusCode} (${duration}ms)`);
  });

  res.on('close', () => {
    const duration = Date.now() - start;
    if (!res.writableEnded) {
      console.warn(`⚠️ [${timestamp}] ${method} ${originalUrl} ➡️ Connection closed after ${duration}ms without full response`);
    }
  });

  next();
};

module.exports = logger;
