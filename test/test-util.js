import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeTextUser = async() => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test"
    }
  })
}

export const createTextUser = async() => {
  await prismaClient.user.create({
    where: {
      username: "test",
      password: await bcrypt.hash("kipli123", 10),
      name: "test",
      token: "test"
    }
  })
}