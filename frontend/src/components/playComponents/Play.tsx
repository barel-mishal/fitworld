import { type PropsOf, component$, $ } from "@builder.io/qwik";
import { PhFooPeinapple, PhStar } from "../icons/icons";
import { serverUserAddStep } from "~/routes/api/service_game/serviceUserAddStep";
import { AppLink } from "~/routes.config";
import { type StepKey } from "~/routes/api/service_game/serviceGPTResult";
import { cn } from "@qwik-ui/utils";

interface PlayProps {
  currentUnit: number;
  currentSection: number;
  currentLevel: number;
}

const Play = component$<PlayProps>((props) => {
  const handleStepChange = $(
    async (
      titleSection: string,
      unit: number,
      section: number,
      step: number,
    ) => {
      try {
        const result = await serverUserAddStep({
          index: 0,
          unit,
          section,
          step,
          titleSection,
        });
        console.log({ result });
      } catch (error) {
        console.log(error);
      }
    },
  );
  return (
    <div class="flex flex-col">
      <section class="grid grid-cols-12 gap-5 pb-14">
        <TitleGame
          params={`section 1 unit 1 level 1`}
          title="SECTION 1 UNIT 1"
          subTitle="The Importance Of Nutrition"
          element={{
            class:
              "p-4 bg-green-600 rounded-xl col-span-12 border-b-4 border-green-900 sticky top-0",
          }}
        />
        <LevelLink
          unit={1}
          section={1}
          level={1}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-3 row-span-1"
        />
        <LevelLink
          unit={1}
          section={1}
          level={2}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-5 row-span-1"
        />
        <LevelLink
          unit={1}
          section={1}
          level={3}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-5 row-span-1"
        />
        <div class="col-span-3 col-start-1 row-span-2 row-start-3 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <LevelLink
          unit={1}
          section={1}
          level={4}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-3 row-span-1"
        />
        <LevelLink
          unit={1}
          section={1}
          level={5}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-3 row-span-1"
        />
        <div class="col-span-3 col-start-8 row-span-2 row-start-5 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <LevelLink
          unit={1}
          section={1}
          level={6}
          currentLevel={props.currentLevel}
          currentUnit={props.currentUnit}
          currentSection={props.currentSection}
          parentClass="col-span-4 col-start-5 row-span-1"
        />
      </section>
      <section class="grid grid-cols-12 gap-3 pb-14">
        <TitleGame
          params={`section 1 unit 1 level 2`}
          title="SECTION 1 UNIT 2"
          subTitle="Macronutrients and Health"
          element={{
            class:
              "p-4 bg-purple-600  rounded-xl col-span-12 border-b-4 border-purple-900 sticky top-0",
          }}
        />
        <div class="col-span-4 col-start-3 row-span-1">
          <AppLink
            route="/client/(main)/play/[section]/[unit]/"
            param:unit={"2"}
            param:section="1"
            class={cn(
              "grid h-16 w-full place-content-center rounded-full border-b-4 p-4 text-gray-50 transition-all ease-in-out active:border-b",
              props.currentUnit >= 5 && props.currentSection >= 1
                ? "border-green-900 bg-green-600"
                : "border-gray-800 bg-gray-600",
            )}
          >
            <PhStar class="h-8 w-8 fill-current" />
          </AppLink>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <AppLink
            route="/client/(main)/play/[section]/[unit]/[level]/"
            param:unit={"2"}
            param:section="1"
            param:level="2"
            class={cn(
              "grid h-16 w-full place-content-center rounded-full border-b-4 p-4 text-gray-50 transition-all ease-in-out active:border-b",
              props.currentUnit >= 5 && props.currentSection >= 1
                ? "border-green-900 bg-green-600"
                : "border-gray-800 bg-gray-600",
            )}
          >
            <PhStar class="h-8 w-8 fill-current" />
          </AppLink>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Macronutrients and Health", 1, 2, 2)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Macronutrients and Health", 1, 2, 3)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-1 row-span-2 row-start-3 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Macronutrients and Health", 1, 2, 4)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Macronutrients and Health", 1, 2, 5)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-8 row-span-2 row-start-5 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Macronutrients and Health", 1, 2, 6)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
      </section>
      <section class="grid grid-cols-12 gap-3 pb-14">
        <TitleGame
          params={`section 1 unit 1 level 3`}
          title="SECTION 1 UNIT 3"
          subTitle="Build your training program"
          element={{
            class:
              "p-4 bg-indigo-600  rounded-xl col-span-12 border-b-4 border-indigo-900 sticky top-0",
          }}
        />
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 1)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-indigo-900 bg-indigo-600 p-4 text-indigo-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 2)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 3)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-1 row-span-2 row-start-3 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 4)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 5)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-8 row-span-2 row-start-5 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () => {
              // await handleStepChange("Build your training program", 1, 3, 6)
            }}
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
      </section>
      <section class="grid grid-cols-12 gap-3 pb-14">
        <TitleGame
          params={`section 1 unit 1 level 4`}
          title="SECTION 1 UNIT 4"
          subTitle="The Importance Of Nutrition"
          element={{
            class:
              "p-4 bg-rose-600  rounded-xl col-span-12 border-b-4 border-rose-900 sticky top-0",
          }}
        />
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 1)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-rose-900 bg-rose-600 p-4 text-rose-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 2)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 3)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-1 row-span-2 row-start-3 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 4)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-4 col-start-3 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 5)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
        <div class="col-span-3 col-start-8 row-span-2 row-start-5 content-center rounded-xl">
          <button class="">
            <PhFooPeinapple class="h-20 w-20" />
          </button>
        </div>
        <div class="col-span-4 col-start-5 row-span-1">
          <button
            onClick$={async () =>
              await handleStepChange("The Importance Of Nutrition", 1, 4, 6)
            }
            class="grid h-16 w-full place-content-center rounded-full border-b-4 border-gray-800 bg-gray-600 p-4 text-gray-50"
          >
            <PhStar class="h-8 w-8 fill-current" />
          </button>
        </div>
      </section>

      <section class="rounded-t bg-gray-800">
        <div class="sticky top-0 col-span-12 rounded-xl p-4 text-secondary/50">
          <span class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 fill-current"
              viewBox="0 0 256 256"
            >
              <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
            </svg>
            <h1 class="">SECTION 2</h1>
          </span>
          <p class="small-title">Let's Start Do Challenges</p>
        </div>
      </section>
    </div>
  );
});

export default Play;

export const animetion = component$(() => {
  return (
    <div class="card-wrapper grid h-96 w-96 place-content-center">
      <div class="card-content">
        <div></div>
      </div>
    </div>
  );
});

interface TitleGameProps {
  title: string;
  subTitle: string;
  element: PropsOf<"div">;
  params: StepKey;
}
export const TitleGame = component$<TitleGameProps>((props) => {
  return (
    <div {...props.element}>
      <AppLink
        route={"/client/(main)/play/[section]/"}
        param:section={props.params}
        class="flex flex-col gap-2"
      >
        <h1 class="text-xs text-green-950/70">{props.title}</h1>
        <p class="small-title">{props.subTitle}</p>
      </AppLink>
    </div>
  );
});

interface LevelLinkProps extends PlayProps {
  unit: number;
  section: number;
  parentClass: string;
  level: number;
}

export const LevelLink = component$<LevelLinkProps>((props) => {
  return (
    <div class={props.parentClass}>
      <AppLink
        route="/client/(main)/play/[section]/[unit]/[level]/"
        param:unit={`${props.unit}`}
        param:level={`${props.level}`}
        param:section={`${props.section}`}
        class={cn(
          "grid h-16 w-full place-content-center rounded-full border-b-4 p-4 text-gray-50 transition-all ease-in-out active:border-b",
          props.currentLevel+1 >= props.level &&
            props.currentUnit+1 >= props.unit &&
            props.currentSection+1 >= props.section
            ? "border-green-900 bg-green-600"
            : "border-gray-800 bg-gray-600",
        )}
      >
        <PhStar class="h-8 w-8 fill-current" />
      </AppLink>
    </div>
  );
});