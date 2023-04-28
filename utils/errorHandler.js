const { internalError } = require("../utils/response");

function errorHandler(cntrlFn) {
  return async (req, res) => {
    try {
      await cntrlFn(req, res);
    } catch (err) {
      return internalError({
        msg: "Something went wrong...",
        error: err.message,
      });
    }
  };
}

module.exports = {
  errorHandler,
};
