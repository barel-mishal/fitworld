
import { RequestHandler,  } from '@builder.io/qwik-city';
import crypto from 'crypto';

import { RequestEvent } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request }: RequestEvent) => {
  try {
    const event = await request.json();

    // Verify the webhook event
    if (!verifyPaypalWebhook(event)) {
      request.headers.set('Status', '400');
      request.headers.set('Content-Type', 'text/plain');
      request.headers.set('Content-Length', 'Invalid signature'.length.toString());
      request.headers.set('Body', 'Invalid signature');
      return;
    }

    // Handle the event
    switch (event.event_type) {
      case 'PAYMENT.SALE.COMPLETED':
        // Handle payment completed event
        console.log('Payment completed:', event);
        break;
      case 'PAYMENT.SALE.DENIED':
        // Handle payment denied event
        console.log('Payment denied:', event);
        break;
      // Add other event types as needed
      default:
        console.log('Unhandled event type:', event.event_type);
    }

    request.headers.set('Status', '200');
    request.headers.set('Content-Type', 'text/plain');
    request.headers.set('Content-Length', 'Webhook received'.length.toString());
    request.headers.set('Body', 'Webhook received');
  } catch (error) {
    console.error('Error processing webhook:', error);
    request.headers.set('Status', '500');
    request.headers.set('Content-Type', 'text/plain');
    request.headers.set('Content-Length', 'Internal Server Error'.length.toString());
    request.headers.set('Body', 'Internal Server Error');
  }
};

function verifyPaypalWebhook(event: any): boolean {
  const signature = event.headers['paypal-signature'];
  const expectedSignature = crypto
    .createHmac('sha256', import.meta.env.PAYPAL_WEBHOOK_SECRET)
    .update(JSON.stringify(event.body))
    .digest('base64');

  return signature === expectedSignature;
}

    
  // // createOrder route
  // const orders = async () => { // "/api/orders"
  //   try {
  //       // use the cart information passed from the front-end to calculate the order amount detals
  //       const { jsonResponse, httpStatusCode } = await createOrder(cart);

  //       return event.statusCode(httpStatusCode as Number).json(jsonResponse);
  //   } catch (error) {
  //       console.error("Failed to create order:", error);
  //       res.status(500).json({ error: "Failed to create order." });
  //   }
  // }; 

  //   /**
  //    * Create an order to start the transaction.
  //    * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
  //    */
  //         const createOrder = async (cart) => {
  //           // use the cart information passed from the front-end to calculate the purchase unit details
  //           console.log(
  //               "shopping cart information passed from the frontend createOrder() callback:",
  //               cart
  //           );
        
  //           const accessToken = await generateAccessToken();
  //           const url = `${base}/v2/checkout/orders`;
        
  //           const payload = {
  //               intent: "CAPTURE",
  //               purchase_units: [
  //               {
  //                   amount: {
  //                   currency_code: "USD",
  //                   value: "100",
  //                   },
  //               },
  //               ],
  //           };
    
  //           const response = await fetch(url, {
  //               headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${accessToken}`,
  //               // Uncomment one of these to force an error for negative testing (in sandbox mode only).
  //               // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
  //               // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
  //               // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
  //               // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
  //               },
  //               method: "POST",
  //               body: JSON.stringify(payload),
  //           });
        
  //           return handleResponse(response);
  //           };
  
