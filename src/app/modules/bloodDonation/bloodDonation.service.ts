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

  // console.log({ filterData });

  // if (Object.keys(filterData).length > 0) {
  //   andCondions.push({
  //     OR: Object.keys(filterData).map((key) => ({
  //       [key]: {
  //         equals:
  //           key === "availability"
  //             ? filterData[key] === "true"
  //             : filterData[key],
  //       },
  //     })),
  //   });
  // }

  if (Object.keys(filterData).length > 0) {
    Object.keys(filterData).forEach((key) => {
      if (key === "availability" || key === "bloodType" || key === "location") {
        andCondions.push({
          OR: [
            {
              [key]: {
                equals:
                  key === "availability"
                    ? filterData[key] === "true"
                    : filterData[key],
              },
            },
          ],
        });
      } else {
        andCondions.push({
          [key]: {
            equals: filterData[key],
          },
        });
      }
    });
  }

  andCondions.push({
    isAccountActive: true,
  });

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
      address: true,
      requestsAsDonor: true,
      requestsAsRequester: true,
      gender: true,
      division: true,
      profileImage: true,
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
  // console.log(payload);
  const donor = await prisma.user.findUnique({
    where: { id: payload.donorId },
  });

  // If the donor doesn't exist, throw an error
  if (!donor) {
    throw new Error("The specified donor does not exist.");
  }

  // Check if the availability of the donor is false, throw an error if it is
  if (!donor.availability) {
    throw new Error("The specified donor is not available for donation.");
  }

  // checking dateOfDonation date format is ok
  if (payload.dateOfDonation) {
    if (!isValidDateFormat(payload.dateOfDonation)) {
      throw new Error("Invalid date format. Please use the format YYYY-MM-DD.");
    }
  }

  const existingRequest = await prisma.request.findFirst({
    where: {
      donorId: payload.donorId,
      requesterId: user.id,
    },
  });

  if (existingRequest) {
    throw new Error(
      "A request with the same donorId and requesterId already exists."
    );
  }

  const requester = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    include: {
      userProfile: {
        select: { age: true, phoneNumber: true, lastDonationDate: true },
      },
    },
  });

  const result = await prisma.request.create({
    data: {
      donorId: payload.donorId,
      requesterId: user.id,
      requesterName: requester.name,
      requesterEmail: requester.email,
      requesterAge: requester.userProfile?.age as number,
      requesterPhoneNumber: requester.userProfile?.phoneNumber as string,
      requesterLastDonationDate: requester.userProfile
        ?.lastDonationDate as string,
      requesterLocation: requester.location,
      requesterDivision: requester.division,
      requesterAddress: requester.address,
      isTermsAgreed: payload.isTermsAgreed,
      hospitalName: payload.hospitalName,
      dateOfDonation: payload.dateOfDonation,
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
  const requestByMe = await prisma.request.findMany({
    where: {
      requesterId: user.id,
    },
    select: {
      requestStatus: true,
      donor: {
        select: {
          bloodType: true,
          availability: true,
          name: true,
          division: true,
          location: true,
          address: true,
          userProfile: true,
        },
      },
    },
  });

  const requestToMe = await prisma.request.findMany({
    where: {
      donorId: user.id,
    },
    select: {
      id: true,
      requestStatus: true,
      requesterPhoneNumber: true,
      requesterName: true,
      requesterEmail: true,
      requesterLocation: true,
      requesterDivision: true,
      requesterAddress: true,
      requester: {
        select: {
          bloodType: true,
        },
      },
    },
  });
  // console.log(requestByMe, requestToMe);
  return { requestByMe, requestToMe };
};

const updateRequestApplicationStatus = async (
  user: any,
  params: any,
  data: any
) => {
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

  // console.log(user.id, existingRequest);
  if (user.id === existingRequest.requesterId) {
    throw new Error(
      "You are requester here, unauthorized to update status of this request"
    );
  }

  const result = await prisma.request.update({
    where: { id: params.requestId, donorId: user.id },
    data: { requestStatus: data.status },
  });

  return result;
};

const getDonorDetails = async (id: string) => {
  const result = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      address: true,
      requestsAsDonor: true,
      requestsAsRequester: true,
      gender: true,
      division: true,
      profileImage: true,
      createdAt: true,
      password: false,
      updatedAt: true,
      userProfile: true,
    },
  });

  return result;
};

export const BloodDonationServices = {
  getDonorList,
  requestForBlood,
  getDonationRequests,
  updateRequestApplicationStatus,
  getDonorDetails,
};
