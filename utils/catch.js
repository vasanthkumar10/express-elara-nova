function catchFn(res, err) {
  return res.status(500).json({
    msg: "Something went wrong...",
    error: err.message,
  });
}

module.exports = {
  catchFn,
};
