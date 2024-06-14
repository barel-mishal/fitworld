import { component$ } from '@builder.io/qwik';
import { routeLoader$, server$ } from '@builder.io/qwik-city';


export const useLoaderUserWeights = routeLoader$(async function () {
  return {
    weights: [
      {
        date: "2021-10-01",
        weight: 200,

      },
      {
        date: "2021-10-02",
        weight: 199,
      }
    ]
  }
});

export default component$(() => {
  const weights = useLoaderUserWeights().value;
  return (
    <div>
      {
        weights.weights.map((weight) => {
          return (
            <div key={weight.date}>
              <p>{weight.date}</p>
              <p>{weight.weight}</p>
            </div>
          );
        })
        }
    </div>
  );
});

export const serverInsertWeight = server$(async function () {
  return {
    success: true,
  };
})
