const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    // console.log(1);
    res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(' ')[1];
  // console.log(token);
  if (token === 'null') {
    // console.log(2);
    res.status(401).send("Unauthorized request");
  }
  try {
    let payload = jwt.verify(token, "secretKey");
    req.userId = payload.subject;
    // console.log(3);
    // console.log(payload);
    next();
  } catch (error) {
    // console.log(4);
    res.status(401).send("Unauthorized request");
  }
}

module.exports = verifyToken;