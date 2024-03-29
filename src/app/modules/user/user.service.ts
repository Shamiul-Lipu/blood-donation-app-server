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
  await prisma.userProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });

  const result = await prisma.userProfile.update({
    where: {
      userId: user.id,
    },
    data,
  });

  return result;
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
};
