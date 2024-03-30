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
    filters.bloodType = encodeURIComponent(filters.bloodType as any);
    filters.searchTerm = filters.searchTerm.replace(/%20/g, "+");
    filters.bloodType = filters.bloodType.replace(/%20/g, "+");
  }

  //   console.log(filters);
  const result = await BloodDonationServices.getDonorList(filters, options);

  res.json({
    success: true,
    statusCode: 200,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.data,
  });
});

export const BloodDonationControllers = {
  getAllFromDB,
};
