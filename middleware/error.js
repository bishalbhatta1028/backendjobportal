//errror middleware
const errorMiddleware = (err, req, res, next) => {
  if (err.name == "ValidationError") {
    let errors = Object.entries(err.errors).map((error) => {
      return {
        // name: error[1].name,
        params: error[0],
        msg: error[1].message,
      };
    });
    res.status(400).send({
      message: "Validation Error",
      process: "failed",
      err: err.message,
      errors,
    });
  } else {
    res.status(500).send({
      message: "Server Error",
      errors: err.message,
      err,
    });
  }
};

export default errorMiddleware;
