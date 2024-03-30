import { z } from "zod";

// Assuming your Prisma enum is defined as an object
const prismaEnumValues = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const updateRequestApplicationStatusValidator = z
  .object({
    status: z.string({ required_error: "status is required." }),
  })
  .refine(({ status }) => Object.values(prismaEnumValues).includes(status), {
    message:
      "status must be one of the valid values like PENDING,APPROVED or REJECTED",
  });
