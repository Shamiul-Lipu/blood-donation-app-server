import prisma from "../../../shared/prisma";

const userManagement = async (payload: any) => {
  const result = await prisma.user.update({
    where: { id: payload.id },
    data: {
      isAccountActive: payload.isAccountActive,
      role: payload.role,
    },
    select: { id: true, isAccountActive: true, role: true, userProfile: true },
  });

  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const AdminServices = { userManagement, getAllUser };
