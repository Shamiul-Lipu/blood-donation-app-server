import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
  gender: z.string({ required_error: "Gernder is required" }),
  profileImage: z.string({ required_error: "profileImage is required" }),
  bloodType: z.string({ required_error: "bloodType is required" }),
  location: z.string({ required_error: "location is required" }),
  division: z.string().min(1, "Division is required"),
  address: z.string().min(1, "Address details is required"),
  age: z.number({ required_error: "age is required" }),
  bio: z.string({ required_error: "bio is required" }),
  phoneNumber: z.string({ required_error: "phoneNumber is required" }),
  availability: z.boolean({
    required_error: "Option to donate blood availability is required",
  }),
  lastDonationDate: z.string({
    required_error: "lastDonationDate is required",
  }),
});

export const loginValidationSchema = z.object({
  email: z.string({ required_error: "email is required." }),
  password: z.string({ required_error: "Password is required" }),
});
