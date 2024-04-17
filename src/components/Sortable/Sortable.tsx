import { type PropsOf, Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Sortable, Plugins } from '@shopify/draggable';

type LiBlockProps = PropsOf<"li">;

export const Block = component$<LiBlockProps>((props) => {
  return (
    <li {...props} class={cn("Block--isDraggable", props.class)}>
      <Slot />
    </li>
  );
});

export interface SortableProps extends PropsOf<"ul"> {
}

/*
 * A sortable list of items.
 *  - Items can be dragged and dropped to reorder.
 *  - To use this component, wrap the items in a `SortableComp` and each item in a `Block component`.
 *  - The `Block` component is a draggable item.
*/
export const SortableComp = component$<SortableProps>((props) => {
  const containers = useSignal<HTMLUListElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!containers.value) {
      return;
    }

    const n = new Sortable(containers.value, {
      draggable: '.Block--isDraggable',
      mirror: {
        constrainDimensions: true,
      },
      plugins: [Plugins.SortAnimation],
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
        horizontal: false,
      },
    });

    console.log(n.getClassNamesFor("container:dragging"));

  });
  return (
      <ul ref={containers} {...props}>
        <Slot />
      </ul>
  );
});

