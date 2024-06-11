import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { Surreal } from "surrealdb.js";
import {
  addonsProfileEnergySchema,
  type SchemaProfileType,
} from "~/util/types";
import { type Session } from "@auth/core/types";
import { server$ } from "@builder.io/qwik-city";


export const serverConnectRootDB = server$(() => {
  const db = new Surreal();

  return {
    async run() {
      try {
        console.log("connecting");
        await db.connect("http://localhost:8000/rpc", {
          namespace: "namespace",
          database: "database",
          auth: {
            username: "root",
            password: "root",
          }
        });
      } catch (error) {
        if (error instanceof Error)
        return { error: error.message, path: error.stack };
        else return { error: "Unknown error", path: "" };
      }
      console.log("connected");
    },
    async dispose() {
      await db.close();
    },
    async action<T>(action: (db: Surreal) => Promise<T>) {
      return action(db);
    },
  };
});

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => {

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
              const db = await serverConnectRootDB();
              
              await db.run();
              
              // Check if user exists in database
              await db.action(async (db) => {
                
                const check = await db.query<[[SchemaProfileType] | []]>(
                  "SELECT * FROM user WHERE providerId = $id",
                  { id: connection.account?.providerAccountId },
                );
                if (check[0].length === 0) {
                  await db.signup({
                    scope: "account",
                    database: "database",
                    namespace: "namespace",
                    pass: connection.account?.providerAccountId, // password is providerAccountId
                    providerId: connection.account?.providerAccountId,
                  });
              }});

              await db.dispose();

            } catch (error) {
              console.error("\n\n ** Database signup error ** \n\n", error);
              return null
            }
            // Set token providerId to account providerAccountId
            connection.token.providerId = connection.account.providerAccountId;
          }
          return connection.token;
        },
        session: async (connection) => {
          // Signin to database with providerId
            const db = await serverConnectRootDB();
            await db.run();

            const data = await db.action<{data: [[SchemaProfileType]], token: string}>(async (db) => {


            const token = await db.signin({
              scope: "account",
              database: "database",
              namespace: "namespace",
              pass: connection.token.providerId,
            });

            console.log(token);

            // Get user profile
            // TODO: change schema so the weight and height are the most updated.
            const data = await db.query<[[SchemaProfileType]]>(`
            SELECT *, fn::energy(id) as overview FROM profile WHERE userId = $auth.id;
            SELECT * FROM user WHERE id = $auth.id;
          `);

            return {data, token};

          });

          await db.dispose();

          const profile = addonsProfileEnergySchema.partial().parse(data.data[0][0]);

          // Return session with database token for to authenticate with database and profile
          return {
            ...connection.session,
            database: { token: data.token, profile: profile },
          };
        },
      },
      pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        verifyRequest: "/auth/verify-request",
        //
        newUser: "/auth/new-user",
        error: "/auth/error", // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
    };
  });

export type ReturnTypeSignout = ReturnType<typeof useAuthSignout>;
export type ReturnTypeSignin = ReturnType<typeof useAuthSignin>;
export type ExtendSession = Session & {
  database: {
    token: string;
    profile: SchemaProfileType;
    person: { weight: TimeSeriesData; height: TimeSeriesData };
  };
};
export type ReturnTypeSession = ReturnType<typeof useAuthSession>["value"] & {
  database: {
    token: string;
    profile: SchemaProfileType;
    person: { weight: TimeSeriesData; height: TimeSeriesData };
  };
};

export type TimeSeriesData = {
  type: string;
  value: number;
  updateAt: string;
};
