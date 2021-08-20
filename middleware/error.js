import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = "Duplicate Field Value";
    error = new ErrorResponse(message, 400);
  }
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(message, 400);
  }
  console.log(err)
  res
    .status(error.statuscode || 500)
    .json({ success: false, error: error.message || "ValidationError" });
};
export default errorHandler;
