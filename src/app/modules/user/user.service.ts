import prisma from "../../../shared/prisma";

const getMyProfile = async (payload) => {
  const result = await prisma.user.findFirstOrThrow({
    where: payload.email,
  });

  return result;
};
