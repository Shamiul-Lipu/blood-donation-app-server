import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { filtarableFields } from "./bloodDonation.constant";
import { BloodDonationServices } from "./bloodDonation.service";

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, filtarableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  if (filters.searchTerm || filters.bloodType) {
    // Encode the searchTerm parameter using encodeURIComponent
    filters.searchTerm = encodeURIComponent(filters.searchTerm as any);
    filters.searchTerm = filters.searchTerm.replace(/%20/g, "+");
  }

  const result = await BloodDonationServices.getDonorList(filters, options);

  res.json({
    success: true,
    statusCode: 200,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.data,
  });
});

const requestForBlood = catchAsync(async (req, res) => {
  const result = await BloodDonationServices.requestForBlood(
    req.user,
    req.body
  );

  res.json({
    success: true,
    statusCode: 201,
    message: "Request successfully made",
    data: result,
  });
});

const getDonationRequests = catchAsync(async (req, res) => {
  const result = await BloodDonationServices.getDonationRequests(req.user);

  res.json({
    success: true,
    statusCode: 200,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

const updateRequestApplicationStatus = catchAsync(async (req, res) => {
  const result = await BloodDonationServices.updateRequestApplicationStatus(
    req.user,
    req.params,
    req.body
  );

  res.json({
    success: true,
    statusCode: 200,
    message: "Donation request status successfully updated",
    data: result,
  });
});

const getDonorDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BloodDonationServices.getDonorDetails(id);

  res.json({
    success: true,
    statusCode: 200,
    message: "Donor Details retrived successfully",
    data: result,
  });
});

export const BloodDonationControllers = {
  getAllFromDB,
  requestForBlood,
  getDonationRequests,
  updateRequestApplicationStatus,
  getDonorDetails,
};
