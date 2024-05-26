import prisma from "../../../shared/prisma";

const getMyProfile = async (payload: any) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: payload.id },
    include: { userProfile: true },
  });

  if (!user) {
    throw new Error("Unauthorized Access");
  }

  const { password, ...result } = user;

  return result;
};

const updateMyProfile = async (user: any, data: any) => {
  await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...data,
      userProfile: data.userProfile
        ? {
            update: {
              ...data.userProfile,
            },
          }
        : undefined,
    },
    include: { userProfile: true },
  });

  return result;
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
};
