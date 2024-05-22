import { Fragment, component$, useComputed$, useSignal } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { PhFooPeinapple, PhPersonCirclePlus, PhShare } from '~/components/icons/icons';
import { BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { type ReturnTypeSession, useAuthSession, useAuthSignout, type ExtendSession } from '~/routes/plugin@auth';
import { serverInitDatabase } from '~/routes/seedDatabase';


export default component$(() => {
  const auth = useAuthSession().value as ReturnTypeSession | null;
  const signOut = useAuthSignout();
  const computeDateFormat = useComputed$(() => {
    const dateRaw = auth?.expires ?? "";
    const intrlazetionDatetimeApi = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
    const date = new Date(dateRaw);
    return intrlazetionDatetimeApi.format(date)
  });
  return (
    <div class="grid grid-rows-[1fr,60px] bg-gray-950 overflow-y-scroll h-screen ">
        <div class={cn("grid gap-3  place-content-start text-gray-50 bg-gray-950 font-roundsans pb-12 overflow-y-auto")}>
          <UserPhoto />
          <UserTitle name={auth?.user?.name ?? ""} email={auth?.user?.email ?? ""} joind={computeDateFormat.value} />
          <UserProgress />
          <UserShares />
          <OverView />
          <UserWeeklyProgress />
          <button onClick$={() => signOut.submit({ callbackUrl: '/signedout' })} class="border-red-700 m-2 p-3 border-2 rounded-lg text-red-700 ">Sign Out</button>
        </div>
        <div>
          <BottomNavBar  user={{class: "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200 "}} />
        </div>
    </div>
  );
}); 

export const OverView = component$(() => {

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
        </div>
        <div class="grid gap-3">
          <p class="text-gray-50 small-title ">Lose weight</p>
          <p class="text-gray-300/70">Goal</p>
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

export const UserTitle = component$<{name: string, email: string, joind: string}>((props) => {
  return  <section class="px-3">
    <h1 class="text-2xl text-gray-50 pb-2">{props.name}</h1>
    <p class="text-xs text-gray-300 flex gap-2 items-center"><span>{props.email}</span><svg width={6} height={6} fill='rgb(110 231 183 / 0.5)'><circle r={3} cx={3} cy={3}   /></svg><span>Joind: {props.joind}</span></p>
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

  return <section class="px-3 grid gap-3">
    <h3 class="text-gray-50 text-xl font-bold flex gap-2">Weekly Progress</h3>
    <div class="grid gap-3 border border-gray-700/50 rounded-xl p-3">
      <p class="text-gray-400/80"><span>This week</span><span>200 XP</span></p>
      <p class="text-gray-400/80"><span>Last week</span><span>500 XP</span></p>
      <div class="h-96">
        <UserChartProgress />
      </div>
    </div>

    </section>
});

export const UserChartProgress = component$(() => {

  return <div class="grid">
    <svg class="w-full" preserveAspectRatio='' viewBox="0 0 500 200">
  
  <polyline
     fill="none"
     stroke="#0074d9"
     stroke-width="4"
     points="
       00,00
       20,60
       40,80
       60,20
       80,80
       100,80
       120,60
       140,100
       160,90
       180,80
       200, 110
       220, 10
       240, 70
       260, 100
       280, 100
       300, 40
     "
     transform='translate(0, 200) scale(1, -1)'
   />
  
</svg>
    </div>
    
});

export const Settings = component$(() => {

  return   <div>
  <form>
    <div class="space-y-12">
    <div class="border-b border-gray-100/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-100">Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-100">Username</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset bg-gray-50 focus-within:ring-gray-500 sm:max-w-md">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-600/60 ring-gray-500 focus-within:ring-0 focus-within:outline-none focus:outline-none focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"/>
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-gray-100">About</label>
          <div class="mt-2">
            <textarea id="about" name="about" rows={3} class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-gray-400 focus-within:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-gray-50"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
        </div>

        <div class="col-span-full">
          <label for="photo" class="block text-sm font-medium leading-6 text-gray-100">Photo</label>
          <div class="mt-2 flex items-center gap-x-3">
            <svg class=" w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
            <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
          </div>
        </div>

        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-100">Cover photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-100/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-100">Personal Information</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-100">First name</label>
          <div class="mt-2">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm font-medium leading-6 text-gray-100">Last name</label>
          <div class="mt-2">
            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-100">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="country" class="block text-sm font-medium leading-6 text-gray-100">Country</label>
          <div class="mt-2">
            <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div class="col-span-full">
          <label for="street-address" class="block text-sm font-medium leading-6 text-gray-100">Street address</label>
          <div class="mt-2">
            <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-100">City</label>
          <div class="mt-2">
            <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="region" class="block text-sm font-medium leading-6 text-gray-100">State / Province</label>
          <div class="mt-2">
            <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-100">ZIP / Postal code</label>
          <div class="mt-2">
            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-100/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-100">Notifications</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

      <div class="mt-10 space-y-10">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-100">By Email</legend>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="comments" class="font-medium text-gray-100">Comments</label>
                <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="candidates" class="font-medium text-gray-100">Candidates</label>
                <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="offers" class="font-medium text-gray-100">Offers</label>
                <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-100">Push Notifications</legend>
          <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
          <div class="mt-6 space-y-6">
            <div class="flex items-center gap-x-3">
              <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-everything" class="block text-sm font-medium leading-6 text-gray-100">Everything</label>
            </div>
            <div class="flex items-center gap-x-3">
              <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-email" class="block text-sm font-medium leading-6 text-gray-100">Same as email</label>
            </div>
            <div class="flex items-center gap-x-3">
              <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-100">No push notifications</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-100">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
</div>
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
      console.log({data})
      const result = await db.create<Asset>("asset", {...data, asset_name: "profile_photo"});
      console.log({result});
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
    <div class="max-w-md mx-auto">
      <article class="bg-gray-800 py-4 px-6  rounded-b-lg">
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
            onClick$={() => fileRef.value?.click()}
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
