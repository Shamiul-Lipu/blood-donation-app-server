import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import { searchAbleFields } from "./bloodDonation.constant";
import prisma from "../../../shared/prisma";

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

  console.log(filterData);

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

export const BloodDonationServices = {
  getDonorList,
};
