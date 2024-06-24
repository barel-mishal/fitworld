import { component$, useId, useVisibleTask$ } from '@builder.io/qwik';
import { loadScript } from '@paypal/paypal-js';

export default component$(() => {
  return (
    <div>
      New route works.
      <Paypal />
    </div>
  );
});



export const Paypal = component$(() => {
  const idPaypal = useId();
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
    <>
      <div id={`${idPaypal}`}></div>
    </>
  );
});
