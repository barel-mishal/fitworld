import { $, component$, useStore } from "@builder.io/qwik";
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
      },
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
      if (e.key === "Enter") {
        const newEat = {
          ...myEats.newEat,
          id: createUniqueKey()
        }
        myEats.addEat(newEat);
        myEats.resetNewEat();
      }
    })
  
  
    return (
      <>
        <div class="grid gap-5">
          <SortableComp class="grid gap-3">
            <fieldset class="grid grid-cols-3 gap-3 " onKeyPress$={onKeyPressNewEat}>
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.food} onInput$={(e,el) => myEats.bindNewEat("food", el.value)} />
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.unit} onInput$={(e,el) => myEats.bindNewEat("unit", el.value)} />
                <input type="text" class="rounded-md bg-emerald-800" value={myEats.newEat.amount} onInput$={(e,el) => myEats.bindNewEat("amount", el.value)} />
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
        </div>
      </>
    )
  });

