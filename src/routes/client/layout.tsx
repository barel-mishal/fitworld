import { Slot, component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';
import { routeAction$, z, zod$ } from '@builder.io/qwik-city';

import { type RoutesLiteral } from '~/util/types';
import { type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';

interface AssessmentStoreType {
  settings: { buttonStyle: "outline" | "link" | "primary" | "secondary" | "alert" | "ghost" | null | undefined,
  buttonDisabled: boolean
},
  personalInformation: {
    gender: "female" | "male" | "",
    name: string,
    dateOfBirth: Date | undefined,
    height: {type: "cm" | "m" | "FT", value: number},
    currentWeight: {unit: "kg" | "g" | "lb", value: number},
  },
  lifeStyle: {
    occupation: string,
    activityLevel: string,
    goals: [string, string, string]
  },
  currentView: RoutesLiteral
} 

export const useAssessmentStore = () => {
  const actionProfileMerge = useActionMergeProfile()

  const assessmentStore = useStore<AssessmentStoreType>({ 
    settings: { 
      buttonStyle: "outline", 
      buttonDisabled: false 
    }, 
    personalInformation: {
      gender: "", 
      name: "",
      dateOfBirth: undefined,
      height: {
        type: "cm", 
        value: 0
      },
      currentWeight: {
        unit: "kg", 
        value: 0
      }
    },
    lifeStyle: {
      occupation: "",
      activityLevel: "",
      goals: ["", "", ""],
    },
    currentView: "/client/Assessment/",
});


  return {assessmentStore, actionProfileMerge};
}

export type AssessmentStore = ReturnType<typeof useAssessmentStore>;

export const contextAssessmentStore = createContextId<AssessmentStore>("Assessment");


export default component$(() => {
  const sc = useAssessmentStore();
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
  console.log('session', session);
  
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



