import { component$, useStore } from '@builder.io/qwik';
import { Block, SortableComp } from '~/components/Sortable/Sortable';
import { Draggable } from '~/components/draggable/draggable';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { TopNavBar, BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { AppLink } from '~/routes.config';

export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (
  
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,30px]">
      <div q:slot='header'><TopNavBar /></div>
      <div q:slot='main'><TrackFood />
        <AppLink route="/client/Assessment/">
        Get Started
        </AppLink>
        <Draggable />

      </div>
      <div q:slot='footer' class=""><BottomNavBar flag={{class: "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200"}} /></div>
    </HeaderMainBottomNav>
  );
});


export const TrackFood = component$(() => {
  const myEats = useStore({
    eats: [
      {unit: "כפית", amount: "1", food: "חלב", id: "123"}, 
      {unit: "כפית", amount: "2", food: "קינואה", id: "1234"}
    ],
  });


  return (
    <>
      <div class="">
        <SortableComp class="grid gap-3">
          {myEats.eats.map((eat) => {
            return (
              <Block key={eat.id} class="grid-cols-4 grid">
                <button onClick$={() => {}}>grab me</button>
                <input type="text" class="bg-transparent" value={eat.food} />
                <input type="text" class="bg-transparent" value={eat.unit} />
                <input type="text" class="bg-transparent" value={eat.amount} />
              </Block>
            )
          })}
        </SortableComp>
      </div>
    </>
  )
});

