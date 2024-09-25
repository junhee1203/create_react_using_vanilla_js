// app.ts
interface Item {
  id: number;
  value: string;
}

function fetchItemData(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, value: 'item1' },
        { id: 2, value: 'item2' },
        { id: 3, value: 'item3' },
      ]);
    }, 0);
  });
}

let items = [] as Item[];

function render() {
  const root = document.querySelector('#root') as HTMLElement;

  root.innerHTML = `
  <ul>
    ${items.map((item) => `<li>${item.value}</li>`).join('')}
  </ul>
  <button class='append'>추가</button>
  `;

  const $button = document.querySelector('.append') as HTMLElement;

  $button.addEventListener('click', () => {
    console.log('click')
  });
}

// function setState(newState: Item) {
//   let state = items.push(newState);
//   render();
// }

async function initApp() {
  items = await fetchItemData();
  render();
}

initApp();
