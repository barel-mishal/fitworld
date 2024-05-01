import { $, type QRL, Resource, Slot, component$, createContextId, useContext, useContextProvider, useOn, useResource$, useSignal, useStore, useVisibleTask$, useComputed$ } from "@builder.io/qwik";
import { type Ingredient, serverGetIngredients } from "~/routes/api/service_food_group/get_food_groups";
import { type Eat, transformEat, serverAddEat } from "~/routes/api/service_food_group/add_eat";
import useDebouncer from "~/util/useDebouncer";
import { SchemaPositiveBiggerThanZero } from "~/util/types";
import { cn } from "@qwik-ui/utils";
import { PhFlag } from "../icons/icons";
import { AppLinkGlobal } from "~/routes.config";


export const TrackFood = component$(() => {
  const myEats = useTrackFood();
  useContextProvider(contextFoodTrack, myEats);
  return <Slot />;
});

/*
5. ui bwllow all food as list of items
7. track nutrition if the person gets something good then he gets a point / treat
*/
export const MainTrackFood = component$(() => {
    const myEats = useContext(contextFoodTrack);
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
        myEats.store.updateAmount(next.toString());
      } else if (myEats.store.state === "amounts" && e.key === "ArrowUp") {
        const currentAmount = myEats.store.eating.amount;
        const next = parseFloat(currentAmount) + 1;
        myEats.store.updateAmount(next.toString());
      }

      // if currnt ingredient that is active is true and is not in view then scroll to it
      const activeElement = document.querySelector("[data-active='true']");
      if (!activeElement) return;
      const rect = activeElement.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight - 100) {
        activeElement.scrollIntoView({behavior: "smooth"});
      }

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
            
            <FieldsForNewEat />

            <FestSelections />

            <ShowSearchResults />

            <DisplayFoodUnits />

          </div>

        </div>
      </>
    )
});

export const FieldsForNewEat = component$(() => {
  const myEats = useContext(contextFoodTrack);

  const onFocusAmount = $(() => {
    myEats.store.moveState("amounts");
  });
  const onFocusUnit = $(() => {
    myEats.store.moveState("units");
  });

  const debounce = useDebouncer(
    $((value: string) => {
      myEats.store.bindEating("food", value);
    }),
    300
  );
  return <div class="sticky top-0 z-50 bg-emerald-950 pb-2">
  <section class="grid grid-cols-3 gap-3">
    <label for="new-food" class="text-emerald-100">Food</label>
    <label for="new-unit" class="text-emerald-100">Unit</label>
    <label for="new-amount" class="text-emerald-100">Amount</label>
  </section>
  <fieldset class="grid grid-cols-3 gap-3">
      <input id={"new-food"}  
        type="text" 
        ref={myEats.refFood}
        autoComplete={"off"}
        class="inp" 
        value={myEats.store.eating.food} 
        onFocus$={() => myEats.store.moveState("ingredients")}
        onInput$={async (e,el) => await debounce(el.value)} 
      />
      <input id={"new-measurement"} 
        type="text" 
        ref={myEats.refUnit}
        autoComplete={"off"}
        onFocus$={onFocusUnit}
        class="inp" 
        value={myEats.store.eating.measurement} onInput$={(e,el) => myEats.store.bindEating("measurement", el.value)} 
      />
      <input id={"new-amount"} 
        type="text" 
        class="inp"
        onFocus$={onFocusAmount}
        ref={myEats.refAmount}
        value={myEats.store.eating.amount} onInput$={async (e,el) => await myEats.store.updateAmount(el.value)} 
      />
  </fieldset>
</div>
});

export const ShowSearchResults = component$(() => {
  const myEats = useContext(contextFoodTrack);
  const onClickFood = $(async (food: Ingredient) => {
    await myEats.store.updateIngredient(food);
    myEats.store.moveState("units");
    myEats.refUnit.value?.focus()
});

  return  <Resource 
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
              class={cn("btn btn-data-active flex gap-1", "p-2 ")}
              onClick$={() => setTimeout(async () => await onClickFood(food), 300)}
              >
              {food.name}
            </button>
          )
        })}
        </>
      )
    }} 
  />
});  

export const FestSelections = component$(() => {
  const myEats = useContext(contextFoodTrack);

  return <ul class="overflow-x-auto bg-emerald-950">
  <li class="bg-emerald-950">
    <h5>
      Fast selections
    </h5>
    <ul class="flex flex-wrap-0 gap-4 overflow-x-auto py-2 px-1 bg-emerald-950">
        <li>
          <button 
          class="btn"
          onClick$={async () => {
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
            class={cn("btn btn-data-active flex gap-1", "p-2 ")}
            onClick$={() => myEats.store.bindEating("food", food)} >
              {food}
            </button>
          </li>
        )
      })}
    </ul>
  </li>
</ul>
}); 

export const NextTrackFood = component$(() => {
  const isConfrim = useSignal(false);
  const myEats = useContext(contextFoodTrack);

  return (
    <>
      {
      !isConfrim.value &&
        <div class="grid grid-cols-[1fr,auto] gap-3">
        
          <button 
          onClick$={() => setTimeout(async () => await myEats.onClickNext(), 300)}
          class="btn-primary">
            NEXT
          </button>
          
          <button 
          disabled={myEats.disableFinishButton.value}
          onClick$={() => isConfrim.value = !isConfrim.value}
          class="btn-gohst relative">
            <PhFlag class={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 active:rotate-6 transition-all ease-in-out",
              !myEats.disableFinishButton.value ? "fill-emerald-100" : "fill-emerald-800"
              
              )} />
          </button>
        </div>
        }
        {
          isConfrim.value &&
          <div class="grid grid-cols-[auto,1fr] gap-2">
            <button 
              onClick$={() => isConfrim.value = !isConfrim.value}
              class="btn-gohst text-emerald-700">
                Add More Product
            </button>
            <AppLinkGlobal 
              route="/client/(main)/track/finish/"     
              
              class="btn-primary flex items-center gap-2 justify-center ">
                <PhFlag class={cn(
              " transform active:rotate-6 transition-all ease-in-out scale-75",
              "fill-emerald-100"
              )} />
                <p>Finish</p>
            </AppLinkGlobal>
          </div>
        }
    </>
  )
});

export function useTrackFood() {
  const now = useSignal<Date>();
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
      if (!now.value) console.log("No date");
      this.eats = this.eats.concat([eat], this.eats);
      serverAddEat(eat).then(async (data) => {
        const eat = "eat" in data ? data.eat : undefined;
        if (!eat) return;
        
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        console.log("finally");
      });
      console.log(this.eats)
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
      const parsedValue = SchemaPositiveBiggerThanZero.safeParse(amount);
      this.eating.amount =  parsedValue.success ? parsedValue.data : this.eating.amount;
    }),
    finish: $(async function(this: {eats: Eat[]}) {
      return
    }),  
  });
  const debounceReset = useDebouncer(
    $(async () => {
      await store.resetNewEat();
    }),
    200
  );

  const disableFinishButton = useComputed$(() => {
    return store.eats.length === 0;
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
        const unit = food.units[0];
        store.eating.measurementId = unit.id;
        store.eating.measurement = `${food.units_names[0]} ${unit.weight} ${unit.unit}`;
        store.updateAmount("1")
        store.moveState("units");
        refUnit.value?.focus();
        message = "Please select a unit";
        break;
      case "amounts":
        if (refAmount.value !== document.activeElement) {
          refAmount.value?.focus();
          break;
        }
        if (!store.selectedFood || !store.eating.measurementId) return;
        await store.moveState("keepgoing");
        refFood.value?.focus();
        message = "Please select an amount";
        break;
      case "finish":
        store.moveState("finish");
        message = "Please finish";
        break;
      case "keepgoing":
        if (!store.selectedFood || !store.eating.measurementId) return;
        store.selectedFood.amount = parseFloat(store.eating.amount);
        store.selectedFood.selectedMeasurement = store.eating.measurementId
        const foodTransformed = transformEat.parse(store.selectedFood);
        await store.addEat(foodTransformed);
        await store.moveState("ingredients");
        await debounceReset("");
        refFood.value?.focus();
        break;
      default:
        break;
    }
    return message;
  });




  return {store, refFood, refUnit, refAmount, onClickNext, resourceIngredients, disableFinishButton};
}

export const DisplayFoodUnits = component$(() => {
  const myEats = useContext(contextFoodTrack);
  const onClickUnit = $(async (unit: Ingredient["units"][number]) => {
    await myEats.store.updarteUnit(unit);
    myEats.store.moveState("amounts");
    myEats.refAmount.value?.focus();
  });

  return             <>
  {myEats.store.selectedFood && myEats.store.state === "units" && (
    <>
      <h5>
        {myEats.store.selectedFood.name}
      </h5>
      <ul class="flex flex-wrap gap-3">
        {myEats.store.selectedFood.units.map((unit, index) => {
          return (
            <li key={unit.id} class=" ">
              <button 
                data-active={`${unit.id === myEats.store.eating.measurementId}`}
                class={cn("btn btn-data-active flex gap-1", "p-2 ")}
                onClick$={() => setTimeout(async () => await onClickUnit(unit), 300)}
              >
                <span>{myEats.store.selectedFood?.units_names[index]}</span><span>{unit.weight}</span><span>{unit.unit}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  
  )}
  </>
}); 

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
