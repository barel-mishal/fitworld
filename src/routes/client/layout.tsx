import { $, type QRL, Slot, component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';
import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';

import { type TypeSchemaAssessment, type RoutesLiteral, SchemaAssessment } from '~/util/types';
import { type TimeSeriesData, type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';
import { type Session } from '@auth/core/types';
import { FormattedNumberSchema } from '~/util/formatNumber';
import { convertWeightUnits } from '~/util/convertUnits';
import { type MergeProfileType, serverMergeHeight, serverMergeProfile, serverMergeWeight } from '../service/server-user-personal-info';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
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



export interface AssessmentStoreType {
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
      submit: QRL<(this: { isRunning: boolean; }, data: { field: string; value:  string | string[] | Date; }) => MergeProfileType>
      isRunning: boolean
    },
    mergeWeight: {
      submit: QRL<(this: { isRunning: boolean; }, data: {value: number, _type: string, record: string}) => Promise<{ merge: [TimeSeriesData]; }>>;
      isRunning: boolean
    },
    mergeHeight: {
      submit: QRL<(this: { isRunning: boolean; }, data: {value: number, _type: string, record: string}) => Promise<{ merge: [TimeSeriesData]; }>>;
      isRunning: boolean
    }
  },
  cahngeWeightUnit: QRL<(this: { data: AssessmentStoreType["data"] }, value: number, fromUnit: WeightGetter["type"], toUnit: WeightGetter["type"]) => void>
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
        submit: $(async function (this: { isRunning: boolean; }, data: { field: string; value:  string | string[] | Date; }) {
          const result = await serverMergeProfile(data);
          return result;
        }),
        isRunning: false
      },
      mergeWeight: {
        submit: $(async function (this: { isRunning: boolean; }, data: { value: number; _type: string; record: string; }) {
          const result = await serverMergeWeight(data);
          return result;
        }),
        isRunning: false
      },
      mergeHeight: {
        submit: $(async function (this: { isRunning: boolean; }, data: { value: number; _type: string; record: string; }) {
          const result = await serverMergeHeight(data);
          return result;
        }),
        isRunning: false
      },
    },
    cahngeWeightUnit: $(async function(this: { data: AssessmentStoreType["data"] }, value: number, fromUnit: WeightGetter["type"], toUnit: WeightGetter["type"]) {
      const converted = convertWeightUnits(value, fromUnit, toUnit);
      const formatted = FormattedNumberSchema.safeParse(converted);
      if (!formatted.success) throw new Error('Invalid number');
      this.data.personalInformation.weight.value = formatted.data;
      this.data.personalInformation.weight.type = toUnit;
      
    }),
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
  // TODO: Fix first signin the return is empty array...
  const height = await db.query_raw<CustomQueryResult>(`
  -- LATEST height record
  LET $latestHeight = SELECT * FROM height ORDER BY createdAt DESC LIMIT 1;
  LET $lengthHeight = array::len($latestHeight);
  
  IF $lengthHeight = 0 THEN
    ( CREATE height )
  ELSE 
    ( $latestHeight )
  END; 

  LET $weight = SELECT * FROM weight ORDER BY createdAt DESC LIMIT 1;
  LET $lengthWeight = array::len($weight);
  
  IF $lengthWeight = 0 THEN
    ( CREATE weight )
  ELSE 
    ( $weight )
  END;
  `);
  if (height[2].status === "ERR") throw new Error('Error fetching height');
  if (height[5].status === "ERR") throw new Error('No height record found');
  const heightData = {
    personalInformation: {
      gender: session.database.profile.gender || "",
      name: session.database.profile.name || "",
      dateOfBirth: session.database.profile.dateOfBirth || undefined,
      height: height[2].result[0],
      weight: height[5].result[0],
    },
    lifeStyle: {
      occupation: "",
      activityLevel: session.database.profile.activity_level || "",
      goals: session.database.profile.goals || ["", "", ""]
    }
  }
  const parsed = SchemaAssessment.parse(heightData) as {personalInformation: PersonalInformation, lifeStyle: LifeStyle};
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


