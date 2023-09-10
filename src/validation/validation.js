import { ResponseError } from "../error/response-error";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
}

export {
  validate
}