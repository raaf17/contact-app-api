import userService from "../service/user-service";

const register = async(req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export {
  register
}