const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || 500;
  res.status(statusCode).json({ message: message, err });
};

module.exports = errorHandler;