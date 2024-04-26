import { addSpaceBeforeCapitalLetter, capitalFirstCharInAString, fixEnglishMeasurementName } from "./stringMinipuletion";
import type foodGroup from '~/food_groups.json';

export function createFoodGroup(group: typeof foodGroup.groups[0]) {
    return {
      id : group.key,
      group_name: capitalFirstCharInAString(addSpaceBeforeCapitalLetter(group.key)),
      group_hebrew_name: group.value.name,
      info: group.value.info,
      calories: group.value.calories,
      protein: group.value.protein,
      fats: group.value.fats,
      carbs: group.value.carbs,
    }
  }
  
export function createMeasurements(data: typeof foodGroup.data.ingredients) {
    return data.flatMap(i => {
      return i.measurements.map(m => {
        return {
          name: fixEnglishMeasurementName(m.englishName),
          hebrew_name: m.name,
          id: fixEnglishMeasurementName(m.englishName).replaceAll(" ", "_"),
        }
      })
    });
  }


export function createIngredientForFoodGroup(data: typeof foodGroup.data.ingredients) {
    return data.map(i => {
        return {
            addCarbs: i.addCarbs,
            addFat: i.addFat,
            addProtein: i.addProtein,
            foodGroupNumber: i.foodGroupNumber,
            group: i.groupType,
            hebrew_name: i.name,
            name: i.englishName,
            measurements: i.measurements.map(m => m.name),
            serving: i.serving,
            servingUnit: i.servingUnit
        }
    })
  }
  