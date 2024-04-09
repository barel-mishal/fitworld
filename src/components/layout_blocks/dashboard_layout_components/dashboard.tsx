import { $, type Signal, Slot, component$, createContextId, useContextProvider, useOnWindow, useSignal } from "@builder.io/qwik";
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import { Link } from "@builder.io/qwik-city";
import { type ReturnTypeSignout } from "~/routes/plugin@auth";
import { MyModal } from "./dashboardModal";


export interface DashboardProps {
    name: string;
    signout: ReturnTypeSignout
}

export const contextDashboard = createContextId<Signal<{height: 0}>>("contextDashboard");

export const useContextDashboard = () => {
    const refMain = useSignal<HTMLDivElement>();

    const signalTopBottom = useSignal<{
        height: number;
    }>({ height: 0 });

    useOnWindow("load", $(() => {
        if (!refMain.value) return;
        console.log(refMain.value.clientHeight)
        signalTopBottom.value = {
            height: refMain.value.clientHeight-0.5
        };
    }));

    useOnWindow("resize", $(() => {
        if (!refMain.value) return;
        signalTopBottom.value = {
            height: refMain.value.clientHeight-0.2
        };
    }));

    useContextProvider(contextDashboard, signalTopBottom);

    return refMain
};

export const Dashboard = component$<DashboardProps>((props) => {
    const refMain = useContextDashboard();

    
    return (
        <div class={"font-oldstyle text-sky-950 flex h-screen max-h-screen "}>
            <div class={"side-bar border-r border-slate-300 min-w-[250px]"}>
                <div class={"p-4 grid gap-8"}>
                    <h1 class={"text-3xl font-bold"}>FitWorld</h1>
                    <ul class={"grid gap-2"}>
                        <li class="bg-sky-100 rounded-md text-sky-900 overflow-hidden"><Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200", "bg-sky-100"]} href="/dashboard">Dashboard</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md text-sky-900 overflow-hidden"><Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200", "bg-sky-none"]} href="/dashboard/notes">Notes</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md text-sky-900 overflow-hidden"><Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200", "bg-sky-none"]} href="/dashboard/feed">Feed</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md text-sky-900 overflow-hidden"><Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200", "bg-sky-none"]} href="/dashboard/profile">Profile</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md text-sky-900 overflow-hidden"><Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200", "bg-sky-none"]} href="/dashboard/settings">Settings</Link></li>
                    </ul>
                </div>
            </div>
            <div class={"flex-grow flex flex-col "}>
                <div class={"flex justify-between p-4 items-center border-b border-slate-300"}>
                    <div class="flex w-full max-w-sm items-center">
                        <Input type="email" class={"rounded-r-none rounded-l-md"} placeholder="find feeds and notes"   />
                        <Button type="submit" class={"rounded-l-none"}>Search</Button>
                    </div>
                    <MyModal name={props.name} signout={props.signout} />
                </div>
                <div class={"main flex flex-grow flex-col overflow-y-auto "} ref={refMain}>
                    <Slot />
                </div>
                <div class={"footer bg-sky-950"} >
                    <div class={"p-1 text-sky-200"}>
                        <p class={"text-sm text-center"}>© 2024 Publish Notes. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

