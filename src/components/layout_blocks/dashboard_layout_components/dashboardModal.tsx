import { component$ } from "@builder.io/qwik";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTrigger, ModalWrapper } from "../../ui/modal/modal";
import { Button } from "../../ui/button/button";
import { Form } from "@builder.io/qwik-city";
import { type DashboardProps } from "./dashboard";


interface AuthProps extends DashboardProps {}

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