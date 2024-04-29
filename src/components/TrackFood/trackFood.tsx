import { $, Resource, Slot, component$, createContextId, useContext, useContextProvider, useResource$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
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
    const debounceReset = useDebouncer(
      $(() => {
        myEats.store.resetNewEat();
      }),
      200
    );
    
    const resourceIngredients = useResource$(async ({track, cleanup}) => {
      const value = track(() => ({ isIngredientState: myEats.store.state, food: myEats.store.eating.food }));
      
      if (value.isIngredientState !== "ingredients") return [];      
      const controller = new AbortController();
      cleanup(() => controller.abort());

      const options = { search: value.food, limit: 5 };
      return (await serverGetIngredients(controller.signal, options)).ingredients; 
    });

    const onKeyPressNewEat = $(async (e: KeyboardEvent) => {
      const input = e.target as HTMLInputElement;
      const parent = input.parentElement as HTMLFieldSetElement; // has three input
      const childrens: [HTMLInputElement, HTMLInputElement, HTMLInputElement] = [
        parent.children[0] as HTMLInputElement,
        parent.children[1] as HTMLInputElement, 
        parent.children[2] as HTMLInputElement
      ];
      const whoIsEmpty = childrens.find((inp) => !inp.value);
      if (whoIsEmpty && e.key === "Enter") { 
        whoIsEmpty.focus(); 
      } else if (e.key === "Enter") {
        if (!myEats.store.selectedFood || !myEats.store.eating.measurementId) return;
        myEats.store.selectedFood.amount = parseFloat(myEats.store.eating.amount);
        myEats.store.selectedFood.selectedMeasurement = myEats.store.eating.measurementId
        const foodTransformed = transformEat.parse(myEats.store.selectedFood);
        await myEats.store.addEat(foodTransformed);
        await myEats.store.moveState("ingredients");
        debounceReset("");
        myEats.refFood.value?.focus();
      }
    });

    const onClickFood = $(async (food: Ingredient, foodId: string, ) => {
        await myEats.store.bindEating("food", food.name);
        await myEats.store.bindEating("foodId", foodId);
        myEats.store.selectedFood = food;
        myEats.store.moveState("units");
        myEats.refUnit.value?.focus();
    });

    const onClickUnit = $(async (unit: Ingredient["units"][number], unitId: string) => {
      const u = myEats.store.selectedFood?.units_names[myEats.store.selectedFood.units.indexOf(unit)];
      const completeName = `${u} ${unit.weight} ${unit.unit}`;
      await myEats.store.bindEating("measurement", completeName);
      await myEats.store.bindEating("measurementId", unitId);
      await myEats.store.bindEating("amount", "1");
      myEats.store.moveState("amounts");
      myEats.refAmount.value?.focus();
    });

    const onFocusAmount = $(() => {
      myEats.store.moveState("amounts");
    });
    const onFocusUnit = $(() => {
      myEats.store.moveState("units");
    });

    const onClickNext = $(() => {
      let message = "";
      const stats = myEats.store.stateStaps;
      const index = stats.indexOf(myEats.store.state);
      if (index === -1) return;
      const nextIndex = index + 1;
      if (nextIndex >= stats.length) return;
      const goTo = stats[nextIndex];
      switch (goTo) {
        case "ingredients":
          myEats.store.moveState("ingredients");
          myEats.refFood.value?.focus();
          message = "Please select a food";
          break;
        case "units":
          myEats.store.moveState("units");
          myEats.refUnit.value?.focus();
          message = "Please select a unit";
          break;
        case "amounts":
          myEats.store.moveState("amounts");
          myEats.refAmount.value?.focus();
          message = "Please select an amount";
          break;
        case "finish":
          myEats.store.moveState("finish");
          message = "Please finish";
          break;
        case "keepgoing":
          myEats.store.moveState("keepgoing");
          break;
        default:
          break;
      }
      return message;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      myEats.refFood.value?.focus();
    }, {strategy: "document-ready"});

  
    return (
      <>
        <div class="flex flex-col justify-between">
          
          <div class="grid gap-3 sticky top-0 bg-emerald-950 z-50">
            
            
            <section class="grid grid-cols-3 gap-3">
              <label for="new-food" class="text-emerald-100">Food</label>
              <label for="new-unit" class="text-emerald-100">Unit</label>
              <label for="new-amount" class="text-emerald-100">Amount</label>
            </section>
            
            
            <fieldset class="grid grid-cols-3 gap-3 " onKeyPress$={onKeyPressNewEat}>
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
              value={resourceIngredients} 
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
                        data-active={myEats.store.eating.foodId === food.id}
                        class="outline outline-emerald-200 px-6 py-2 rounded-sm text-left data-[active='true']:bg-teal-300"
                        onClick$={async () => await onClickFood(food, food.id)}
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
                          class="outline outline-emerald-200 px-6 py-2 rounded-sm flex gap-2 "
                          onClick$={() => onClickUnit(unit, unit.id)}
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

  return (
    <>
      <div class="grid">
        <button onClick$={() => {}} class="bg-emerald-900 p-2 rounded-sm border-b-2 border-emerald-400 active:border-b-0 transition-all ease-in-out">
          NEXT
        </button>
      </div>
    </>
  )
});

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



export function useTrackFood() {
  type Eating = {
    amount: string,
    food: string,
    measurement: string,
    foodId?: string,
    measurementId?: string,
  }
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
  });
  return {store, refFood, refUnit, refAmount};
}

export const contextFoodTrack = createContextId<ReturnType<typeof useTrackFood>>("foodTrack");



// shiftState
type State = "idle" | "ingredients" | "units" | "amounts" | "finish" | "keepgoing";