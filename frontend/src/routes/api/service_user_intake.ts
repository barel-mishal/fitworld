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

    const intake = await dbUser.value?.query<[null, null, null, Partial<IntakeData>]>(`
        LET $eated =  ( SELECT 
            <decimal> measurement.weight AS measurement_weight,
            measurement.unit AS measurement_unit,
            food.hebrew_name AS name,
            <decimal> food.group.calories AS calories, 
            <decimal> food.group.protein AS protein, 
            <decimal> food.group.carbs AS carbs, 
            <decimal> food.group.fats AS fats, 
            <decimal> food.addProtein AS addProtein, 
            <decimal> food.addCarbs AS addCarbs, 
            <decimal> food.addFat AS addFat,
            <decimal> food.serving AS serving,
            food.servingUnit AS servingUnit,
            <decimal> amount as amount
        FROM Eat
        );

        LET $clac = ( SELECT 
            {
                name: name,
                amount: amount,
                serving: serving,
                servingUnit: servingUnit,
                calories: calories,
                addProtein: addProtein,
                addCarbs: addCarbs,
                addFat: addFat,
                measurement_weight: measurement_weight,
                measurement_unit: measurement_unit
            } as meta,
            (
                calories + 
                addProtein * 4 + 
                addCarbs * 4 + 
                addFat * 9
            ) * (
                measurement_weight / serving
            ) * amount as intake_calories,
            (
                protein + 
                addProtein) * 
            (
                measurement_weight / serving
            ) * amount as intake_protein,
            (carbs + addCarbs) * (measurement_weight / serving) * amount as intake_carbs,
            (fats + addFat) * (measurement_weight / serving) * amount as intake_fats
            
        FROM $eated );


        LET $total_eated = ( 
        SELECT 
            math::sum(intake_calories) as total_calories, 
            math::sum(intake_fats) as total_fats,
            math::sum(intake_protein) as total_proteins,
            math::sum(intake_carbs) as total_carbs
        FROM $clac GROUP ALL 
        );

        RETURN {
            totals: $total_eated,
            calculate_intake: $clac,
            eated: $eated
    };`);

    return intake?.[3] || { error: "No data found", success: false, value: null }
});