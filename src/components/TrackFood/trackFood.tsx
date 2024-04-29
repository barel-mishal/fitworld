import { $, type QRL, Resource, Slot, component$, createContextId, useContext, useContextProvider, useOn, useResource$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type Ingredient, serverGetIngredients } from "~/routes/api/service_food_group/get_food_groups";
import { type Eat, transformEat, serverAddEat } from "~/routes/api/service_food_group/add_eat";
import useDebouncer from "~/util/useDebouncer";


export const TrackFood = component$(() => {
  const myEats = useTrackFood();
  useContextProvider(contextFoodTrack, myEats);

  return <Slot />;
});

/*
2. get all food groups from database to application on typing
3. selecting from foods within database and insert them into id
4. selecting all the unit from within this unit appropetly
5. ui bwllow all food as list of items
6. when using selected foods 
7. track nutrition if the person gets something good then he gets a point / treat
*/
export const MainTrackFood = component$(() => {
    const myEats = useContext(contextFoodTrack);

    const debounce = useDebouncer(
      $((value: string) => {
        myEats.store.bindEating("food", value);
      }),
      300
    );

    const onPressArrowsKeys = $(async (e: KeyboardEvent) => {
      const ingredients = await myEats.resourceIngredients.value;
      const currentFood = myEats.store.eating.foodId;
      if (!currentFood) return;
      const index = ingredients.findIndex((food) => food.id === currentFood);
      if (myEats.store.state === "ingredients" && e.key === "ArrowDown") {
        if (ingredients.length === 0) return;
        const next = ingredients.at(index + 1);
        if (next) {
          myEats.store.bindEating("foodId", next.id);
        }
      } else if (myEats.store.state === "ingredients" && e.key === "ArrowUp") {
        if (ingredients.length === 0) return;
        const next = ingredients.at(index - 1);
        if (next) {
          myEats.store.bindEating("foodId", next.id);
        }
      } else if (myEats.store.state === "units" && e.key === "ArrowDown") {
        if (!myEats.store.selectedFood) return;
        const index = myEats.store.selectedFood.units.findIndex((unit) => unit.id === myEats.store.eating.measurementId);
        const next = myEats.store.selectedFood.units.at(index + 1);
        if (next) {
          myEats.store.bindEating("measurementId", next.id);
        }
      } else if (myEats.store.state === "units" && e.key === "ArrowUp") {
        if (!myEats.store.selectedFood) return;
        const index = myEats.store.selectedFood.units.findIndex((unit) => unit.id === myEats.store.eating.measurementId);
        const next = myEats.store.selectedFood.units.at(index - 1)
        if (next) {
          myEats.store.bindEating("measurementId", next.id);
        }
      } else if (myEats.store.state === "amounts" && e.key === "ArrowDown") {
        const currentAmount = myEats.store.eating.amount;
        const next = parseFloat(currentAmount) - 1;
        myEats.store.bindEating("amount", next.toString());
      } else if (myEats.store.state === "amounts" && e.key === "ArrowUp") {
        const currentAmount = myEats.store.eating.amount;
        const next = parseFloat(currentAmount) + 1;
        myEats.store.bindEating("amount", next.toString());
      }
    });

    const onClickFood = $(async (food: Ingredient) => {
        await myEats.store.updateIngredient(food);
        myEats.store.moveState("units");
        myEats.refUnit.value?.focus();
    });

    const onClickUnit = $(async (unit: Ingredient["units"][number]) => {
      await myEats.store.updarteUnit(unit);
      myEats.store.moveState("amounts");
      myEats.refAmount.value?.focus();
    });

    const onFocusAmount = $(() => {
      myEats.store.moveState("amounts");
    });
    const onFocusUnit = $(() => {
      myEats.store.moveState("units");
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      myEats.refFood.value?.focus();
    }, {strategy: "document-ready"});

    useOn("keydown", $(async (e) => {
      if (e.key === "Escape") {
        myEats.store.resetNewEat();
        myEats.refFood.value?.focus();
      } else if (e.key === "Enter") {
        await myEats.onClickNext();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        onPressArrowsKeys(e);
      }
    }));

  
    return (
      <>
        <div class="flex flex-col justify-between">
          
          <div class="grid gap-3 sticky top-0 bg-emerald-950 z-50">
            
            
            <section class="grid grid-cols-3 gap-3">
              <label for="new-food" class="text-emerald-100">Food</label>
              <label for="new-unit" class="text-emerald-100">Unit</label>
              <label for="new-amount" class="text-emerald-100">Amount</label>
            </section>
            
            
            <fieldset class="grid grid-cols-3 gap-3 ">
                <input id={"new-food"}  
                  type="text" 
                  ref={myEats.refFood}
                  autoComplete={"off"}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.store.eating.food} 
                  onFocus$={() => myEats.store.moveState("ingredients")}
                  onInput$={async (e,el) => await debounce(el.value)} 
                />
                <input id={"new-measurement"} 
                  type="text" 
                  ref={myEats.refUnit}
                  autoComplete={"off"}
                  onFocus$={onFocusUnit}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.store.eating.measurement} onInput$={(e,el) => myEats.store.bindEating("measurement", el.value)} 
                />
                <input id={"new-amount"} 
                  type="text" 
                  class="rounded-sm p-2 bg-emerald-800"
                  onFocus$={onFocusAmount}
                  ref={myEats.refAmount}
                  value={myEats.store.eating.amount} onInput$={(e,el) => myEats.store.bindEating("amount", el.value)} 
                />
            </fieldset>
            
            
            <ul class="overflow-x-auto bg-emerald-950 z-50">
              <li class="bg-emerald-950">
                <h5>
                  Fast selections
                </h5>
                <ul class="flex flex-wrap-0 gap-4 overflow-x-auto py-2 px-1 bg-emerald-950">
                    <li>
                      <button 
                      class="outline outline-emerald-200  px-6 py-2 rounded-sm"
                      onClick$={() => {
                        myEats.store.bindEating("food", "Water");
                        myEats.refFood.value?.focus();
                        myEats.store.moveState("ingredients");
                      }}
                      >
                        Water
                      </button>
                    </li>
                  {[].map((food) => {
                    return (
                      <li key={food} class=" bg-emerald-950">
                        <button 
                        class="outline outline-emerald-200 px-6 py-2 rounded-sm" 
                        onClick$={() => myEats.store.bindEating("food", food)} >
                          {food}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
            
            
            <Resource 
              value={myEats.resourceIngredients} 
              onResolved={(value) => {
                if (value.length === 0) return (
                  <>
                  </>
                );
                return (
                  <>
                  <h5>
                    <span>{value.length} Popular foods or search for</span> "<span>{myEats.store.eating.food}</span>" 
                  </h5>
                  {value.map((food) => {
                    return (
                      <button key={food.id} 
                        data-active={`${myEats.store.eating.foodId === food.id}`}
                        class="outline outline-emerald-200 px-6 py-2 rounded-sm text-left data-[active=true]:bg-rose-300"
                        onClick$={async () => await onClickFood(food)}
                        >
                        {food.name}
                      </button>
                    )
                  })}
                  </>
                )
              }} 
            />

            {myEats.store.selectedFood && (
              <>
                <h5>
                  {myEats.store.selectedFood.name}
                </h5>
                <ul class="grid gap-3">
                  {myEats.store.selectedFood.units.map((unit, index) => {
                    return (
                      <li key={unit.id} class="grid  ">
                        <button 
                          data-active={`${unit.id === myEats.store.eating.measurementId}`}
                          class="outline outline-emerald-200 px-6 py-2 rounded-sm flex gap-2 data-[active=true]:bg-rose-300"
                          onClick$={() => onClickUnit(unit)}
                        >
                          <span>{myEats.store.selectedFood?.units_names[index]}</span><span>{unit.weight}</span><span>{unit.unit}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            
            )}
          </div>

        </div>
      </>
    )
  });

export const NextTrackFood = component$(() => {
  const myEats = useContext(contextFoodTrack);

  return (
    <>
      <div class="grid">
        <button onClick$={async () => {await myEats.onClickNext()}} class="bg-emerald-900 p-2 rounded-sm border-b-2 border-emerald-400 active:border-b-0 transition-all ease-in-out">
          NEXT
        </button>
      </div>
    </>
  )
});


export function useTrackFood() {
  type Eating = {
    amount: string,
    food: string,
    measurement: string,
    foodId?: string,
    measurementId?: string,
  }
  const debounceReset = useDebouncer(
    $(() => {
      store.resetNewEat();
    }),
    200
  );
  const refFood = useSignal<HTMLInputElement>();
  const refUnit = useSignal<HTMLInputElement>();
  const refAmount = useSignal<HTMLInputElement>();
  const store = useStore({
    eats: [] as Eat[],
    state: "idle" as State,
    stateStaps: ["ingredients", "units", "amounts", "keepgoing"],
    addEat: $(function(this: {eats: Eat[]}, eat:  Eat) {
      serverAddEat(eat).then((data) => {
        console.log(data);
      });
      this.eats = this.eats.concat([eat], this.eats);
    }),
    selectedFood: undefined as undefined | Ingredient,
    bindValue: $(function(this: {eats: Eat[]}, key: keyof Eat, value: string, id: string) {
      const eat = this.eats.find(eat => eat.id === id);
      if (!eat) return;
      console.log(eat);
    }),
    eating: {
      amount: "",
      food: "",
      measurement: "",
    } as Eating,
    bindEating: $(function(this: {eating: Eating}, key: keyof Eating, value: string) {
      this.eating[key] = value;
    }),
    resetNewEat: $(function(this: {eating: Eating, selectedFood: Ingredient | undefined}) {
      this.eating = {
        amount: "",
        food: "",
        measurement: "",
        measurementId: "",
        foodId: "",
      }
      this.selectedFood = undefined;
    }),
    remove: $(function(this: {eats: Eat[]}, id: string) {
      this.eats = this.eats.filter(eat => eat.id !== id);
    }),
    moveState: $(function(this: {
      state: State, 
      selectedFood: Ingredient | undefined, 
      eating: {measurementId: string}}, 
      state: State,
    ) {
      if (state === "ingredients") {
        this.state = "ingredients";
      } else if (state === "units" && this.selectedFood) {
        this.state = "units";
      } else if (state === "amounts" && this.selectedFood && this.eating.measurementId) {
        this.state = "amounts";
      } else if (state === "finish" && this.selectedFood) {
        this.state = "finish";
      } else if (state === "keepgoing" && this.selectedFood) {
        this.state = "keepgoing";
      }
      return this.state;
    }),
    updateIngredient: $(function(this: {selectedFood: Ingredient, eating: Eating}, food: Ingredient) {
      this.selectedFood = food;
      this.eating.food = food.name;
      this.eating.foodId = food.id;
    }),
    updarteUnit: $(async function(this: {selectedFood: Ingredient, eating: Eating, bindEating: QRL<(this: {eating: Eating}, key: keyof Eating, value: string) => void>}, unit: Ingredient["units"][number]) {
      const u = this.selectedFood.units_names[this.selectedFood.units.indexOf(unit)];
      const completeName = `${u} ${unit.weight} ${unit.unit}`;
      await this.bindEating("measurement", completeName);
      await this.bindEating("measurementId", unit.id);
      await this.bindEating("amount", "1");
      return completeName;
    }),
    updateAmount: $(function(this: {eating: Eating}, amount: string) {
      this.eating.amount = amount;
    }),
  });

  const resourceIngredients = useResource$(async ({track, cleanup}) => {
    const value = track(() => ({ isIngredientState: store.state, food: store.eating.food }));
    
    if (value.isIngredientState !== "ingredients") return [];      
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const options = { search: value.food, limit: 5 };
    const ingredients = await serverGetIngredients(controller.signal, options);
    store.eating.foodId = ingredients.ingredients[0].id;
    return ingredients.ingredients;
  });


  const onClickNext = $(async () => {
    let message = "";
    const stats = store.stateStaps;
    const index = stats.indexOf(store.state);
    if (index === -1) return;
    const nextIndex = index + 1;
    if (nextIndex >= stats.length) return;
    const goTo = stats[nextIndex];
    switch (goTo) {
      case "ingredients":
        store.moveState("ingredients");
        refFood.value?.focus();
        message = "Please select a food";
        break;
      case "units":
        const food = (await resourceIngredients.value).find((food) => food.id === store.eating.foodId);
        if (!food) return;
        store.selectedFood = food;
        store.eating.food = food.name;
        store.eating.measurementId = food.units[0].id;
        store.moveState("units");
        refUnit.value?.focus();
        message = "Please select a unit";
        break;
      case "amounts":
        if (!store.selectedFood || !store.eating.measurementId) return;
        store.selectedFood.amount = parseFloat(store.eating.amount);
        store.selectedFood.selectedMeasurement = store.eating.measurementId
        const foodTransformed = transformEat.parse(store.selectedFood);
        await store.addEat(foodTransformed);
        await store.moveState("ingredients");
        debounceReset("");
        refFood.value?.focus();
        message = "Please select an amount";
        break;
      case "finish":
        store.moveState("finish");
        message = "Please finish";
        break;
      case "keepgoing":
        store.moveState("keepgoing");
        break;
      default:
        break;
    }
    return message;
  });


  return {store, refFood, refUnit, refAmount, onClickNext, resourceIngredients};
}

export const contextFoodTrack = createContextId<ReturnType<typeof useTrackFood>>("foodTrack");



// shiftState
type State = "idle" | "ingredients" | "units" | "amounts" | "finish" | "keepgoing";

export const wordDistance = (word1: string, word2: string) => {
  const dp = Array.from({length: word1.length + 1}, () => Array.from({length: word2.length + 1}, () => 0));
  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[word1.length][word2.length];
};
