import * as bcrypt from "bcrypt";
import config from "../../config";
import prisma from "../../../shared/prisma";
import { isValidDateFormat } from "../../../shared/isValidDateFormat";

const registerUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  // checking lastDonationDate date format is ok
  if (payload.lastDonationDate) {
    if (!isValidDateFormat(payload.lastDonationDate)) {
      throw new Error("Invalid date format. Please use the format YYYY-MM-DD.");
    }
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        bloodType: payload.bloodType,
        location: payload.location,
      },
      include: { userProfile: true },
    });

    const createUserProfile = await transactionClient.userProfile.create({
      data: {
        bio: payload.bio,
        age: payload.age,
        lastDonationDate: payload.lastDonationDate,
        userId: createUser.id,
      },
    });

    return { createUser, createUserProfile };
  });
  // extracting password field from createUser result
  const { password, ...usersOtherFields } = result.createUser;

  return {
    ...usersOtherFields,
    userProfile: result.createUserProfile,
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const result = "login";

  return result;
};

export const AuthServices = {
  registerUser,
  loginUser,
};
