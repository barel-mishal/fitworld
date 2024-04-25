import { component$, useVisibleTask$ } from '@builder.io/qwik';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { TopNavBar, BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { loadScript } from "@paypal/paypal-js";


export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (
  
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,30px]">
      <div q:slot='header'>
        <TopNavBar />
      </div>
      <div q:slot='main'>
        dfdslkj
      </div>
      <div q:slot='footer' class=""><BottomNavBar flag={{class: "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200"}} /></div>
    </HeaderMainBottomNav>
  );
});


export const Paypal = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
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
        
        console.log(pay);

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