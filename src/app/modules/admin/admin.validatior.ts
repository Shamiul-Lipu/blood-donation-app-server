import { z } from "zod";

const prismaEnumValues = {
  ADMIN: "ADMIN",
  USER: "USER",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const UserRole = Object.keys(prismaEnumValues);

export const userManagementValidationSchema = z.object({
  id: z.string({ required_error: "User id is required." }),
  isAccountActive: z.boolean({
    required_error: "IsAccountActive is required.",
  }),
  role: z
    .string({ required_error: "Role is required" })
    .refine((role) => Object.values(prismaEnumValues).includes(role), {
      message: "Role must be valid",
    }),
});
