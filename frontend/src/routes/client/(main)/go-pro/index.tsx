import { component$, useId, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { loadScript } from '@paypal/paypal-js';
import FoodCool from "~/media/CoolFooPeinApple.png?jsx";

export default component$(() => {
  return (
    <div class="bg-gray-100 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl mx-auto  text-center">
        <header class="mb-6 flex flex-col gap-3">
          <FoodCool class="h-24 w-24 mx-auto" />
          <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Go Pro</h1>
          <p class="text-xl text-gray-600 dark:text-gray-200">Unlock premium features and elevate your experience.</p>
        </header>
        <section class="mb-6">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Upgrade to Pro and enjoy exclusive benefits such as enhanced functionality, priority support, and more.
          </p>
        </section>
        <footer class="mt-6">
          <Paypal />
        </footer>
      </div>
    </div>
  );
});



export const Paypal = component$(() => {
  const idPaypal = useId();
  const active = useSignal(false);
  // Load PayPal script when the component is visible
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    loadScript({ 
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, 
      currency: "USD", 
      debug: true 
    })
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          return;
        }

        paypal
          .Buttons({
            // Step 3: Create an order
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: '10.00' // Replace with your product price
                  }
                }],
                intent: "CAPTURE"
              });
            },
            // Step 4: Capture the order
            onApprove: (data, actions) => {
              if (!actions.order) {
                throw new Error('No order found');
              }
              console.log('Order approved:', data);
              return actions.order.capture().then((details) => {
                console.log('Transaction completed by ', details);
                // Handle successful transaction here
                alert('Transaction completed by ' + details.payment_source?.paypal?.name?.given_name);
              });
            },
            // Handle error cases
            onError: (err) => {
              console.error('PayPal Buttons error', err);
              alert('An error occurred during the transaction.');
            },
            // Optional: Handle when the user cancels the transaction
            onCancel: (data) => {
              console.log('Transaction cancelled', data);
              alert('Transaction cancelled.');
            }
          })
          .render(`#${idPaypal}`)
          .then(() => {
            console.log('PayPal Buttons rendered');
            
            active.value = true;
          })
          .catch((error) => {
            console.error('Failed to render the PayPal Buttons', error);
          });

        return paypal;
      })
      .catch((error) => {
        console.error('Failed to load the PayPal JS SDK script', error);
      });
  });

  return (
  
    <div class="p-4 grid">
      <div class="col-start-1 row-start-1 w-full h-32 duration-600 transition-opacity ease-in-out bg-white dark:bg-gray-800 data-[active='true']:opacity-0 grid z-[10000]" data-active={`${active.value}`}></div>
      <div class="col-start-1 row-start-1" id={`${idPaypal}`}></div>
    </div>
  
  );
});
