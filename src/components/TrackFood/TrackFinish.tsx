import { Resource, component$, useContext } from "@builder.io/qwik";
import { contextFoodTrack } from "./trackFood";
import { Ingredient } from "~/routes/api/service_food_group/get_food_groups";

const FinishTrack = component$(() => {
    const myEats = useContext(contextFoodTrack);
    const listOfValues: {ing: Ingredient[], mealName: string, mealTimeRange: [number, number]}[] = [
      {
        ing: [
          {name: 'Apple'},
          {name: 'Orange'},
          {name: 'Banana'},
          {name: 'Apple'},
          {name: 'Orange'},
          {name: 'Banana'},
        ],
        mealName: 'Breakfast',
        mealTimeRange: [8, 10],
      },
      {
        ing: [
          {name: "Banana"}
        ],
        mealName: 'Lunch',
        mealTimeRange: [12, 14],
      },
      {
        ing: [
          {name: "Orange"}
        ],
        mealName: 'Snack',
        mealTimeRange: [15, 16],
      },
      {
        ing: [
          {name: "Pineapple"}
        ],
        mealName: 'Dinner',
        mealTimeRange: [18, 20],
      },
      {
        ing: [
          {name: "Grapes"}
        ],
        mealName: 'Snack',
        mealTimeRange: [21, 22],
      },
      {
        ing: [
          {name: "Strawberry"}
        ],
        mealName: 'Snack',
        mealTimeRange: [23, 24],
      }
    ];


  
    return (
      <>
        <div class="flex flex-col justify-between">
          
          <div class="grid gap-3 sticky top-0 bg-emerald-950 z-50">
            <Resource 
              value={myEats.resourceIngredients} 
              onResolved={(value) => {
                return (
                  <ul class="grid gap-6">
                  {listOfValues.map((item, index) => {
                    return (
                      <li key={index} class=" grid gap-2">
                        <h2>{mealText(item.mealTimeRange, item.mealName)}</h2>
                        <ul class="flex gap-2 flex-wrap ">
                          {item.ing.map((ing, index) => {
                            return (
                              <li class="flex gap-2 p-4 bg-emerald-900 rounded-md">
                                <span class="">{ing.name}</span>
                                <span>{ing.selectedMeasurement}</span>
                                <span></span>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
                )
              }}
            />
                          
          </div>

        </div>
      </>
    )
});

export default FinishTrack;

function mealText(mealTimeRange: [number, number], mealName: string) {
  return `${mealName} ${mealTimeRange[0]}-${mealTimeRange[1]}`;
}