/** @jsx React.createElement */
import { React } from '../core/React';

export const App = (): JSX.Element => {
  const state = [
    { id: 1, value: 'item 1' },
    { id: 2, value: 'item 2' },
  ];

  return (
    <div id="app">
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <input type="checkbox" className="toggle" />
            {item.value}
            <button className="remove">삭제</button>
          </li>
        ))}
      </ul>
      <form>
        <input type="text" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};
