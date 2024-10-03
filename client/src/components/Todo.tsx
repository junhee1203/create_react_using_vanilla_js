/** @jsx React.createElement */
import { TodoItem } from '../types/Item';
import { updateDOM } from './../core/dom';

export const App = (() => {
  // 클로저를 사용하여 상태를 유지합니다
  let state: TodoItem[] = [
    { id: 1, value: 'item 1', completed: false },
    { id: 2, value: 'item 2', completed: false },
  ];

  const rerender = () => {
    const root = document.getElementById('root');
    if (root) {
      updateDOM(App, root);
    }
  };

  return (): JSX.Element => {
    const addItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const input = form.elements.namedItem('addInput') as HTMLInputElement;
      const inputValue = input.value.trim();
      if (inputValue) {
        state = [
          ...state,
          { id: Date.now(), value: inputValue, completed: false },
        ];
        input.value = '';
        rerender();
      }
    };

    const removeItem = (id: number) => {
      state = state.filter((item) => item.id !== id);
      rerender();
    };

    console.log('Current state:', state); // 디버깅을 위한 로그

    return (
      <div id="app">
        <ul>
          {state.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.value}
              </span>
              <button onClick={() => removeItem(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
        <form onSubmit={addItem}>
          <input type="text" name="addInput" />
          <button type="submit">추가</button>
        </form>
      </div>
    );
  };
})();
