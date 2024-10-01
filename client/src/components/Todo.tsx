/** @jsx React.createElement */
import { React } from '../core/React';
import { Item } from '../types/Item';

let state: Item[] = [
  { id: 1, value: 'item 1' },
  { id: 2, value: 'item 2' },
];

export const App = (): JSX.Element => {
  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const $input = document.querySelector('.add-input') as HTMLInputElement;
    const inputValue = $input.value;
    const root = document.getElementById('root') as HTMLElement;
    state = [...state, { id: state.length + 1, value: inputValue }];
    root.innerHTML = '';
    React.render(<App />, root);
  };

  return (
    <div id="app">
      <ul>
        {state.map((item) => (
          <li>
            <input type="checkbox" className="toggle" />
            {item.value}
            <button className="remove">삭제</button>
          </li>
        ))}
      </ul>
      <form>
        <input type="text" className="add-input" />
        <button
          className="add"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            addItem(e);
          }}
        >
          추가
        </button>
      </form>
    </div>
  );
};
