import catchAsync from "../../../shared/catchAsync";
import { AdminServices } from "./admin.service";

const userManagement = catchAsync(async (req, res) => {
  const result = await AdminServices.userManagement(req.body);

  res.json({
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUser();

  res.json({
    success: true,
    statusCode: 200,
    message: "All user retrived successfully",
    data: result,
  });
});

export const AdminControllers = {
  userManagement,
  getAllUser,
};
