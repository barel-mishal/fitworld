import { type Session } from '@auth/core/types';
import { type RequestHandler } from '@builder.io/qwik-city';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';

export const onRequest: RequestHandler = async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const db = await serverDatabaseUserSession();

  if (!session || !db.success) {
    throw event.redirect(302, `/`);
  }

  const update = await db.value?.query(`
    UPDATE Eat set commited = time::now() WHERE commited = NONE;
  `);

  console.log(update);

  throw event.redirect(302, `/`);
};
