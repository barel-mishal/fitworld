import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { LuMoveVertical } from '@qwikest/icons/lucide';
import { Block, SortableComp } from '~/components/Sortable/Sortable';
import { Draggable } from '~/components/draggable/draggable';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { TopNavBar, BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { AppLink } from '~/routes.config';
import { loadScript } from "@paypal/paypal-js";


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
        <Paypal />


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
              <Block key={eat.id} class="grid grid-cols-[auto,1fr] gap-2">
                
                <button onClick$={() => {}} class="">
                  <LuMoveVertical class="fill-zinc-900 scale-75" fill='#1e293b'  />
                </button>
                <fieldset class="grid grid-cols-3 gap-3 ">
                  <input type="text" class="bg-transparent" value={eat.food} />
                  <input type="text" class="bg-transparent" value={eat.unit} />
                  <input type="text" class="bg-transparent" value={eat.amount} />
                </fieldset>
              </Block>
            )
          })}
        </SortableComp>
      </div>
    </>
  )
});


export const Paypal = component$(() => {
  useVisibleTask$(() => {
  loadScript({ clientId: "test", currency: "USD" })
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          return
        } 
        const pay = paypal.Buttons({})
              .render("#your-container-element")
              .catch((error) => {
                  console.error("failed to render the PayPal Buttons", error);
              });
        

        return paypal
      })
      .catch((error) => {
          console.error("failed to load the PayPal JS SDK script", error);
      });
  });
  return <>
    <div id="your-container-element"></div>
  </>
});