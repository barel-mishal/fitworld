import { Slot, component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';
import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';

import { type TypeSchemaAssessment, type RoutesLiteral, SchemaAssessment } from '~/util/types';
import { type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';

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
  currentView: RoutesLiteral
} 


export const useAssessmentStore = (data: TypeSchemaAssessment) => {
  // TODO: finish form https://claude.ai/chat/bcc02085-d35f-4ffd-ad5a-09c7737c3208

  const actionProfileMerge = useActionMergeProfile();
  const actionWeightMerge = useActionMergeWeight();
  const actionHeightMerge = useActionMergeHeight();

  const assessmentStore = useStore<AssessmentStoreType>({ 
    settings: { 
      buttonStyle: "outline", 
      buttonDisabled: true 
    }, 
    data,
    currentView: "/client/Assessment/",
});


  return {assessmentStore, actionProfileMerge, actionWeightMerge, actionHeightMerge};
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
      height: {type: "cm", value: 0},
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

export const useActionMergeProfile = routeAction$(async (data, {sharedMap, redirect}) => {
  const session: ExtendSession | null = sharedMap.get('session');
  const id = session?.database.profile.id;
  if (!id) throw redirect(302, `/`);
  const token = session.database.token;
  const db = await serverInitDatabase();
  await db.authenticate(token);
  const merge = await db.merge(id, { [data.field]: data.value });

  return {
    merge
  }
}, zod$({
  value: z.string().or(z.number()).or(z.boolean()).or(z.array(z.string())).or(z.date()),
  field: z.string()
}));


export const useActionMergeWeight = routeAction$(async (data, {sharedMap, redirect}) => {
  const session: ExtendSession | null = sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw redirect(302, `/`);
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  select * from weight where user = $auth.id;
  
  `)
  console.log('merge', merge);
  return {
    merge
  }
}, zod$({
  value: z.string().or(z.number()).or(z.boolean()).or(z.array(z.string())).or(z.date()),
  field: z.string()
}));
export const useActionMergeHeight = routeAction$(async (data, {sharedMap, redirect}) => {
  console.log('data', data);
  const session: ExtendSession | null = sharedMap.get('session');
  const token = session?.database.token
  if (!token) throw redirect(302, `/`);
  const db = await serverInitDatabase();
  await db.authenticate(token);
  // const merge = await db.merge(id, { [data.field]: data.value });
  const merge = await db.query_raw(`
  select * from height where user = $auth.id;
  
  `)
  console.log('merge', merge);
  return {
    merge
  }
}, zod$({
  value: z.string().or(z.number()).or(z.boolean()).or(z.array(z.string())).or(z.date()),
  field: z.string()
}));



