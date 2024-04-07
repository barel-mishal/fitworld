import { Slot, component$ } from "@builder.io/qwik";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTrigger, ModalWrapper } from "../ui/modal/modal";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Form, Link } from "@builder.io/qwik-city";
import { type ReturnTypeSignout } from "~/routes/plugin@auth";


export interface DashboardProps {
    name: string;
    signout: ReturnTypeSignout
}

export const Dashboard = component$<DashboardProps>((props) => {

    return (
        <div class={"font-oldstyle text-sky-950 flex h-screen max-h-screen"}>
            <div class={"side-bar border-r border-slate-300 min-w-[250px]"}>
                <div class={"p-4 grid gap-8"}>
                    <h1 class={"text-3xl font-bold"}>FitWorld</h1>
                    <ul class={"grid gap-2"}>
                        <li class="bg-sky-100 rounded-md p-4 text-sky-900 hover:bg-sky-100 transition-all duration-200"><Link class={""}>Dashboard</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md p-4 text-sky-900 hover:bg-sky-100 transition-all duration-200"><Link class={""}>Notes</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md p-4 text-sky-900 hover:bg-sky-100 transition-all duration-200"><Link class={""}>Feed</Link></li>
                        <li class={"h-px w-full bg-slate-200"}></li>
                        <li class="bg-sky-none rounded-md p-4 text-sky-900 hover:bg-sky-100 transition-all duration-200"><Link class={""}>Settings</Link></li>
                    </ul>
                </div>
            </div>
            <div class={"nav-bar flex-grow flex flex-col "}>
                <div class={"flex justify-between p-4 items-center border-b border-slate-300"}>
                    <div class="flex w-full max-w-sm items-center">
                        <Input type="email" class={"rounded-r-none rounded-l-md"} placeholder="find feeds and notes"   />
                        <Button type="submit" class={"rounded-l-none"}>Search</Button>
                    </div>
                    <MyModal name={props.name} signout={props.signout} />
                </div>
                <div class={"main flex flex-grow flex-col overflow-y-auto"}>
                    <Slot />
                </div>
                <div class={"footer bg-sky-950"}>
                    <div class={"p-1 text-sky-200"}>
                        <p class={"text-sm text-center"}>© 2024 Publish Notes. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

interface AuthProps {
    name: string;
    signout: ReturnTypeSignout
}

export const MyModal = component$<AuthProps>((props) => {
    return (
        <ModalWrapper>
            <ModalTrigger>
                <Button class={"rounded-full w-12 h-12"}>B</Button>
            </ModalTrigger>
            <Modal>
                <ModalHeader>
                <h2 class="text-lg font-bold">{props.name}</h2>
                <p class="text-sm font-light">
                    Make changes to your profile here. Click save when you're done.
                </p>
                </ModalHeader>
                <ModalContent>
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                    {/* <Label for="name" class="text-right">
                        Name
                    </Label>
                    <Input id="name" defaultValue="Pedro Duarte" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        Username
                    </Label>
                    <Input id="username" defaultValue="@peduarte" class="col-span-3" /> */}
                    </div>
                </div>
                </ModalContent>
                <ModalFooter>
                    <Form action={props.signout}>
                        <input type="hidden" name="callbackUrl" value="/auth/signout" />
                        <Button>Logout</Button>
                    </Form>
                </ModalFooter>
            </Modal>
        </ModalWrapper>
    );
});