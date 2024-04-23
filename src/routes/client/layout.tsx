import { $, type QRL, Slot, component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';
import { routeLoader$, server$ } from '@builder.io/qwik-city';

import { type TypeSchemaAssessment, type RoutesLiteral, SchemaAssessment } from '~/util/types';
import { type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';
import { QueryResult, RawQueryResult } from 'surrealdb.js/script/types';

interface PersonalInformation {
  gender: "female" | "male" | "",
  name: string,
  dateOfBirth?: Date | undefined,
  height: {type: "cm" | "m" | "FT", value: number},
  currentWeight: {unit: "kg" | "g" | "lb", value: number},
}

interface LifeStyle {
  occupation: string,
  activityLevel: string,
  goals: string[]
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
      submit: QRL<(this: { isRuning: boolean; }, data: {field: string, value: string}) => MergeProfileType>
      isRuning: boolean
    },
    mergeWeight: {
      submit: QRL<(this: { isRuning: boolean; }, data: { field: string; value: string; }) => Promise<{ merge: QueryResult<RawQueryResult>[]; }>>;
      isRuning: boolean
    },
    mergeHeight: {
      submit: QRL<(this: { isRuning: boolean; }, data: { field: string; value: string; }) => Promise<{ merge: QueryResult<RawQueryResult>[]; }>>;
      isRuning: boolean
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
        submit: $(async function(this: { isRuning: boolean }, data: {field: string, value: string}) {
          const result = await serverMergeProfile(data);
          return result;
        }),
        isRuning: false
      },
      mergeWeight: {
        submit: $(async function(this: { isRuning: boolean }, data: {field: string, value: string}) {
          const result = serverMergeWeight(data);
          return result;
        }),
        isRuning: false
      },
      mergeHeight: {
        submit: $(async function(this: { isRuning: boolean }, data: {field: string, value: string}) {
          const result = serverMergeHeight(data);
          return result;
        }),
        isRuning: false
      }
    }
});


  return assessmentStore;
}

export type AssessmentStore = ReturnType<typeof useAssessmentStore>;

export const contextAssessmentStore = createContextId<AssessmentStore>("Assessment");

export const useLoaderAssessment = routeLoader$(function({sharedMap})  {
  const session = sharedMap.get('session') as ExtendSession | null;
  if (!session) return;
  return session.database.profile
})


export default component$(() => {
  const profile = useLoaderAssessment();
  const parsed = SchemaAssessment.parse({
    personalInformation: {
      gender: profile.value?.gender || "",
      name: profile.value?.name || "",
      dateOfBirth: profile.value?.dateOfBirth || undefined,
      height: { type: "cm", value: 0 },
      currentWeight: {unit: "kg", value: 0},
    },
    lifeStyle: {
      occupation: "",
      activityLevel: "",
      goals: ["", "", ""]
    }
  }) as {personalInformation: PersonalInformation, lifeStyle: LifeStyle}
  const sc = useAssessmentStore(parsed);
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


export const serverMergeWeight = server$(async function(data) {
  const session: ExtendSession | null = this.sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw new Error('No token');
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  select * from weight where user = $auth.id;
  `)
  console.log('merge', merge, data);
  return {
    merge
  }
});

export type MergeWeightType = ReturnType<typeof serverMergeWeight>;

export const serverMergeHeight = server$(async function(data) {
  console.log('data', data);
  const session: ExtendSession | null = this.sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw new Error('No token');
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  select * from height where user = $auth.id;
  
  `)
  console.log('merge', merge, data);
  return {
    merge
  }
});

export type MergeHeightType = ReturnType<typeof serverMergeHeight>;



