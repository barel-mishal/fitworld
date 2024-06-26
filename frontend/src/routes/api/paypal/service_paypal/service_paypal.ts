import { server$ } from "@builder.io/qwik-city";

export const servicePaypal = server$(function () {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = this.env as any;
    const base = "https://api-m.sandbox.paypal.com";
    const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
        ).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
        }
    };
    /**
     * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
     * @see https://developer.paypal.com/api/rest/authentication/
     */
    
    async function handleResponse(response: Response) {
        try {
            const jsonResponse = await response.json();
            return {
            jsonResponse,
            httpStatusCode: response.status,
            };
        } catch (err) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    }


    /**
     * Capture payment for the created order to complete the transaction.
     * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
     */
    async (orderID: number | string) => {
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
    });

    return handleResponse(response);
    };
    return {}
});