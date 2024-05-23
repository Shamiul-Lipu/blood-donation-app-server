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
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  res.json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  // req sent/set as cookie and get as cookies because multiple cookies can be sent
  // console.log(req.cookies);
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  res.json({
    success: true,
    statusCode: 200,
    message: "Refresh token retrived successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
