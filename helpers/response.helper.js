//helpers for streamling responses
exports.success = function (res, msg) {
  let data = {
    status: true,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.failedOperation = function (res, msg) {
  let data = {
    status: true,
    message: msg,
  };
  return res.status(409).json(data);
};

exports.successData = function (res, msg, data, pagination = null) {
  let resData = {
    status: true,
    message: msg,
    pagination: pagination,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.recordCreated = function (res, msg, data) {
  let resData = {
    status: true,
    message: msg,
    data: data,
  };
  return res.status(201).json(resData);
};

exports.Error = function (res, msg) {
  let data = {
    status: false,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.status = function (res, msg) {
  let data = {
    status: false,
    message: msg,
  };
  return res.status(422).json(data);
};

exports.notFound = function (res, msg) {
  let data = {
    status: false,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, data) {
  let resData = {
    status: false,
    errors: data,
  };
  return res.status(422).json(resData);
};
exports.validationError = function (res, msg) {
  let resData = {
    status: false,
    message: msg,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  let data = {
    status: false,
    message: msg,
  };
  return res.status(401).json(data);
};
