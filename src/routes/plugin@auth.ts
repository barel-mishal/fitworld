import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { Surreal } from "surrealdb.js";
import { addonsProfileEnergySchema, type SchemaProfileType } from "~/util/types";
import { type Session } from "@auth/core/types";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => {
    const db = new Surreal();
    db.connect("http://localhost:8000/rpc", { 
      database: "database", 
      namespace: "namespace", 
      auth: { 
        username: "root", 
        password: "root",
      } 
    })
    // .then((data) => console.log("Connected to SurrealDB", data))
    .catch((error) => console.error("Error connecting to SurrealDB", error));

    db.use({ namespace: "namespace", database: "database" })
    // .then((data) => console.log("Using namespace and database", data))
    .catch((error) => console.error("Error using namespace and database", error));

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
        // console.log("pass", connection.token.providerId, token)

        // Get user profile
        // TODO: change schema so the weight and height are the most updated. 
        const data = await db.query<[[SchemaProfileType]]>(`
         SELECT *, fn::energy(id) as energy FROM profile WHERE userId = $auth.id;
        `);

        const profile = addonsProfileEnergySchema.partial().parse(data[0][0]);

        // Return session with database token for to authenticate with database and profile
        return {...connection.session, database: { token, profile: profile }} ;
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
export type ExtendSession = Session & { database: { token: string, profile: SchemaProfileType, person: {weight: TimeSeriesData, height: TimeSeriesData} } };
export type ReturnTypeSession = ReturnType<typeof useAuthSession>["value"] & { database: { token: string, profile: SchemaProfileType, person: {weight: TimeSeriesData, height: TimeSeriesData} } };

export type TimeSeriesData = {
  type: string;
  value: number;
  updateAt: string;
}
