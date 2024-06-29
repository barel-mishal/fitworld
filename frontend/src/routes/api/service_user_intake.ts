import { server$ } from "@builder.io/qwik-city";
import { serverDatabaseUserSession } from "../seedDatabase";

interface MetaData {
    addCarbs: number;
    addFat: number;
    addProtein: number;
    amount: number;
    calories: number;
    measurement_unit: string;
    measurement_weight: number;
    name: string;
    serving: number;
    servingUnit: string;
  }
  
  interface CalculatedIntake {
    intake_calories: number;
    intake_carbs: number;
    intake_fats: number;
    intake_protein: number;
    meta: MetaData;
  }
  
  interface Eated {
    addCarbs: number;
    addFat: number;
    addProtein: number;
    amount: number;
    calories: number;
    carbs: number;
    fats: number;
    measurement_unit: string;
    measurement_weight: number;
    name: string;
    protein: number;
    serving: number;
    servingUnit: string;
  }
  
  interface Totals {
    total_calories: number;
    total_carbs: number;
    total_fats: number;
    total_proteins: number;
  }
  
  interface IntakeData {
    calculated_intake: CalculatedIntake[];
    eated: Eated[];
    totals: Totals[];
  }

export const server_user_intake = server$(async function () {

    const dbUser = await serverDatabaseUserSession();
    if (!dbUser.success) {
        return { error: "User not found", success: false, value: null }
    }

    const intake = await dbUser.value?.query<[null, null, null, Partial<IntakeData>]>(`RETURN fn::user_intake();`);

    return intake?.[3] || { error: "No data found", success: false, value: null }
});