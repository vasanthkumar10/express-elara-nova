function success(res) {
  return res.status(200).json(obj);
}

function created(res, obj) {
  return res.status(201).json(obj);
}

function clientError(res, msg) {
  return res.status(400).send(msg);
}

function unauthorised(res, msg) {
  return res.status(401).send(msg);
}

function accessDenied(res, msg) {
  return res.status(403).send(msg);
}

function dataNotFound(res, msg) {
  return res.status(404).send(msg);
}

function internalError(res, obj) {
  return res.status(500).json(obj);
}

module.exports = {
  success,
  created,
  clientError,
  unauthorised,
  accessDenied,
  dataNotFound,
  internalError,
};
