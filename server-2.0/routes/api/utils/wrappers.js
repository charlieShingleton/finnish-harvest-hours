module.exports = {
  wrapErrors,
  handleRes,
  supportedMethods
};

function handleRes(response) {
  return function applyHttpObjects(req, res, next) {
    const [statusCode, result] = response;
    return res
      .status(statusCode)
      .json({ status: String(statusCode), data: result });
  };
}

function supportedMethods(methods) {
  return function checkHandlers(req, res, next) {
    let { method } = req;
    method = method.toUpperCase();
    const methodSupported = methods.find(mthd => mthd.toUpperCase() === method);
    if (!methodSupported) {
      const errMsg = `${req.ip} tried to ${method} to ${req.originalUrl} but ${method} is not supported on this route`;
      const err = new Error(errMsg);
      const allowedMethods = methods.join(", ").toUpperCase();
      res.set("Allow", allowedMethods);
      return next(err);
    }
    const errMsg = `${method} is supported for this route but no handler for ${method} requests was found`;
    const err = new Error(errMsg);
    return next(err);
  };
}

function wrapErrors(fn) {
  // Make sure to `.catch()` any errors and pass them along to the `next()`
  // middleware in the chain, in this case the error handler.
  // ** caveat is that routes must return promises
  return function executePromise(req, res, next) {
    fn(req, res, next).catch(next);
  };
}
