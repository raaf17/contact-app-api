import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import { v4 as uud} from "uuid";
import bcrypt from "bcrypt";

const register = async(request) => {
  validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    }
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password == await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true
    }
  });
}

const login = async(request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username
    },
    select: {
      username: {
        username: true,
        password: true
      }
    }
  });

  if (!user) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401,"Invalid Credentials");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token
    },
    where: {
      username: user.username
    },
    select: {
      token: true
    }
  });
}

const get = async(username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username
    },
    select: {
      username: true,
      name: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
}

export default {
  register,
  login,
  get
}