import { z } from "zod";

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
