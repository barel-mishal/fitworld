import { $, Fragment, component$, useOnDocument, useSignal } from '@builder.io/qwik';


export default component$(() => {
    const refRoot = useSignal<HTMLDivElement>(); 
    const show = useSignal<boolean>(false);  

    const onClickOpen = $(() => show.value = !show.value);
    const onClickOutside = $((even: Event) => {
        console.log("click");
        const isClickOutside = refRoot.value && !refRoot.value.contains(even.target as Node);
        if (isClickOutside) {
            console.log("click outside");
        }
    });

    useOnDocument("click", onClickOutside);
    
  return (
    <Fragment>
    <button
    onClick$={onClickOpen}>
        Open
    </button>
    <div ref={refRoot} class="
    data-[show='true']:bg-rose-400 transition-all duration-300 absolute -bottom-full data-[show='true']:-bottom-0
    " data-show={String(show.value)}>
        dslfkjdsfl
    
    </div>
    </Fragment>
  );
});
