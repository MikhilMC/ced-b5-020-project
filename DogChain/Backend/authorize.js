const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send("Unauthorized request");
  }
  try {
    let payload = jwt.verify(token, "secretKey");
    req.userId = payload.subject;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized request");
  }
}

module.exports = verifyToken;