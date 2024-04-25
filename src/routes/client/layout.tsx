import { $, type QRL, Slot, component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';
import { type RequestHandler, routeLoader$, server$ } from '@builder.io/qwik-city';

import { type TypeSchemaAssessment, type RoutesLiteral, SchemaAssessment } from '~/util/types';
import { type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';
import { type QueryResult, type RawQueryResult } from 'surrealdb.js/script/types';
import { type Session } from '@auth/core/types';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    console.log("redirecting")
    throw event.redirect(302, `/auth/signin`);
  }
};

export interface HeightGetter {
  type: "cm" | "m" | "FT";
  value: number; 
  id: string;
  [key: string]: string | number;
}
export interface WeightGetter {
  type: "kg" | "g" | "lb";
  value: number;
  id: string;
  [key: string]: string | number;
}

interface PersonalInformation {
  gender: "female" | "male" | "",
  name: string,
  dateOfBirth?: {
    day: string,
    month: string,
    year: string
  };
  height: HeightGetter,
  weight: WeightGetter,
}

interface LifeStyle {
  occupation: string,
  activityLevel: string,
  goals: string[];
}

interface AssessmentStoreType {
  settings: { buttonStyle: "outline" | "link" | "primary" | "secondary" | "alert" | "ghost" | null | undefined,
  buttonDisabled: boolean
},
  data: {
    personalInformation: PersonalInformation,
    lifeStyle: LifeStyle,
  }
  currentView: RoutesLiteral,
  onInputHeight$: QRL<(value: number) => void>,
  actions: {
    mergeProfile: {
      submit: QRL<(this: { isRunning: boolean; }, data: {field: string, value: string | Date | number}) => MergeProfileType>
      isRunning: boolean
    },
    mergeWeight: {
      submit: QRL<(this: { isRunning: boolean; }, data: {value: number, _type: string, record: string}) => Promise<{ merge: QueryResult<RawQueryResult>[]; }>>;
      isRunning: boolean
    },
    mergeHeight: {
      submit: QRL<(this: { isRunning: boolean; }, data: {value: number, _type: string, record: string}) => Promise<{ merge: QueryResult<RawQueryResult>[]; }>>;
      isRunning: boolean
    },
  }
} 


export const useAssessmentStore = (data: TypeSchemaAssessment) => {
  // TODO: finish form https://claude.ai/chat/bcc02085-d35f-4ffd-ad5a-09c7737c3208

  const assessmentStore = useStore<AssessmentStoreType>({ 
    settings: { 
      buttonStyle: "outline", 
      buttonDisabled: false 
    }, 
    data,
    currentView: "/client/Assessment/",
    onInputHeight$: $(function(this: { data: AssessmentStoreType["data"] }, value: number) {
      this.data.personalInformation.height.value = value;
    }),
    actions: {
      mergeProfile: {
        submit: $(async function(this: { isRunning: boolean }, data: {field: string, value: string | Date | number}) {
          const result = await serverMergeProfile(data);
          return result;
        }),
        isRunning: false
      },
      mergeWeight: {
        submit: $(async function(this: { isRunning: boolean }, data: {value: number, _type: string, record: string}) {
          const result = await serverMergeWeight(data);
          return result;
        }),
        isRunning: false
      },
      mergeHeight: {
        submit: $(async function(this: { isRunning: boolean }, data: {value: number, _type: string, record: string}) {
          const result = await serverMergeHeight(data);
          return result;
        }),
        isRunning: false
      }
    }
});


  return assessmentStore;
}

export type AssessmentStore = ReturnType<typeof useAssessmentStore>;

export const contextAssessmentStore = createContextId<AssessmentStore>("Assessment");

export const useLoaderAssessmentData = routeLoader$(async function({sharedMap})  {
  const session = sharedMap.get('session') as ExtendSession | null;
  if (!session) return;
  const db = await serverInitDatabase();
  await db.authenticate(session.database.token);
  type CustomQueryResult = [null, null, [Partial<HeightGetter>], null, null, [Partial<WeightGetter>]];

  const height = await db.query_raw<CustomQueryResult>(`
  -- LATEST height record
  LET $latestHeight = SELECT * FROM height ORDER BY created_at DESC LIMIT 1;
  LET $length = array::len($latestHeight);
  
  IF $length = 0 THEN
  ( CREATE height )
  ELSE 
  ( $latestHeight )
  END; 

  LET $weight = SELECT * FROM weight ORDER BY created_at DESC LIMIT 1;
  LET $lengthWeight = array::len($weight);
  
  IF $lengthWeight = 0 THEN
    ( CREATE weight )
  ELSE 
    ( $weight )
  END;
  `);
  if (height[2].status === "ERR") throw new Error('Error fetching height');
  if (height[5].status === "ERR") throw new Error('No height record found');
  const parsed = SchemaAssessment.parse({
    personalInformation: {
      gender: session.database.profile.gender || "",
      name: session.database.profile.name || "",
      dateOfBirth: session.database.profile.dateOfBirth || undefined,
      height: height[2].result[0],
      weight: height[5].result[0],
    },
    lifeStyle: {
      occupation: "",
      activityLevel: "",
      goals: ["", "", ""]
    }
  }) as {personalInformation: PersonalInformation, lifeStyle: LifeStyle};
  return parsed
})


export default component$(() => {
  const userData = useLoaderAssessmentData()

  const sc = useAssessmentStore(userData.value!);
  useContextProvider(contextAssessmentStore, sc);

  // Phone size screen is 380px wide 600px tall
  return (
    <Slot />
  );
});

export const serverMergeProfile = server$(async function(data) {
  const session: ExtendSession | null = this.sharedMap.get('session');
  const id = session?.database.profile.id;
  if (!id) throw new Error('No profile id');
  const token = session.database.token;
  const db = await serverInitDatabase();
  await db.authenticate(token);
  const merge = await db.merge(id, { [data.field]: data.value });

  return {
    merge
  }
});

export type MergeProfileType = ReturnType<typeof serverMergeProfile>;

export const serverMergeWeight = server$(async function(data: {value: number, _type: string, record: string}) {
  
  const session: ExtendSession | null = this.sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw new Error('No token');
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  IF type::is::record($record, 'weight') THEN
    UPDATE $record SET value = $value, type = $_type
  ELSE
    CREATE weight SET value = $value, type = $_type
  END;
  `, data);
  console.log('merge', JSON.stringify(merge), data);
  return {
    merge
  }
});

export type MergeWeightType = ReturnType<typeof serverMergeWeight>;

export const serverMergeHeight = server$(async function(data: {value: number, _type: string, record: string}) {
  
  const session: ExtendSession | null = this.sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw new Error('No token');
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  IF type::is::record($record, 'height') THEN
    UPDATE $record SET value = $value, type = $_type
  ELSE
    CREATE height SET value = $value, type = $_type
  END;
  `, data);
  console.log('merge', JSON.stringify(merge), data);
  return {
    merge
  }
});

export type MergeHeightType = ReturnType<typeof serverMergeHeight>;
