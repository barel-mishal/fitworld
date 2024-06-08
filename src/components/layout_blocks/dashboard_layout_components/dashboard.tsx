import {
  $,
  type Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import { type ReturnTypeSignout } from "~/routes/plugin@auth";
import { NavLink } from "~/components/HookComponent/NavLink";

export interface DashboardProps {
  name: string;
  signout: ReturnTypeSignout;
}

export const contextDashboard =
  createContextId<Signal<{ height: 0 }>>("contextDashboard");

export const useContextDashboard = () => {
  const refMain = useSignal<HTMLDivElement>();

  const signalTopBottom = useSignal<{
    height: number;
  }>({ height: 0 });

  useOnWindow(
    "load",
    $(() => {
      if (!refMain.value) return;
      signalTopBottom.value = {
        height: refMain.value.clientHeight - 0.5,
      };
    }),
  );

  useOnWindow(
    "resize",
    $(() => {
      if (!refMain.value) return;
      signalTopBottom.value = {
        height: refMain.value.clientHeight - 0.2,
      };
    }),
  );

  useContextProvider(contextDashboard, signalTopBottom);

  return refMain;
};

export const Dashboard = component$<DashboardProps>(() => {
  const refMain = useContextDashboard();
  return (
    <div class={"flex h-screen max-h-screen font-oldstyle text-sky-950"}>
      <div class={"side-bar min-w-[250px] border-r border-slate-300"}>
        <div class={"grid gap-8 p-4"}>
          <h1 class={"text-3xl font-bold"}>FitWorld</h1>
          <ul class={"grid gap-2"}>
            <li class="overflow-hidden rounded-md text-sky-900">
              <NavLink
                class={[
                  "grid p-4 transition-all duration-200 hover:bg-sky-100",
                ]}
                activeClass="bg-sky-100"
                disabledClass="bg-sky-none"
                href="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li class={"h-px w-full bg-slate-200"}></li>
            <li class="bg-sky-none overflow-hidden rounded-md text-sky-900">
              <NavLink
                class={[
                  "grid p-4 transition-all duration-200 hover:bg-sky-100",
                ]}
                activeClass="bg-sky-100"
                disabledClass="bg-sky-none"
                href="/dashboard/notes"
              >
                Notes
              </NavLink>
            </li>
            <li class={"h-px w-full bg-slate-200"}></li>
            <li class="bg-sky-none overflow-hidden rounded-md text-sky-900">
              <NavLink
                class={[
                  "grid p-4 transition-all duration-200 hover:bg-sky-100",
                ]}
                activeClass="bg-sky-100"
                disabledClass="bg-sky-none"
                href="/dashboard/feed"
              >
                Feed
              </NavLink>
            </li>
            <li class={"h-px w-full bg-slate-200"}></li>
            <li class="bg-sky-none overflow-hidden rounded-md text-sky-900">
              <NavLink
                class={[
                  "grid p-4 transition-all duration-200 hover:bg-sky-100",
                ]}
                activeClass="bg-sky-100"
                disabledClass="bg-sky-none"
                href="/dashboard/profile"
              >
                Profile
              </NavLink>
            </li>
            <li class={"h-px w-full bg-slate-200"}></li>
            <li class="bg-sky-none overflow-hidden rounded-md text-sky-900">
              <NavLink
                class={[
                  "grid p-4 transition-all duration-200 hover:bg-sky-100",
                ]}
                activeClass="bg-sky-100"
                disabledClass="bg-sky-none"
                href="/dashboard/settings"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div class={"flex flex-grow flex-col"}>
        <div
          class={
            "flex items-center justify-between border-b border-slate-300 p-4"
          }
        >
          <div class="flex w-full max-w-sm items-center">
            <Input
              type="email"
              class={"rounded-l-md rounded-r-none"}
              placeholder="Find feeds, notes and users"
            />
            <Button type="submit" class={"rounded-l-none"}>
              Search
            </Button>
          </div>
        </div>
        <div
          class={"main flex flex-grow flex-col overflow-y-auto"}
          ref={refMain}
        >
          <Slot />
        </div>
        <div class={"footer bg-sky-950"}>
          <div class={"p-1 text-sky-200"}>
            <p class={"text-center text-sm"}>
              © 2024 Publish Notes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
