import { $, type QRL, component$, useId } from "@builder.io/qwik";
import { type AssessmentStoreType } from "~/routes/client/layout";

interface ActivityLevelProps {
  onChange$: QRL<(value: string) => void>;
  value: AssessmentStoreType;
}

export const ActivityLevel = component$<ActivityLevelProps>((props) => {
  const activityLevels = [
    "Sedentary",
    "Lightly active",
    "Moderately active",
    "Very active",
    "Extra active",
  ];
  const id = useId();
  const handleActivityLevelChange = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    props.value.data.lifeStyle.activityLevel = target.value;
    await props.onChange$(target.value);
  });

  return (
    <div class="info-title grid w-full">
      <h2 class="title mb-4 text-xl">Select Your Activity Level</h2>
      <div class="flex flex-col gap-4">
        {activityLevels.map((level) => (
          <label
            class={`inp transition-all duration-200 ease-in ${
              props.value.data.lifeStyle.activityLevel === level
                ? "bg-gray-700"
                : "bg-gray-900"
            }`}
            for={`${id}-activity-${level}`}
            key={level}
          >
            <input
              type="radio"
              id={`${id}-activity-${level}`}
              name="activity"
              value={level}
              class="cursor-pointer appearance-none"
              checked={props.value.data.lifeStyle.activityLevel === level}
              onChange$={handleActivityLevelChange}
            />
            <span class="ml-2">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
