import { server$ } from "@builder.io/qwik-city";
import { type TimeSeriesData, type ExtendSession } from "../../plugin@auth";
import { serverInitDatabase } from "../../seedDatabase";

export const serverMergeHeight = server$(async function(data: {value: number, _type: string, record: string}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const db = await serverInitDatabase();
    await db.authenticate(token);
    // const merge = await db.merge(id, { [data.field]: data.value });
    const merge = await db.query<[TimeSeriesData]>(`
    IF type::is::record($record, 'height') THEN
      UPDATE $record SET value = $value, type = $_type
    ELSE
      CREATE height SET value = $value, type = $_type
    END;
    `, data);

    return {
      merge
    }
  });

export type MergeHeightArgsType = Parameters<typeof serverMergeHeight>;
  
export type MergeHeightType = ReturnType<typeof serverMergeHeight>;

interface UserProfile {
    about: string;
    activity_level: string;
    createdAt: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    goals: string[];
    id: string;
    image: string;
    name: string;
    nickname: string;
    updateAt: string;
    userId: string;
    [key: string]: string | string[] | Date;
}

export const serverMergeProfile = server$(async function(data: {field: keyof UserProfile, value: string | Date | string[]}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const id = session?.database.profile.id;
    if (!id) throw new Error('No profile id');
    const token = session.database.token;
    const db = await serverInitDatabase();
    await db.authenticate(token);
    const merge = await db.merge<UserProfile>(id, { [data.field]: data.value });
    return {
      merge
    }
  });

  export type MergeProfileArgsTypes = Parameters<typeof serverMergeProfile>;

  export type MergeProfileType = ReturnType<typeof serverMergeProfile>;
  
  export const serverMergeWeight = server$(async function(data: {value: number, _type: string, record: string}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const db = await serverInitDatabase();
    await db.authenticate(token);
    // const merge = await db.merge(id, { [data.field]: data.value });
    const merge = await db.query<[TimeSeriesData]>(`
    IF type::is::record($record, 'weight') THEN
      UPDATE $record SET value = $value, type = $_type
    ELSE
      CREATE weight SET value = $value, type = $_type
    END;
    `, data);
    return {
      merge
    }
  });

export type MergeWeightArgsType = Parameters<typeof serverMergeWeight>;
  
  export type MergeWeightType = ReturnType<typeof serverMergeWeight>;