import { RequestHandler } from "express";

// This code is to menage the paypal orders
export const onPost: RequestHandler = async (event) => {
  const body = event.body;
  const cart = body.cart;

  console.log("cart", cart);

  
    
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
    

}
