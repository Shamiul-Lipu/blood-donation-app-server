import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import { searchAbleFields } from "./bloodDonation.constant";
import prisma from "../../../shared/prisma";
import { isValidDateFormat } from "../../../shared/isValidDateFormat";

const getDonorList = async (params: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: searchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //   console.log(filterData);

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      OR: Object.keys(filterData).map((key) => ({
        [key]: {
          equals:
            key === "availability"
              ? filterData[key] === "true"
              : filterData[key],
        },
      })),
    });
  }

  console.log(options.sortBy);
  const whereConditons: Prisma.UserWhereInput = { AND: andCondions };

  const result = await prisma.user.findMany({
    where: whereConditons,
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      password: false,
      updatedAt: true,
      userProfile: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? options.sortBy === "age"
          ? { userProfile: { age: options.sortOrder } }
          : options.sortBy === "lastDonationDate"
          ? { userProfile: { lastDonationDate: options.sortOrder } }
          : { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const requestForBlood = async (user: any, payload: any) => {
  console.log(user, payload);
  // checking dateOfDonation date format is ok
  if (payload.dateOfDonation) {
    if (!isValidDateFormat(payload.dateOfDonation)) {
      throw new Error("Invalid date format. Please use the format YYYY-MM-DD.");
    }
  }

  const result = await prisma.request.create({
    data: {
      donorId: payload.donorId,
      requesterId: user.id,
      phoneNumber: payload.phoneNumber,
      dateOfDonation: payload.dateOfDonation,
      hospitalName: payload.hospitalName,
      hospitalAddress: payload.hospitalAddress,
      reason: payload.reason,
    },
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
          createdAt: true,
          updatedAt: true,
          userProfile: true,
        },
      },
    },
  });

  return result;
};

const getDonationRequests = async (user: any) => {
  const result = prisma.request.findMany({
    where: {
      donorId: user.id,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
        },
      },
    },
  });

  return result;
};

const updateRequestApplicationStatus = async (params: any, data: any) => {
  // Check if the requestId is provided
  if (!params.requestId) {
    throw new Error("Request ID is required.");
  }

  // Check if the request with the provided ID exists
  const existingRequest = await prisma.request.findUnique({
    where: { id: params.requestId },
  });

  // If the request does not exist, throw an error
  if (!existingRequest) {
    throw new Error("Request not found.");
  }

  const result = await prisma.request.update({
    where: { id: params.requestId },
    data: { requestStatus: data.status },
  });

  return result;
};

export const BloodDonationServices = {
  getDonorList,
  requestForBlood,
  getDonationRequests,
  updateRequestApplicationStatus,
};
