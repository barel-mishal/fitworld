import { Draggable as DraggableLib } from '@shopify/draggable';
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export interface DraggableProps {

}

export const Draggable = component$<DraggableProps>(() => {
  const divRef = useSignal<HTMLUListElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    new DraggableLib(divRef.value!, {
      draggable: 'li',
    });
  });

  return (
    <ul ref={divRef}>
      <li>Test</li>
    </ul>
  );
});
