<<<<<<< HEAD
const User = require("../models/user");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
=======
const {info, error} = require("./logger");

const requestLogger = (request, response, next) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
<<<<<<< HEAD
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "expired token" });
  }

  logger.error(error.message);

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }

  next();
=======
  }

  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
<<<<<<< HEAD
  tokenExtractor,
  userExtractor,
=======
>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
};
