import { z } from "@builder.io/qwik-city";
import { type AppLinkProps } from "~/routes.gen";

export type RoutesLiteral = AppLinkProps["route"];

export const NumberOrString = z.string().or(z.number());
export const profileSchema = z.object({
  about: z.string(),
  activity_level: z.enum([
    "Sedentary",
    "Lightly active",
    "Moderately active",
    "Very active",
    "Extra active",
    "",
  ]),
  createdAt: z.string().datetime(),
  dateOfBirth: z.string().datetime(),
  email: z.string().email().or(z.string().optional()),
  gender: z.enum(["male", "female", ""]),
  goals: z.array(z.any()), // Assuming goals can be an array of any type, adjust as needed
  id: z.string().regex(/^profile:[a-z0-9]+$/),
  image: z.string().url().or(z.string().optional()),
  latest_height_cm: z.string().or(z.number()).optional(), // Assuming it's a string representation of a number
  latest_weight_kg: z.string().or(z.number()).optional(), // Assuming it's a string representation of a number
  name: z.string(),
  nickname: z.string(),
  updateAt: z.string().datetime(),
  userId: z.string().regex(/^user:[a-z0-9]+$/),
});

export const addonsProfileEnergySchema = z
  .object({
    overview: z.object({
      TEE: z.string().or(z.number()),
      TEE_RDA: z.object({ heigh: NumberOrString, low: NumberOrString }),
      bmi: NumberOrString,
      constant: NumberOrString,
      ideal_weight: z.object({
        message: z.string(),
        value: NumberOrString,
      }),
      normaliz_weight: NumberOrString,
      userId: z.string().regex(/^user:[a-z0-9]+$/),
    }).nullable(),
  })
  .merge(profileSchema);

export type SchemaProfileType = z.infer<typeof addonsProfileEnergySchema>;

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

export const SchemaAssessment = z
  .object({
    personalInformation: z.object({
      gender: z.enum(["female", "male", ""]).default(""),
      name: z.string().default(""),
      dateOfBirth: z
        .string()
        .pipe(z.coerce.date())
        .or(z.date())
        .optional()
        .transform((value) => {
          if (!value) return undefined;
          return {
            day: value.getDate().toString(),
            month: (value.getMonth() + 1).toString(),
            year: value.getFullYear().toString(),
          };
        }),
      height: z.object({
        type: z.enum(["FT", "m", "cm"]).default("cm"),
        value: z.number().default(0),
        id: z.string(),
      }),
      weight: z.object({
        type: z.enum(["kg", "g", "lb"]).default("kg"),
        value: z.number().default(0),
        id: z.string(),
      }),
    }),
    lifeStyle: z.object({
      occupation: z.string().default(""),
      activityLevel: z.string().default(""),
      goals: z.array(z.string()).default(["", "", ""]),
    }),
  })
  .default({
    personalInformation: {
      gender: "",
      name: "",
      dateOfBirth: undefined,
      height: { type: "cm", value: 0, id: "" },
      weight: { type: "kg", value: 0, id: "" },
    },
    lifeStyle: {
      occupation: "",
      activityLevel: "",
      goals: ["", "", ""],
    },
  });

export type TypeSchemaAssessment = z.infer<typeof SchemaAssessment>;

export const SchemaPositiveBiggerThanZero = z
  .string()
  .pipe(z.coerce.number().min(0).default(0))
  .transform((value) => value.toString());
