import { $, component$, useComputed$, useStore } from "@builder.io/qwik";
import { Block, SortableComp } from "../Sortable/Sortable";
import { LuMoveVertical } from "@qwikest/icons/lucide";
import { createUniqueKey } from "~/util/createId";


type Eat = {
    unit: string,
    amount: string,
    food: string,
    id: string
  }
export const TrackFood = component$(() => {
    const myEats = useStore({
      eats: [
         {unit: "כפית", amount: "1", food: "חלב", id: "123"}, 
         {unit: "כפית", amount: "2", food: "קינואה", id: "1234"}    
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
      }
    });
  
  
    return (
      <>
        <div class="grid gap-5">
          <SortableComp class="grid gap-3">
            <fieldset class="grid grid-cols-3 gap-3 ">
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.food}  />
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.unit} />
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.amount} />
            </fieldset>
            {myEats.eats.map((eat) => {
              return (
                <Block key={eat.id} class="grid grid-cols-[auto,1fr] gap-2">
                  <button onClick$={() => {}} class="">
                    <LuMoveVertical class="fill-zinc-900 scale-75" fill='#1e293b'  />
                  </button>
                  <fieldset class="grid grid-cols-3 gap-3 ">
                    <input type="text" class="bg-transparent" value={eat.food} onInput$={(e,el) => myEats.bindValue("food", el.value, eat.id)} />
                    <input type="text" class="bg-transparent" value={eat.unit} onInput$={(e,el) => myEats.bindValue("unit", el.value, eat.id)} />
                    <input type="text" class="bg-transparent" value={eat.amount} onInput$={(e,el) => myEats.bindValue("amount", el.value, eat.id)} />
                  </fieldset>
                </Block>
              )
            })}
          </SortableComp>
          <button
            onClick$={() => myEats.addDefault()}
            class="bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200 z-20 m-2"
          >Add New</button>
        </div>
      </>
    )
  });

