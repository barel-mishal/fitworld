import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { server$, type RequestHandler } from '@builder.io/qwik-city';
import { Surreal } from 'surrealdb.js';
import foodGroup from '~/food_groups.json';
import { createIngredientForFoodGroup, createMeasurements } from '~/util/helpfullSeedDatabaseFunction';

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
          const signin = await serverSeedFoodGroupsDatabase();
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
  DEFINE SCOPE IF NOT EXISTS account SESSION 1w SIGNUP (CREATE user SET pass = crypto::argon2::generate($pass), providerId = $providerId RETURN *) SIGNIN (SELECT * FROM user WHERE crypto::argon2::compare(pass, $pass));
  DEFINE USER IF NOT EXISTS barel ON ROOT PASSHASH '$argon2id$v=19$m=19456,t=2,p=1$TszD2PAhlKvIMPizSuhGuA$lTd+wXGiw+Z4Dh7gqXpNN2bgl3pPQ8JlO4DDPL4oRmk' ROLES OWNER;
  DEFINE TOKEN IF NOT EXISTS barel ON DATABASE TYPE HS512 VALUE 'sNSYneezcr8kqphfOC6NwwraUHJCVAt0XjsRSNmssBaBRh3WyMa9TRfq8ST7fsU2H2kGiOpU4GbAF1bCiXmM1b3JGgleBzz7rsrz6VvYEM4q3CLkcO8CMBIlhwhzWmy8';
  DEFINE TABLE user TYPE ANY SCHEMAFULL
    PERMISSIONS
      FOR select, update
        WHERE id = $auth.id
      FOR create NONE
      FOR delete
        WHERE id = $auth.id OR $auth.role = 'admin'
  ;
  DEFINE FIELD pass ON user TYPE string
    PERMISSIONS FULL
  ;
  DEFINE FIELD roles ON user TYPE array<string> DEFAULT [
    'user'
  ]
    PERMISSIONS FULL
  ;
  DEFINE FIELD roles[*] ON user TYPE string
    PERMISSIONS FULL
  ;
  DEFINE FIELD providerId ON user TYPE string
    PERMISSIONS FULL
  ;
  DEFINE FIELD createdAt ON user DEFAULT time::now() READONLY VALUE time::now()
    PERMISSIONS FULL
  ;
  DEFINE FIELD updateAt ON user DEFAULT time::now() READONLY VALUE time::now()
    PERMISSIONS FULL
  ;
  DEFINE INDEX userProviderId ON user FIELDS providerId UNIQUE;
  DEFINE TABLE profile TYPE ANY SCHEMAFULL
    PERMISSIONS
      FOR select, create, update
        WHERE userId = $auth.id
      FOR delete
        WHERE userId = $auth.id OR $auth.role = 'admin'
  ;
  DEFINE FIELD userId ON profile TYPE record DEFAULT $auth.id VALUE $auth.id
    PERMISSIONS FULL
  ;
  DEFINE FIELD email ON profile TYPE string DEFAULT '' VALUE $value OR ''
    PERMISSIONS FULL
  ;
  DEFINE FIELD name ON profile TYPE string DEFAULT '' VALUE $value OR ''
    PERMISSIONS FULL
  ;
  DEFINE FIELD nickname ON profile TYPE string DEFAULT meta::id($auth.id)
    PERMISSIONS FULL
  ;
  DEFINE FIELD image ON profile TYPE string DEFAULT '' VALUE $value OR ''
    PERMISSIONS FULL
  ;
  DEFINE FIELD dateOfBirth ON profile TYPE option<datetime> DEFAULT NONE
    PERMISSIONS FULL
  ;
  DEFINE FIELD goals ON profile TYPE array<string> DEFAULT [
    '',
    '',
    ''
  ]
    PERMISSIONS FULL
  ;
  DEFINE FIELD goals[*] ON profile TYPE string DEFAULT ''
    PERMISSIONS FULL
  ;
  DEFINE FIELD gender ON profile TYPE string
    PERMISSIONS FULL
  ;
  DEFINE FIELD about ON profile TYPE option<string> DEFAULT ''
    PERMISSIONS FULL
  ;
  DEFINE FIELD createdAt ON profile DEFAULT time::now() VALUE time::now()
    PERMISSIONS FULL
  ;
  DEFINE FIELD updateAt ON profile DEFAULT time::now() VALUE time::now()
    PERMISSIONS FULL
  ;
  DEFINE INDEX profileUserId ON profile FIELDS userId UNIQUE;
  DEFINE INDEX nickname ON profile FIELDS nickname UNIQUE;
  
  DEFINE TABLE height TYPE ANY SCHEMAFULL
    PERMISSIONS
      FOR select, update
        WHERE userId = $auth.id
      FOR create NONE
      FOR delete
        WHERE userId = $auth.id OR $auth.role = 'admin'
  ;
  DEFINE FIELD userId ON height TYPE record VALUE $auth.id DEFAULT $auth.id
    PERMISSIONS FULL
  ;
  DEFINE FIELD type ON height TYPE string VALUE $value ASSERT $value INSIDE ["cm", "m", "FT"] DEFAULT "cm"
    PERMISSIONS FULL
  ;
  DEFINE FIELD value ON height TYPE number DEFAULT 0
    PERMISSIONS FULL
  ;
  DEFINE FIELD createdAt ON height TYPE datetime VALUE $value OR time::now() DEFAULT time::now()
    PERMISSIONS FULL
  ;
  DEFINE FIELD updateAt ON height TYPE datetime VALUE $value OR time::now() DEFAULT time::now()
    PERMISSIONS FULL
  ;
  DEFINE INDEX heightUserId ON height FIELDS userId;
  DEFINE INDEX heightCreatedAt ON height FIELDS createdAt;
  
  DEFINE TABLE weight TYPE ANY SCHEMAFULL
    PERMISSIONS
      FOR select, update
        WHERE userId = $auth.id
      FOR create NONE
      FOR delete
        WHERE userId = $auth.id OR $auth.role = 'admin'
  ;
  DEFINE FIELD userId ON weight TYPE record VALUE $auth.id DEFAULT $auth.id
    PERMISSIONS FULL
  ;
  DEFINE FIELD type ON weight TYPE string VALUE $value ASSERT $value INSIDE ['kg', 'g', 'lb'] DEFAULT "kg"
    PERMISSIONS FULL
  ;
  DEFINE FIELD value ON weight TYPE number DEFAULT 0
    PERMISSIONS FULL
  ;
  DEFINE FIELD createdAt ON weight TYPE datetime VALUE $value OR time::now() DEFAULT time::now()
    PERMISSIONS FULL
  ;
  DEFINE FIELD updateAt ON weight TYPE datetime VALUE $value OR time::now() DEFAULT time::now()
    PERMISSIONS FULL
  ;
  DEFINE INDEX heightUserId ON weight FIELDS userId;
  DEFINE INDEX heightCreatedAt ON weight FIELDS createdAt;
  ` 
  return schema;
});

export const serverSeedFoodGroupsDatabase = server$(async () => {
  const db = await serverInitDatabase();
  
  // const food_groups_values = foodGroup.groups.map(createFoodGroup);
  // const insrtedGroups = await db.insert('Food_Group', food_groups_values);
  // console.log('insrted', insrtedGroups);
  
  // const food_measurements_values = createMeasurements(foodGroup.data.ingredients);
  // const insrtedMeasurements = await db.insert('Ingredient', food_measurements_values);
  // console.log('insrted', insrtedMeasurements);

  // const food_ingredients_values = createIngredientForFoodGroup(foodGroup.data.ingredients);
  // const insrtedIngredients = await Promise.allSettled(food_ingredients_values.map(async i => await db.query_raw(`
  // CREATE Ingredient CONTENT {
  //   addCarbs: $addCarbs,
  //   addFat: $addFat,
  //   addProtein: $addProtein,
  //   foodGroupNumber: $foodGroupNumber,
  //   group: type::thing("Food_Group", $group),
  //   hebrew_name: $hebrew_name,
  //   name: $name,
  //   selectedMeasurement: ( SELECT VALUE id FROM Measurements WHERE hebrew_name IN $measurements )[0],
  //   measurements: ( SELECT VALUE id FROM Measurements WHERE hebrew_name IN $measurements ),
  //   serving: $serving,
  //   servingUnit: $servingUnit
  // }
  // `, i)));
  // console.log('insrted', insrtedIngredients);

  // const merged = await Promise.all(foodGroup.data.ingredients.map(async i => {
  //   const dbIngredient = await db.query_raw<[[{id: string}]]>("SELECT * FROM Ingredient WHERE hebrew_name = $hebrew_name", { hebrew_name: i.name });
  //   const result = dbIngredient[0];
  //   if (result.status === "ERR") {
  //     console.log('not found', i.name, i.measurements, result);
  //     const insrtedIngredients = await Promise.all(createIngredientForFoodGroup([i]).map(async ii => await db.query_raw<[{id: string}]>(`
  //       CREATE Ingredient CONTENT {
  //         addCarbs: $addCarbs,
  //         addFat: $addFat,
  //         addProtein: $addProtein,
  //         foodGroupNumber: $foodGroupNumber,
  //         group: type::thing("Food_Group", $group),
  //         hebrew_name: $hebrew_name,
  //         name: $name,
  //         selectedMeasurement: (
  //           SELECT VALUE id FROM Measurements WHERE hebrew_name IN $measurements
  //         )[0],
  //         measurements: (
  //           SELECT VALUE id FROM Measurements WHERE hebrew_name IN $measurements
  //         ),
  //         serving: $serving,
  //         servingUnit: $servingUnit
  //       }
  //     `, ii)));
  //     throw new Error('not found ingredient hebrew_name ' + i.name + ' ' + JSON.stringify(insrtedIngredients, null, 2));
  //   }
  //   const measurementsResult = await Promise.all(i.measurements.map(async m => {
  //     const result_m = await db.query_raw<[[{id: string}]]>("SELECT * FROM Measurements WHERE hebrew_name = $hebrew_name", { hebrew_name: m.name });
  //     if (result_m[0].status === "ERR") {
  //       console.log('not found', m.name, result_m);
  //       throw new Error('not found measurements hebrew_name ' + m.name);
  //     }
  //     const _m = result_m[0].result[0];
  //     if (!_m) {
  //       const insrtedMeasurements = await db.create('Measurements', {
  //         name: m.englishName,
  //         hebrew_name: m.name,
  //         id: m.englishName.replaceAll(" ", "_")
  //       });
  //       throw new Error('not found measurements hebrew_name ' + m.name + ' ' + JSON.stringify(insrtedMeasurements, null, 2));
  //     }
  //     return {
  //       ingredient_id: result.result[0].id,
  //       measurements_id: _m.id,
  //       weight: m.weight,
  //       unit: m.englishUnitWeight,
  //       hebrew_unit: m.unitWeight
  //     };
  //   }));
  //   return measurementsResult;
  // }));

  // const insertedIngredientMeasurements = await db.insert('Measurements_Ingredient', merged.flat());

  

  

  console.log('insrted', JSON.stringify(insertedIngredientMeasurements, null, 2));

  return { merged, ingredients: foodGroup.data.ingredients.map(i => ({...i, measurements: i.measurements.map(m => ({...m, name: m.name === 'כדור 1' ? "כדור" : m.name}))})) };
});


