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
          const signin = await serverTestSigninToDatabase();
          console.log('seed database', signin);

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

export const serverDatabaseSchema = server$(async () => {
  const schema = `
  DEFINE NAMESPACE IF NOT EXISTS namespace;
  DEFINE DATABASE IF NOT EXISTS database;

  USE NS namespace DB database;
  
  DEFINE SCOPE IF NOT EXISTS account SESSION 1w
    SIGNUP (
      CREATE user SET pass = crypto::argon2::generate($pass), providerId = $providerId
      RETURN *
    )
    SIGNIN ( SELECT * FROM user WHERE crypto::argon2::compare(pass, $pass) );
  
  DEFINE USER IF NOT EXISTS barel ON ROOT PASSWORD '123456' ROLES OWNER;
    
  -- Set the name of the token
  -- Use this token provider for database authorization
  -- Specify the cryptographic signature algorithm used to verify the token
  -- Specify the secret used to sign and verify the authenticity of the token
  DEFINE TOKEN IF NOT EXISTS barel ON DATABASE TYPE HS512 VALUE "sNSYneezcr8kqphfOC6NwwraUHJCVAt0XjsRSNmssBaBRh3WyMa9TRfq8ST7fsU2H2kGiOpU4GbAF1bCiXmM1b3JGgleBzz7rsrz6VvYEM4q3CLkcO8CMBIlhwhzWmy8";

  DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
      FOR select
        WHERE id = $auth.id
      FOR update
        WHERE id = $auth.id
      FOR delete
        WHERE id = $auth.id OR $auth.role = "admin";
  DEFINE FIELD pass ON TABLE user TYPE string;
  DEFINE FIELD roles ON TABLE user TYPE array<string> DEFAULT ["user"];
  DEFINE FIELD roles.* ON TABLE user TYPE string;
  DEFINE FIELD providerId ON TABLE user TYPE string;
  DEFINE FIELD createdAt ON user VALUE time::now() DEFAULT time::now() READONLY;
  DEFINE FIELD updateAt ON user VALUE time::now() DEFAULT time::now() READONLY;
  DEFINE INDEX userProviderId ON TABLE user COLUMNS providerId UNIQUE;

  DEFINE TABLE profile SCHEMAFULL
    PERMISSIONS
      FOR select
        WHERE userId = $auth.id
      FOR update
        WHERE userId = $auth.id
      FOR create
        WHERE userId = $auth.id
      FOR delete
        WHERE userId = $auth.id OR $auth.role = "admin";
  DEFINE FIELD userId ON TABLE profile TYPE record VALUE $auth.id DEFAULT $auth.id;
  DEFINE FIELD email ON TABLE profile TYPE string VALUE $value OR "" DEFAULT "";
  DEFINE FIELD name ON TABLE profile TYPE string VALUE $value OR "" DEFAULT "";
  DEFINE FIELD nickname ON TABLE personalInfo TYPE string VALUE $value OR "" DEFAULT meta::id($auth.id);
  DEFINE FIELD image ON TABLE profile TYPE string VALUE $value OR "" DEFAULT "";
  DEFINE FIELD createdAt ON profile VALUE time::now() DEFAULT time::now();
  DEFINE FIELD updateAt ON profile VALUE time::now() DEFAULT time::now();
  DEFINE INDEX profileUserId ON TABLE profile COLUMNS userId UNIQUE;

  DEFINE EVENT createdUser ON TABLE user WHEN $event = "CREATE" THEN (
    CREATE profile SET userId = $after.id
  );


  DEFINE TABLE personalInfo SCHEMAFULL
    PERMISSIONS
      FOR select
        WHERE userId = $auth.id
      FOR update
        WHERE userId = $auth.id
      FOR delete
        WHERE userId = $auth.id OR $auth.role = "admin";
  DEFINE FIELD userId ON TABLE personalInfo TYPE record VALUE $auth.id;
  DEFINE FIELD dateOfBirth ON TABLE personalInfo TYPE string;
  DEFINE FIELD goals ON TABLE personalInfo TYPE array<string>;
  DEFINE FIELD goals.* ON TABLE personalInfo TYPE string;
  DEFINE FIELD about ON TABLE personalInfo TYPE option<string>;
  DEFINE FIELD createdAt ON personalInfo VALUE time::now() READONLY;
  DEFINE FIELD updateAt ON personalInfo VALUE time::now() READONLY;
  DEFINE INDEX personalInfoUserId ON TABLE personalInfo COLUMNS userId UNIQUE;
  DEFINE INDEX nickname ON TABLE personalInfo COLUMNS nickname UNIQUE;

  DEFINE TABLE weights SCHEMAFULL
    PERMISSIONS
      FOR select
        WHERE userId = $auth.id
      FOR update
        WHERE userId = $auth.id
      FOR delete
        WHERE userId = $auth.id OR $auth.role = "admin";
  DEFINE FIELD userId ON TABLE weights TYPE record VALUE $auth.id;
  DEFINE FIELD weight ON TABLE weights TYPE number;
  DEFINE FIELD createdAt ON weights TYPE datetime VALUE $value OR time::now();
  DEFINE FIELD updateAt ON weights TYPE datetime VALUE $value OR time::now();
  DEFINE INDEX weightsUserId ON TABLE weights COLUMNS userId UNIQUE;
  DEFINE INDEX weightsCreatedAt ON TABLE weights COLUMNS createdAt;

  DEFINE TABLE heights SCHEMAFULL
    PERMISSIONS
      FOR select
        WHERE userId = $auth.id
      FOR update
        WHERE userId = $auth.id
      FOR delete
        WHERE userId = $auth.id OR $auth.role = "admin";
  DEFINE FIELD userId ON TABLE heights TYPE record VALUE $auth.id;
  DEFINE FIELD height ON TABLE heights TYPE number;
  DEFINE FIELD createdAt ON heights TYPE datetime VALUE $value OR time::now();
  DEFINE FIELD updateAt ON heights TYPE datetime VALUE $value OR time::now();
  DEFINE INDEX heightsUserId ON TABLE heights COLUMNS userId UNIQUE;
  DEFINE INDEX heightsCreatedAt ON TABLE heights COLUMNS createdAt;



  

  ` 
  return schema;
});



