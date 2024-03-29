import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  res.json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
