import { component$, type PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

type TextareaProps = PropsOf<"textarea"> & {
  error?: string;
};

export const Textarea = component$<TextareaProps>(
  ({ name, error, ...props }) => {
    return (
      <>
        <textarea
          {...props}
          class={cn(
            "[&::-webkit-scrollbar-track]:bg-blue flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          )}
        />
        {error && <div id={`${name}-error`}>{error}</div>}
      </>
    );
  },
);
