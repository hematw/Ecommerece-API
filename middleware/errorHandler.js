function errorHandler(err, req, res, next) {
  res.status(500).json({ success: false, err: err.message });
}

module.exports = errorHandler;
