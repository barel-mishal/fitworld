import { $, Resource, component$, useResource$, useSignal, useStore } from "@builder.io/qwik";
import { createUniqueKey } from "~/util/createId";
import { PhTrash } from "../icons/icons";
import { serverAddEat, serverGetIngredients } from "~/routes/api/service";


type Eat = {
    unit: string,
    amount: string,
    food: string,
    id: string
}
/*
2. get all food groups from database to application on typing
3. selecting from foods within database and insert them into id
4. selecting all the unit from within this unit appropetly
5. ui bwllow all food as list of items
6. when using selected foods 
*/
export const TrackFood = component$(() => {
    const refUnit = useSignal<HTMLInputElement>()
    const myEats = useStore({
      eats: [
        { unit: "כפית", amount: "1", food: "חלב", id: "1288" }, 
        { unit: "כפית", amount: "2", food: "קינואה", id: "123234" },   
        { unit: "כפית", amount: "1", food: "חלב", id: "123333" }, 
      ],
      toLoadIngredient: false,
      groupBy: $(function(this: {eats: Eat[]}, key: keyof Eat) {
        const group = this.eats.reduce((acc, eat) => {
          acc[eat[key]].push(eat);
          return acc;
        }, {} as Record<string, Eat[]>);
        return group;
      }),
      addEat: $(function(this: {eats: Eat[]}, eat:  Eat) {
        serverAddEat().then((data) => {
          console.log(data);
        });
        this.eats = this.eats.concat([eat], this.eats);
      }),
      bindValue: $(function(this: {eats: Eat[]}, key: keyof Eat, value: string, id: string) {
        const eat = this.eats.find(eat => eat.id === id);
        if (eat) {
          eat[key] = value;
        }
      }),
      addDefault: $(function(this: {eats: Eat[]}) {
        this.eats.push({unit: "", amount: "", food: "", id: createUniqueKey()});
      }),
      newEat: {
        unit: "",
        amount: "",
        food: "",
      } as Eat,
      addEatId: $(function(this: {newEat: Eat}) {
        this.newEat.id = createUniqueKey();
      }),
      bindNewEat: $(function(this: {newEat: Eat}, key: keyof Eat, value: string) {
        this.newEat[key] = value;
      }),
      resetNewEat: $(function(this: {newEat: Omit<Eat, "id">}) {
        this.newEat = {
          unit: "",
          amount: "",
          food: "",
        }
      }),
      remove: $(function(this: {eats: Eat[]}, id: string) {
        console.log(id);
        this.eats = this.eats.filter(eat => eat.id !== id);
      })
    });
    const resourceIngredients = useResource$(async ({track, cleanup}) => {
      const value = track(() => ({ isFoodOnFocus: myEats.toLoadIngredient, food: myEats.newEat.food }));
      
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
        myEats.addEat(myEats.newEat);
        myEats.resetNewEat();
      }
    });
  
  
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
                  autoComplete={"off"}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.newEat.food} 
                  onFocus$={() => myEats.toLoadIngredient = true}
                  onInput$={(e,el) => myEats.bindNewEat("food", el.value)} 
                />
                <input id={"new-unit"} 
                  type="text" 
                  ref={refUnit}
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.newEat.unit} onInput$={(e,el) => myEats.bindNewEat("unit", el.value)} 
                />
                <input id={"new-amount"} 
                  type="text" 
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.newEat.amount} onInput$={(e,el) => myEats.bindNewEat("amount", el.value)} 
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
                        myEats.bindNewEat("food", "Water");
                      }}
                      >
                        Water
                      </button>
                    </li>
                  {[{id: 297, name: "milk"}, {id: 298, name: "water"}, {id: 299, name: "bread"}].map((food) => {
                    return (
                      <li key={food.id} class=" bg-emerald-950">
                        <button class="outline outline-emerald-200 px-6 py-2 rounded-sm" onClick$={() => {
                          console.log(food.name);
                          myEats.bindNewEat("food", food.name);
                        }} >
                          {food.name}
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
                {value.map((food) => {
                  return (
                    <button key={food.id} 
                      class="outline outline-emerald-200 px-6 py-2 rounded-sm" 
                      onClick$={() => {
                        myEats.bindNewEat("food", food.name);
                        myEats.toLoadIngredient = false;
                        refUnit.value?.focus();
                      }}
                      >
                      {food.name}
                    </button>
                  )
                })}
                </>
              )
            }} />
            <h5>5 Last Eated Record</h5>
          </div>
          <div class="overflow-y-auto">
            <ul class="grid gap-3 ">
              {myEats.eats.map((eat) => {
                return (
                  <li key={eat.id} class="grid grid-cols-[1fr,auto] gap-2">
                    <fieldset class="grid grid-cols-3 gap-3 ">
                      <input 
                        type="text" 
                        class="bg-transparent"
                        value={eat.food} 
                        onInput$={(e,el) => myEats.bindValue("food", el.value, eat.id)} />
                      <input 
                        type="text" 
                        class="bg-transparent"
                        value={eat.unit} 
                        onInput$={(e,el) => myEats.bindValue("unit", el.value, eat.id)} />
                      <input 
                        type="text" 
                        class="bg-transparent" 
                        value={eat.amount} 
                        onInput$={(e,el) => myEats.bindValue("amount", el.value, eat.id)} />
                    </fieldset>
                    <button class="fill-sky-400 " onClick$={() => myEats.remove(eat.id)}>
                      <PhTrash class="fill-rose-400 " width={20} height={20} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </>
    )
  });

