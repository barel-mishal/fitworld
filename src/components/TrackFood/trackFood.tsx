import { $, component$, useStore } from "@builder.io/qwik";
import { Block, SortableComp } from "../Sortable/Sortable";
import { LuMoveVertical } from "@qwikest/icons/lucide";
import { createUniqueKey } from "~/util/createId";
import { BsTrash } from "@qwikest/icons/bootstrap";


type Eat = {
    unit: string,
    amount: string,
    food: string,
    id: string
  }
/*
1. bring food group from database
2. get all food groups from database to application on typing
3. selecting from foods within database and insert them into id
4. selecting all the unit from within this unit appropetly
5. ui bwllow all food as list of items
6. when using selected foods 
*/
export const TrackFood = component$(() => {
    const myEats = useStore({
      eats: [
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
         { unit: "כפית", amount: "1", food: "חלב", id: "123" }, 
         { unit: "כפית", amount: "2", food: "קינואה", id: "1234" },   
      ],
      groupBy: $(function(this: {eats: Eat[]}, key: keyof Eat) {
        const group = this.eats.reduce((acc, eat) => {
          acc[eat[key]].push(eat);
          return acc;
        }, {} as Record<string, Eat[]>);
        return group;
      }),
      addEat: $(function(this: {eats: Eat[]}, eat:  Eat) {
        this.eats.push(eat);
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
      })
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
                  class="rounded-sm p-2 bg-emerald-800" 
                  value={myEats.newEat.food} onInput$={(e,el) => myEats.bindNewEat("food", el.value)} 
                />
                <input id={"new-unit"} 
                  type="text" 
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
                      <button class="outline outline-emerald-200  px-6 py-2 rounded-sm">water</button>
                    </li>
                  {[{id: 297, name: "milk"}, {id: 298, name: "water"}, {id: 299, name: "bread"}].map((food) => {
                    return (
                      <li key={food.id} class=" bg-emerald-950">
                        <button class="outline outline-emerald-200 px-6 py-2 rounded-sm">
                          {food.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
            <h5>5 Last Eated Record</h5>
          </div>
          <div class="overflow-y-auto">
            <SortableComp class="grid gap-3 ">
              {myEats.eats.map((eat) => {
                return (
                  <Block key={eat.id} class="grid grid-cols-[auto,1fr,auto] gap-2">
                    <button onClick$={() => {}} class="">
                      <LuMoveVertical class="fill-zinc-900 scale-75" fill='#1e293b'  />
                    </button>
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
                    <button class="fill-sky-400">
                      <BsTrash class="fill-sky-400 " width={5} height={5} fill='#1e293b' />
                    </button>
                  </Block>
                )
              })}
            </SortableComp>
          </div>
        </div>
      </>
    )
  });

