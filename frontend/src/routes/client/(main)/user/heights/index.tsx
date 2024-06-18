import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, server$, useNavigate } from '@builder.io/qwik-city';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';
import { type HeightRecord, HeightsWarper, contextHeightsStore } from './Context';
import { HeightsUnitPopover } from './PopOverHeight';
import { schemaHeightRecord as schemaHeightRecord } from './types';
import { formatedDateToUser, getCurrentDateForInput } from '~/util/formatDate';
import { PhArrowBendUpLeft } from '~/components/icons/icons';
import { AppLinkGlobal } from '~/routes.config';

export const useLoaderUserHeights = routeLoader$(async function () {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", data: null, success: false }
  else {
    const heights = await userDB.value?.query<[HeightRecord]>("SELECT * FROM height ORDER BY updateAt DESC");
    return {
      success: true,
      data: {
        heights: schemaHeightRecord.array().parse(heights?.[0]),
        currentDate: getCurrentDateForInput(new Date),
      },
      error: "",
    }
  }
});

export type ReturnTypeUseLoaderUserHeights = NonNullable<ReturnType<typeof useLoaderUserHeights>["value"]["data"]>;

export default component$(() => {
  const data = useLoaderUserHeights().value.data;
  if (!data) return <div>Error</div>;
  return (
    <HeightsWarper {...data} >
      <Heights/>
    </HeightsWarper>
  );
});

export  const Heights = component$(() => {
  const sc = useContext(contextHeightsStore);
  const nav = useNavigate();
  
  return (
      <div class="min-h-screen bg-gray-950 p-4 grid gap-3 content-start font-roundsans text-gray-50 grid-rows-[auto,auto,1fr,auto] h-screen">
        <section class="">
          <AppLinkGlobal route='/client/(main)/user/' class="flex gap-3 items-center text-gray-400">
            <PhArrowBendUpLeft class="w-8 h-8 fill-current"/>
            <h3 class="text-xl ">Profile</h3>
          </AppLinkGlobal>
        </section>
        <section class="">
          {/* textarea look like input */}
          <h1 class="text-gray-400 text-2xl leading-10 ">New height</h1>
          <div class="grid grid-cols-[1fr,auto,auto] gap-4">
            <div class=" ">
              <label for="heights-insert-input" class="text-gray-400">Date</label>
              <input 
                name="heights-insert" 
                id="heights-insert-input" 
                type='date' 
                value={sc.updateAtValue.value}
                onInput$={async (e,el) => await sc.store.setUpdateAt(el.value)}
                class="inp w-full"
              />
            </div>
            <div class="grid ">
              <label for="heights-insert-input" class="text-gray-400">Height</label>
              <input 
                ref={sc.refHeightInput}
                name="heights-insert" 
                placeholder='xxx' 
                inputMode='decimal' 
                type='text' 
                value={sc.heightValue.value}
                onInput$={(_,el) => sc.store.setHeight(el.value)}
                id="heights-insert-input" 
                class="inp w-[70px]" />
            </div>
            <div>
            <label for="unit-insert-input" class="text-gray-400">height</label>
            <HeightsUnitPopover inputId='unit-input-height' />
            </div>
          </div>
        </section>
        <section class="font-roundsans  flex gap-2 flex-col overflow-y-auto ">
          <h1 class="text-gray-300 text-2xl font-bold ">My past heights</h1>
          <div class="flex flex-col gap-4 before:bg-sky-400 ">
            {
              sc.heights.value.map((height) => {
                const newDate = formatedDateToUser(getCurrentDateForInput(height.updateAt as Date))
                return (
                  <div key={height.updateAt?.toString()} class="grid grid-cols-[1fr,auto] gap-3">
                    <p class="text-gray-400 ">{newDate}</p>
                    <p>{height.value} {height.type}</p>
                  </div>
                );
              })
            }
          </div>
        </section>
        <section class="grid grid-rows-[24px,1fr] ">
          <label for="input-height-error" id='input-height-error' class="text-rose-300 text-xs">{sc.store?.messageErrorSubmit}</label>
          <button class="btn grid place-items-center" onClick$={async () => await nav(await sc.handleSubmitOnFinish())} >
            <div class="w-full grid place-items-center opacity-100 data-[active='false']:h-0 delay-100 data-[active='false']:opacity-0 col-start-1 row-start-1 duration-300 transition-all ease-in-out" data-active={`${sc.store.btnSubmit === "loading"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-100 w-5 h-5 animate-spin" viewBox="0 0 256 256"><path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path></svg>
            </div>
              <p class={"text-gray-50 data-[active='true']:opacity-0 duration-200 transition-all opacity-100 col-start-1 row-start-1 "} data-active={`${sc.store.btnSubmit === "loading"}`}>Submit</p>
          </button>
        </section>
      </div>
  );
})

export const serverInsertHeight = server$(async function (data: Partial<HeightRecord>) {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", success: false }
  try {
    const heights = await userDB.value?.create<Partial<HeightRecord>>("height", data);
    
    if (!heights) return { 
      success: false, 
      error: "Failed to insert height",
      value: [],
    };
    return {
      success: true,
      error: "",
      value: heights,
    };
  } catch (error) {
    console.error(error);
    return { 
      success: false, 
      error: "Already exists height for this date",
      value: [],
    }; 
  }
});


