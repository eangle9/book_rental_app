const notFound = (req, res, next) => {
  console.log("Request Object:", req);
  if (!req || !req.originalUrl) {
    console.error("req or req.originalUrl is undefined");
    return res.status(500).send("Internal Server Error");
  }
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: {
      message: err.message,
      stacktrace: process.env.ENVIROMENT === "production" ? null : err.stack,
    },
  });
};

module.exports = { notFound, errorHandler };
