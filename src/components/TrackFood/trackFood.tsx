import { $, Resource, component$, useResource$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { createUniqueKey } from "~/util/createId";
import { serverGetIngredients } from "~/routes/api/service_food_group/get_food_groups";
import { type Eat, serverAddEat } from "~/routes/api/service_food_group/add_eat";


/*
2. get all food groups from database to application on typing
3. selecting from foods within database and insert them into id
4. selecting all the unit from within this unit appropetly
5. ui bwllow all food as list of items
6. when using selected foods 
7. track nutrition if the person gets something good then he gets a point / treat
*/
export const TrackFood = component$(() => {
    const refFood = useSignal<HTMLInputElement>();
    const refUnit = useSignal<HTMLInputElement>();
    const myEats = useTrackFood();

    const resourceIngredients = useResource$(async ({track, cleanup}) => {
      const value = track(() => ({ isFoodOnFocus: myEats.toLoadIngredient, food: myEats.eating.food }));
      
      if (!value.isFoodOnFocus) return [];
      // if (value.food.length === 0) return [];
      
      const controller = new AbortController();
      cleanup(() => controller.abort());
      
      const options = { search: value.food, limit: 5 };
      return (await serverGetIngredients(controller.signal, options)).ingredients; 
    });

    const onKeyPressNewEat = $((e: KeyboardEvent) => {
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
        myEats.addEatId();
        myEats.addEat(myEats.eating );
        myEats.resetNewEat();
      }
    });

    const onClickFood = $((food: string) => {
        myEats.bindEating("food", food);
        myEats.toLoadIngredient = false;
        refUnit.value?.focus();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      refFood.value?.focus();
    }, {strategy: "document-ready"});
  
    return (
      <>
        <div class="grid">
          
          <div class="grid gap-3 sticky top-0 bg-emerald-950 z-50">
            
            
            <section class="grid grid-cols-3 gap-3">
              <label for="new-food" class="text-emerald-100">Food</label>
              <label for="new-unit" class="text-emerald-100">Unit</label>
              <label for="new-amount" class="text-emerald-100">Amount</label>
            </section>
            
            
            <fieldset class="grid grid-cols-3 gap-3 " onKeyPress$={onKeyPressNewEat}>
                <input id={"new-food"}  
                  type="text" 
                  ref={refFood}
                  autoComplete={"off"}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.eating.food} 
                  onFocus$={() => myEats.toLoadIngredient = true}
                  onInput$={(e,el) => myEats.bindEating("food", el.value)} 
                />
                <input id={"new-measurement"} 
                  type="text" 
                  ref={refUnit}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.eating.measurement} onInput$={(e,el) => myEats.bindEating("measurement", el.value)} 
                />
                <input id={"new-amount"} 
                  type="text" 
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.eating.amount} onInput$={(e,el) => myEats.bindEating("amount", el.value)} 
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
                      onClick$={() => myEats.bindEating("food", "Water")}
                      >
                        Water
                      </button>
                    </li>
                  {[].map((food) => {
                    return (
                      <li key={food} class=" bg-emerald-950">
                        <button 
                        class="outline outline-emerald-200 px-6 py-2 rounded-sm" 
                        onClick$={() => myEats.bindEating("food", food)} >
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
                    <span>{value.length} Popular foods or search for</span> "<span>{myEats.eating.food}</span>" 
                  </h5>
                  {value.map((food) => {
                    console.log(food);
                    return (
                      <button key={food.id} 
                        class="outline outline-emerald-200 px-6 py-2 rounded-sm text-left" 
                        onClick$={async () => await onClickFood(food.name)}
                        >
                        {food.name}
                      </button>
                    )
                  })}
                  </>
                )
              }} 
            />
            
          </div>

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
  const myEats = useStore<{[key: string]: any, eats: Eat[]}>({
    eats: [],
    toLoadIngredient: false,
    addEat: $(function(this: {eats: Eat[]}, eat:  Eat) {
      console.log(eat);
      // serverAddEat(eat).then((data) => {
      //   console.log(data);
      // });
      // this.eats = this.eats.concat([eat], this.eats);
    }),
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

    addEatId: $(function(this: {newEat: Eat}) {
      this.newEat.id = createUniqueKey();
    }),
    bindEating: $(function(this: {eating: Eating}, key: keyof Eating, value: string) {
      this.eating[key] = value;
    }),
    resetNewEat: $(function(this: {eating: Eating}) {
      this.eating = {
        amount: "",
        food: "",
        measurement: "",
      }
    }),
    remove: $(function(this: {eats: Eat[]}, id: string) {
      console.log(id);
      this.eats = this.eats.filter(eat => eat.id !== id);
    })
  });
  return myEats;
}