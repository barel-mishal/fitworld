import { $, Fragment, component$, createContextId, useComputed$, useContext, useContextProvider, useOnDocument, useSignal, useStore } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { Chart } from '~/components/chart/chart';
import { PhFooPeinapple, PhPersonCirclePlus, PhPlus, PhShare } from '~/components/icons/icons';
import { BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { type ReturnTypeSession, useAuthSession, useAuthSignout, type ExtendSession } from '~/routes/plugin@auth';
import { serverInitDatabase } from '~/routes/seedDatabase';
import { formatDate } from './util';
import { MergeProfileArgsTypes, MergeHeightArgsType, MergeWeightArgsType, serverMergeProfile, serverMergeHeight, serverMergeWeight } from '~/routes/service/server-user-personal-info';

export default component$(() => {
  const auth = useAuthSession().value as ReturnTypeSession | null;
  const signOut = useAuthSignout();
  const computeDateFormat = useComputed$(() => {
    const dateRaw = auth?.expires ?? "";
    const intrlazetionDatetimeApi = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
    const date = new Date(dateRaw);
    return intrlazetionDatetimeApi.format(date)
  });

  if (!auth) {
    return <div>Loading...</div>
  }
  const profile = useUpdateProfile(auth.database.profile);
  useContextProvider(contextUpdateProfile, profile);
  return (
    <div class="grid grid-rows-[1fr,55px] bg-gray-950 overflow-y-scroll h-screen ">
        <div class={cn("grid gap-3  place-content-start text-gray-50 bg-gray-950 font-roundsans pb-12 overflow-y-auto")}>
          <UserPhoto />
          <UserTitle email={profile.store.profile.email ?? ""} joind={computeDateFormat.value} />
          <UserProgress />
          <UserShares />
          <OverView />
          <UserWeeklyProgress />
          <button onMouseDown$={() => signOut.submit({ callbackUrl: '/signedout' })} class="border-red-700 m-2 p-3 border-2 rounded-lg text-red-700 ">Sign Out</button>
        </div>
        <div>
          <BottomNavBar  user={{class: "--tw bg-sky-300/20 p-1 m-2 rounded-md outline-2 outline outline-indigo-200 "}} />
        </div>
    </div>
  );
});

export const OverView = component$(() => {
  const profile = useContext(contextUpdateProfile);

  return <section class="px-3">
    <div class="grid gap-3">
      <h3 class="text-gray-50 text-xl font-bold">Overview</h3>
      <div class="grid gap-3">
        <div class="grid grid-cols-2 gap-3">
          <div class="grid gap-2 p-3 border-4 border-gray-800 rounded-md">
            <p class="text-gray-50 small-title ">30</p>
            <p class="text-gray-300/70 text-xs">Total XP</p>
          </div>
          <div class="grid gap-2 p-3 border-4 border-gray-800 rounded-md">
            <p class="text-gray-50 small-title ">180 cm</p>
            <p class="text-gray-300/70 text-xs">Day Streak</p>
          </div>
          <div class="grid gap-2 p-3 border-4 border-gray-800 rounded-md">
            <p class="text-gray-50 small-title ">70 kg</p>
            <p class="text-gray-300/70 text-xs">Top 3 finishes</p>
          </div>
          <div class="grid gap-2 p-3 border-4 border-gray-800 rounded-md">
            <p class="text-gray-50 small-title ">22</p>
            <p class="text-gray-300/70 text-xs">Level</p>
          </div>
          <button class="text-left grid gap-2 p-3 border-4 border-purple-800 rounded-md">
            <p class="text-purple-50 small-title ">{profile.store.profile?.latest_weight_kg}<span>kg</span> </p>
            <p class="text-purple-300/70 text-xs">Weight</p>
            <PhPlus class="col-start-2 row-start-1 w-5 h-5 fill-purple-300/70 row-span-2 place-self-end" />
          </button>
          <button class="text-left grid gap-2 p-3 border-4 border-purple-800 rounded-md">
            <p class="text-purple-50 small-title ">{profile.store.profile?.latest_height_cm}<span>cm</span> </p>
            <p class="text-purple-300/70 text-xs">Height</p>
            <PhPlus class="col-start-2 row-start-1 w-5 h-5 fill-purple-300/70 row-span-2 place-self-end" />
          </button>
        </div>
      </div>
    </div>
  </section>
});

export const UserPhoto = component$(() => {
  
  return <section class="w-screen">
    <label for="photo" class="block text-sm font-medium leading-6 text-gray-900 sr-only">Photo</label>
      <UpalodFile/>
  </section>
});  

export const UserTitle = component$<{email: string, joind: string}>((props) => {
  const sectionRef = useSignal<HTMLDivElement>();
  const profile = useContext(contextUpdateProfile);
  const name = useSignal(profile.store.profile.name);

  useOnDocument('click', $((e) => {
    if (profile.store.isEditProfile !== "" && sectionRef.value && !sectionRef.value.contains(e.target as Node)) {
      profile.store.isEditProfile = "";
    }
  }));
  return  <section class="px-3" ref={sectionRef}>
    {profile.store.isEditProfile ? <>
    <input class="inp" type="text" bind:value={name} />
    <button onMouseDown$={() => profile.store.updateUser({field: 'person', data: [{field: "name", value: name.value}]})} class="btn">Save</button>
    </> : <>
    <h1 class="text-2xl text-gray-50 pb-2" onMouseDown$={() => profile.store.isEditProfile = "name"}>{profile.store.profile.name}</h1>
    </>}
    <p class="text-xs text-gray-300 flex gap-2 items-center"><span>{props.email}</span><svg width={6} height={6} class="fill-current"><circle r={3} cx={3} cy={3}   /></svg><span>Joind: {props.joind}</span></p>
  </section>
});  

export const UserProgress = component$(() => {

  return <section class="px-3 grid grid-flow-col gap-4 place-content-start">
      <div class="">
        <PhFooPeinapple class="w-8 h-8" viewBox='160 0 800 800' />
        <label for="" class="text-xs text-gray-300/70">Lavel</label>
      </div>
      <div class="place-content-end">
        <h3>3</h3>
        <label for="" class="text-xs text-gray-300/70">Following</label>
      </div>
      <div class="place-content-end">
        <h3>3</h3>
        <label for="" class="text-xs text-gray-300/70">Followers</label>
      </div>
    </section>
});

export const UserShares = component$(() => {

  return <section class="px-3">
    <div class="grid grid-cols-[1fr,auto] py-2 gap-3">
      <button class="btn">
        <h3 class="text-gray-400 font-bold flex gap-2">
          <PhPersonCirclePlus class="w-6 h-6 fill-gray-400" />
          <span>Add Friend with email</span>
        </h3>
      </button>
      <button class="btn">
        <PhShare class="w-6 h-6 fill-gray-400" />
      </button>
    </div>
  </section>
});

export const UserWeeklyProgress = component$(() => {
  const exampleData: { day: string; count: string }[] = [
    { day: formatDate(new Date(2024, 4, 20)), count: "10" }, // May 20, 2024
    { day: formatDate(new Date(2024, 4, 21)), count: "15" }, // May 21, 2024
    { day: formatDate(new Date(2024, 4, 22)), count: "7" },  // May 22, 2024
    { day: formatDate(new Date(2024, 4, 23)), count: "20" }, // May 23, 2024
    { day: formatDate(new Date(2024, 4, 24)), count: "25" }, // May 24, 2024
    { day: formatDate(new Date(2024, 4, 25)), count: "5" },  // May 25, 2024
    { day: formatDate(new Date(2024, 4, 26)), count: "8" },   // May 26, 2024
    { day: formatDate(new Date(2024, 4, 27)), count: "8" },   // May 27, 2024
    { day: formatDate(new Date(2024, 4, 28)), count: "8" },   // May 28, 2024
    { day: formatDate(new Date(2024, 4, 29)), count: "8" },   // May 29, 2024
    { day: formatDate(new Date(2024, 4, 30)), count: "8" },   // May 30, 2024
  ];
  

  return <section class="px-3 grid gap-3">
    <h3 class="text-gray-50 text-xl font-bold flex gap-2">Weekly Progress</h3>
    <div class="grid gap-3 border border-gray-700/50 rounded-xl p-3">
      <p class="text-gray-400/80"><span>This week</span><span>200 XP</span></p>
      <p class="text-gray-400/80"><span>Last week</span><span>500 XP</span></p>
      <div class="">
        <Chart daysDuration={30} initialData={exampleData} />
      </div>
    </div>

    </section>
});

export const useUpload = routeAction$(
  async ({ file }, event) => {
    const session = event.sharedMap.get("session") as ExtendSession | undefined;
    if (!session || !session.user) {
      throw event.redirect(304, "/signin");
    }
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    formdata.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const endpoint =
      "https://api.cloudinary.com/v1_1/" +
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME +
      "/auto/upload";

    const res = await fetch(endpoint, {
      body: formdata,
      method: "post",
    });

    const data = await res.json();

    const db = await serverInitDatabase();
    await db.authenticate(session.database.token);

    try {
      const result = await db.create<Asset>("asset", {...data, asset_name: "profile_photo"});
      if (result.length === 0) {
        console.log("An error occured uploading image to database")
        return {
          success: false,
          error: "An error occured uploading image to database",
        }
      }
      await db.merge("profile", {image: result[0].secure_url});
      return {
        url: data.secure_url,
        assetId: result[0].id,
        success: true,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        }
      }
      return {
        success: false,
        error: "An error occured",
      }
    }
  },

  zod$({
    file: z.instanceof(Blob),
  })
);

export const UpalodFile = component$(() => {
  const auth = useAuthSession().value as ReturnTypeSession | null;
  const fileRef = useSignal<HTMLInputElement>();
  const action = useUpload();

  return (
    <div class="">
      <article class="bg-gray-800 py-4 px-6 rounded-b-lg">
        <Form action={action} class="grid grid-cols-1 gap-4">
          <input
            accept="image/*"
            hidden
            ref={fileRef}
            type="file"
            id="file"
            name="file"
          />

          <button
            type="button"
            class="flex flex-col space-y-3 items-center border border-dashed h-80 justify-center rounded-lg"
            onMouseDown$={() => fileRef.value?.click()}
          >
            {action.isRunning ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10 animate-spin"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            ) : (
              <>
                <div>
                  {action.value?.success || auth?.database.profile.image  ? <Fragment key={"google"}>
                  <img src={action.value?.url || auth?.database.profile.image} alt={"photo"} width={180} height={180} />
                  </Fragment> : <Fragment>
                      <PhPersonCirclePlus class="w-12 h-12 fill-gray-300" />
                      <span>Choose image</span>
                    </Fragment>
                    }
                </div>
              </>
            )}
          </button>

          <button
            class="btn disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={action.isRunning}
          >
            {action.isRunning ? "Uploading..." : "Upload"}
          </button>
        </Form>
      </article>
    </div>

  );
});

interface Asset {
  user_id: string; // Assuming user_id is a string that references the user table
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  existing: boolean;
  original_filename: string;
  [key: string]: unknown;
}

type UpdateUserStore = {
  field: "person",
  data: MergeProfileArgsTypes
} | {
  field: "height",
  data: MergeHeightArgsType
} | {
  field: "weight",
  data: MergeWeightArgsType
}

export const useUpdateProfile = (profile: ExtendSession["database"]["profile"]) => {
  const store = useStore({
    profile,
    updateUser: $(async function (this: {profile: ExtendSession["database"]["profile"], isEditProfile: ""}, update: UpdateUserStore) {
      const result = {error: "", success: false};
      switch (update.field) {
        case "person":
          const profileR = await serverMergeProfile(...update.data);
          this.profile.name = profileR.merge[0].name;
          this.isEditProfile = "";
          break;
        case "height":
          const heightR = await serverMergeHeight(...update.data);
          this.isEditProfile = "";
          this.profile.latest_height_cm = heightR.merge[0].value;
          break;
        case "weight":
          const weightR = await serverMergeWeight(...update.data);
          this.isEditProfile = "";
          this.profile.latest_weight_kg = weightR.merge[0].value;
          break;
      }
      return result
    }),
    isEditProfile: "" as keyof ExtendSession["database"]["profile"] | "",
  })
  return {
    store
  }
}

export type UseUpdateProfile = ReturnType<typeof useUpdateProfile>;

export const contextUpdateProfile = createContextId<UseUpdateProfile>("update-profile");