import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.service";

const getMyProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getMyProfile(req.user);

  res.json({
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateMyProfile(req.user, req.body);

  res.json({
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  getMyProfile,
  updateMyProfile,
};
