import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { server$, type RequestHandler } from '@builder.io/qwik-city';
import { Surreal } from 'surrealdb.js';

export const onRequest: RequestHandler = (event) => {
  
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn || session.user?.email === "dreamwork@dreamwork.network") {
    return;
  } else {
    throw event.redirect(302, `/`);
  }
};


export default component$(() => {
  return (
    <div>
      <h1>Seed Database</h1>
      <p>Seed the database with initial data</p>
      <div>
        <h1>Table users</h1>
        <button
        onClick$={async () => {

        }}>Signin</button>
      </div>
    </div>
  );
});


export const serverInitDatabase = server$(async () => {
  const db = new Surreal();
  await db.connect("http://0.0.0.0:8000/rpc", { 
    database: "database", 
    namespace: "namespace", 
    auth: { 
      username: "root", 
      password: "root" 
    } 
  });
  await db.use({ namespace: "namespace", database: "database" });
  return db;
});
