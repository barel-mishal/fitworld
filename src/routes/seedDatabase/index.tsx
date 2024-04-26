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

          console.log('seed database');
        }}>Signin</button>
      </div>
    </div>
  );
});


export const serverInitDatabase = server$(async () => {
  const db = new Surreal();
  db.connect("http://0.0.0.0:8000/rpc", { 
    database: "database", 
    namespace: "namespace", 
    auth: { 
      username: "root", 
      password: "root" 
    } 
  });
  db.use({ namespace: "namespace", database: "database" });
  return db;
});
export const serverTestSigninToDatabase = server$(async () => {
  const db = await serverInitDatabase();
  console.log('Show Namespace \n', await db.query('INFO FOR NS;'));
  console.log('\n\nShow Database \n', await db.query('INFO FOR DB;'));
  console.log('\n\nShow Users \n',  await db.query('SELECT * FROM user;'));
  // console.log('\n\nCreate User \n', await db.query('CREATE user SET pass = crypto::argon2::generate($pass);', { pass: '123' }));
  // console.log("\n\nSignup \n", await db.signup({ scope: "account", database: "database", namespace: "namespace", pass: '123892' }));
  // console.log("\n\nSignup \n", await db.signup({ scope: "account", database: "database", namespace: "namespace", pass: '12389', roles: ['admin'] }));
  console.log('\n\nSignin \n', await db.signin({
    pass: '123',
    password: "root",
    username: "root",
    database: "database",
    namespace: "namespace",
    scope: "account"
  }));

  console.log('\n\nShow User \n', await db.query('SELECT * FROM user;'));

});




