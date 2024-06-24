
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