import { type RequestHandler } from '@builder.io/qwik-city';
import { type ExtendSession } from '~/routes/plugin@auth';





export const onPost: RequestHandler = async ({ json, request, parseBody, sharedMap,  }) => {
    const session = await sharedMap.get("session") as ExtendSession | undefined;
    if (!session) {
      throw new Error("No session found");
    }

    const body = await parseBody();

    console.log(JSON.stringify(Array.from(request.headers.values()), null, 2));
 
    json(200, { message: 'Upload complete' });
};
