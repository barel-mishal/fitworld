import { component$, useSignal, $, useComputed$ } from '@builder.io/qwik';

interface GridItem {
  id: number;
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
}

export const BentoGrid = component$(() => {
  const gridItems = useSignal<GridItem[]>([]);
  const totalCols = useSignal(8);
  const totalRows = useSignal(40);

  const generateRandomGrid = $(() => {
    const filledPositions: boolean[][] = Array(totalRows.value).fill(null).map(() => Array(totalCols.value).fill(false));
    const newGridItems: GridItem[] = [];
    let itemId = 1;

    function canPlaceItem(row: number, col: number, colSpan: number, rowSpan: number): boolean {
      if (col + colSpan > totalCols.value || row + rowSpan > totalRows.value) return false;
      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
          if (filledPositions[r][c]) return false;
        }
      }
      return true;
    }

    function markPosition(row: number, col: number, colSpan: number, rowSpan: number): void {
      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
          filledPositions[r][c] = true;
        }
      }
    }

    for (let row = 0; row < totalRows.value; row++) {
      for (let col = 0; col < totalCols.value; col++) {
        if (!filledPositions[row][col]) {
          const colSpan = Math.min(Math.floor(Math.random() * 2) + 1, totalCols.value - col);
          const rowSpan = Math.min(Math.floor(Math.random() * 2) + 1, totalRows.value - row);

          if (canPlaceItem(row, col, colSpan, rowSpan)) {
            newGridItems.push({
              id: itemId++,
              colStart: col + 1,
              colSpan,
              rowStart: row + 1,
              rowSpan,
            });
            markPosition(row, col, colSpan, rowSpan);
          }
        }
      }
    }

    gridItems.value = newGridItems;
  });

  const computeStyleGridIitems = useComputed$(() => {
    return gridItems.value.map(item => {
      return {
        ...item,
        style: {
          gridColumn: `${item.colStart} / span ${item.colSpan}`,
          gridRow: `${item.rowStart} / span ${item.rowSpan}`,
        },
      };
    });
  });

  const onClickTailwindCopyClipboard = $(() => {
    const gridContainer = document.querySelector('.grid');
    if (gridContainer) {
      let htmlString = `<div class="grid grid-cols-8 grid-rows-4 gap-2 w-4/5 h-4/5">`;

      const gridItems = gridContainer.children;
      for (const item of gridItems) {
        const classList = item.classList.toString();
        const style = item.getAttribute('style');
        const innerHTML = item.innerHTML;

        htmlString += `<div class="${classList}" style="${style}">${innerHTML}</div>`;
      }

      htmlString += `</div>`;

      navigator.clipboard.writeText(htmlString).then(() => {
        console.log('Copied to clipboard');
      }).catch(err => {
        console.error('Error copying to clipboard: ', err);
      });
    }
  });

  return (
    <div class="flex flex-col items-center h-screen">
      <div class="flex items-center mb-4">
        <label class="mr-2">Rows:</label>
        <input
          type="number"
          class="border border-gray-400 rounded p-1"
          value={totalRows.value}
          onInput$={(e) => {
            totalRows.value = parseInt((e.target as HTMLInputElement).value);
          }}
        />
        <label class="mr-2">Cols:</label>
        <input
          type="number"
          class="border border-gray-400 rounded p-1"
          value={totalCols.value}
          onInput$={(e) => {
            totalCols.value = parseInt((e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div class="grid grid-cols-8 gap-2 w-full h-full overflow-auto">
        {gridItems.value.map(item => (
          <div
            key={item.id}
            class={`bg-green-500 text-white flex justify-center items-center text-2xl rounded `}
            style={computeStyleGridIitems.value[item.id - 1].style}
          >
            {item.id}
          </div>
        ))}
      </div>
      <button class="mt-4 p-2 bg-blue-500 text-white rounded" onClick$={generateRandomGrid}>
        Regenerate Grid
      </button>
      <button class="mt-4 p-2 bg-blue-500 text-white rounded" onClick$={onClickTailwindCopyClipboard}>
        Copy Tailwind CSS Grid
      </button>
    </div>
  );
});