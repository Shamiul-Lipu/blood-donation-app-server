import * as bcrypt from "bcrypt";
import config from "../../config";
import prisma from "../../../shared/prisma";
import { isValidDateFormat } from "../../../shared/isValidDateFormat";
import { createToken, verifyToken } from "../../../helper/jwtToken";
import { UserRole } from "@prisma/client";

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

  const availability =
    typeof payload.availability === "boolean" ? payload.availability : false;

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        bloodType: payload.bloodType,
        role: UserRole.USER,
        location: payload.location,
        division: payload.division,
        address: payload.address,
        availability: availability,
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
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password incorrect!");
  }

  const jwtPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  return {
    ...jwtPayload,
    name: userData.name,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: any) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.jwt_refresh_token_secret as string);
  } catch (err) {
    throw new Error("User not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const jwtPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
};
