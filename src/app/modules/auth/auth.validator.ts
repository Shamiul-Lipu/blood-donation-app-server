import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
  bloodType: z.string({ required_error: "bloodType is required" }),
  location: z.string({ required_error: "location is required" }),
  age: z.number({ required_error: "age is required" }),
  bio: z.string({ required_error: "bio is required" }),
  lastDonationDate: z.string({
    required_error: "lastDonationDate is required",
  }),
});

export const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  password: z.string({ required_error: "Password is required" }),
});
