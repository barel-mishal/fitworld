import { type AppLinkProps } from "~/routes.gen";

export type RoutesLiteral = AppLinkProps["route"];

export type SchemaProfileType = {
  id?: string;
  userId: string;
  name: string;
  email: string;
  picture: string;
  nickname: string;
  dateOfBirth: string;
  gender: "female" | "male" | "";
  createdAt: string;
  updateAt: string;
};

export type SchemaUserType = {
  id?: string;
  providerId: string;
  roles: string[];
  createdAt: string;
  updateAt: string;
};

export type SchemaWeightType = {
  id?: string;
  userId: string;
  weight: number;
  createdAt: string;
  updateAt: string;
};

export type SchemaHeightType = {
  id?: string;
  userId: string;
  height: number;
  createdAt: string;
  updateAt: string;
};

