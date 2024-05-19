import { type RequestHandler } from '@builder.io/qwik-city';
import { type ExtendSession } from '~/routes/plugin@auth';





export const onPost: RequestHandler = async (props) => {
    const session = await props.sharedMap.get("session") as ExtendSession | undefined;
    if (!session) {
      throw new Error("No session found");
    }
    const body = await props.parseBody();


    console.log('body', body);

 
    props.json(200, { message: 'Upload complete' });
};
