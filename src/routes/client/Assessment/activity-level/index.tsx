import { $, component$, useContext } from '@builder.io/qwik';
import { ActivityLevel } from '~/components/ActivityLevel/ActivityLevel';
import { contextAssessmentStore } from '../../layout';

export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const onChange$ = $(async (value: string) => {
    await sc.actions.mergeProfile.submit({value, field: 'activity_level'});
  });
  return (
    <ActivityLevel onChange$={onChange$} value={sc} />
  );
});
