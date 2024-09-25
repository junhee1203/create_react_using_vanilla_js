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

function createButton(): HTMLElement{
  const $button = document.createElement('button')
  $button.textContent = '추가'

  return $button
}

async function render() {
  const itmes = await fetchItemData();
  const root = document.querySelector('#root') as HTMLElement;
  const $ul = document.createElement('ul');
  const $button = createButton();

  $ul.innerHTML += itmes.map((item) => `<li>${item.value}</li>`).join('');

  $button.addEventListener('click',()=>{
    console.log('click')
  })

  root.append($ul);
  root.append($button)
}

render()