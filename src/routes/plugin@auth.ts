import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { Surreal } from "surrealdb.js";
import { type SchemaProfileType } from "~/util/types";
import { type Session } from "@auth/core/types";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => {
     console.log("\n\n1 before Surreal\n\n")
    const db = new Surreal();
    db.connect("http://localhost:8000/rpc", { 
      database: "database", 
      namespace: "namespace", 
      auth: { 
        username: "root", 
        password: "root",
      } 
    })
    .then((data) => console.log("Connected to SurrealDB", data))
    .catch((error) => console.error("Error connecting to SurrealDB", error));

    db.use({ namespace: "namespace", database: "database" })
    .then((data) => console.log("Using namespace and database", data))
    .catch((error) => console.error("Error using namespace and database", error));
    console.log("\n\n1.5 before Surreal\n\n")

    return {
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    debug: true,
    providers: [
      Google({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
    ] as Provider[],
    callbacks: {
      jwt: async (connection) => {
        if (connection.account) {
          try {
            // Check if user exists in database
            const check = await db.query<[[SchemaProfileType] | []]>("SELECT * FROM user WHERE providerId = $id", { id: connection.account.providerAccountId });
            if (check[0].length === 0) {
              // If user does not exist, create user
              await db.signup({
                scope: "account",
                database: "database", 
                namespace: "namespace", 
                pass: connection.account.providerAccountId, // password is providerAccountId
                providerId: connection.account.providerAccountId,
              });
              // Create profile for that user
              await db.query("CREATE profile; CREATE personalInfo;");
            }
          } catch (error) {
            console.error('\n\n ** Database signup error ** \n\n', error);
          }
          // Set token providerId to account providerAccountId
          connection.token.providerId = connection.account.providerAccountId;
        }
        return connection.token;
      },
      session: async (connection) => {
        // Signin to database with providerId
        const token = await db.signin({
          scope: "account",
          database: "database", 
          namespace: "namespace", 
          pass: connection.token.providerId,
        });
        console.log("pass", connection.token.providerId, token)

        // Get user profile
        const profile = await db.query<[[SchemaProfileType]]>("SELECT * FROM profile WHERE userId = $auth.id");
        console.log(profile)
        // Return session with database token for to authenticate with database and profile
        return {...connection.session, database: { token, profile: profile[0][0] }} ;
      },

    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      verifyRequest: '/auth/verify-request',
      // 
      newUser: '/auth/new-user',
      error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
  }});

export type ReturnTypeSignout = ReturnType<typeof useAuthSignout>;
export type ReturnTypeSignin = ReturnType<typeof useAuthSignin>;
export type ExtendSession = Session & { database: { token: string, profile: SchemaProfileType } };
export type ReturnTypeSession = ReturnType<typeof useAuthSession>["value"] & { database: { token: string, profile: SchemaProfileType } };

  /*

authorization result {
  "user": {
    "id": "11008905783463",
  "name": "DREAM WORK",
    "email": "dreamwork@dreamwowork",
    "image": "https://lh3.googleusercontent.com/a/ACg8ocKkJ3JPUacxI7_sjClONtIxitK8HIdxZH2NgoGIyAo1FUS28Q=s96-c"
  },
  "account": {
    "provider": "google",
    "type": "oidc",
    "providerAccountId": "11008925783463",
    "access_token": "ya29.a0Ad52N38LpwFgOfi9OB0st7zEA1tlD0OgBOpONgEIGOy4qVzffKlxyJ-hlW1RH50cMP-RlARVWOro3HPLRjucOe7IR7jWvgPFKeqKR31Iv6ZuNiqLmsfVN8sYpt0W1OdEvERT79hJa_QqATTBs11SIhE-HKaCgYKAawSARMSFQHGX2MiuG9soseC8TWuYvVqraQLhg0171",
    "expires_in": 3599,
    "scope": "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    "token_type": "bearer",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijkzjk1NzAzOTUzZDE0ZTlmMTVkZjVkMDlhNDAxZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMjcyNTQ5MTU1NDktdGIwcnI3M2E5YzV2ZDJzNGtxOW1rOGQ1cWljY3VvY2cuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMjcyNTQ5MTU1NDktdGIwcnI3M2E5YzV2ZDJzNGtxOW1rOGQ1cWljY3VvY2cuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAwODkwMjA0NTkxMjU3ODM0NjMiLCJoZCI6ImRyZWFtd29yay5uZXR3b3JrIiwiZW1haWwiOiJkcmVhbXdvcmtAZHJlYW13b3JrLm5ldHdvcmsiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjhSZjZSYVBvbWxyWWxQTGRfZVdWTHciLCJuYW1lIjoiRFJFQU0gV09SSyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLa0ozSlBVYWN4STdfc2pDbE9OdEl4aXRLOEhJZHhaSDJOZ29HSXlBbzFGVVMyOFE9czk2LWMiLCJnaXZlbl9uYW1lIjoiRFJFQU0iLCJmYW1pbHlfbmFtZSI6IldPUksiLCJpYXQiOjE3MTI1MDEzODgsImV4cCI6MTcxMjUwNDk4OH0.OpjQekNK0ye4kwl9kdojIrdyqMJUAdWrOF1j3FSKvXyfwa233Xx45DYAuxL1cBKcQ0DX2LVn6nbuSZaNmivTvWxVOlCAxRoIiZocFcZJrBParX20Z9TORWOrD7G1aqaa7-GOBqRrB6wCS7N6H51mSVvdGp3G5ux3f4-fg6JzTyuJbvUPNWADJNqENYY5S62V0UeCiuws5028G-UKcnzmCGME6YyoEWLB4_RBuhMnWaJ47XIGeYA9EcmWgn6UFUeViBim5GkDQ1ydtMktnqbLhv6RRFKu5TXMLHhK8waKsDf9q8IT8shToLGdGZ5vXNOkiqNKoi5L_xWNUmM7F0PhRg",
    "expires_at": 1712504987
  },
  "profile": {
    "iss": "https://accounts.google.com",
    "azp": "227254915549-tb0rr73a9ccg.apps.googleusercontent.com",
    "aud": "227254915549-tb0rr73a9c5vd2s4ccuocg.apps.googleusercontent.com",
    "sub": "110089020459125783463",
    "hd": "dreamwork",
    "email": "dreamwork@dreamwork",
    "email_verified": true,
    "at_hash": "8Rf6RaPomlVLw",
    "name": "DREAM WORK",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocKkJ3JPUacxI7_sjClONtIxitK8HIdxZH2NgoGIyAo1FUS28Q=s96-c",
    "given_name": "DREAM",
    "family_name": "WORK",
    "iat": 1712501388,
    "exp": 1712504988
  },
  "cookies": [
    {
      "name": "next-auth.pkce.code_verifier",
      "value": "",
      "options": {
        "httpOnly": true,
        "sameSite": "lax",
        "path": "/",
        "secure": false,
        "maxAge": 0
      }
    }
  ]
}

*/