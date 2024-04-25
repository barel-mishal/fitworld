import { z } from "@builder.io/qwik-city";
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

export const SchemaAssessment = z.object({
  personalInformation: z.object({
    gender: z.enum(["female", "male", ""]).default(""),
    name: z.string().default(""),
    dateOfBirth: z.string().pipe( z.coerce.date() ).or(z.date()).optional().transform((value) => {
      if (!value) return undefined;
      return {
        day: value.getDate().toString(),
        month: (value.getMonth() + 1).toString(),
        year: value.getFullYear().toString()
      }
    }),
    height: z.object({
      type: z.enum(["FT", "m", "cm"]).default("cm"),
      value: z.number().default(0),
      id: z.string()
    }),
    weight: z.object({
      type: z.enum(["kg", "g", "lb"]).default("kg"),
      value: z.number().default(0),
      id: z.string()
    })
  }),
  lifeStyle: z.object({
    occupation: z.string().default(""),
    activityLevel: z.string().default(""),
    goals: z.array(z.string()).default(["", "", ""])
  }),
}).default({
  personalInformation: {
    gender: "",
    name: "",
    dateOfBirth: undefined,
    height: {type: "cm", value: 0, id: ""},
    weight: {type: "kg", value: 0, id: ""},
  },
  lifeStyle: {
    occupation: "",
    activityLevel: "",
    goals: ["", "", ""]
  }
});

export type TypeSchemaAssessment = z.infer<typeof SchemaAssessment>;

