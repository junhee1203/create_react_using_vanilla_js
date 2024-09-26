// components/Item.ts
import { ModuleSource } from 'module';
import { Component } from '../core/Component';
import { Item } from '../types/state';

export class ItemComponent extends Component<Item> {
  fetchState(): Promise<Item[]> {
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

  template(): string {
    return `
    <ul>
    ${this.state
      .map(
        (item) => `
      <li>${item.value}</li>
      <button class="deleteBtn" data-id=${item.id}>삭제</button>
      `
      )
      .join('')}
  </ul>
  <input type='text' class='appender'>
  <button class='append'>추가</button>
    `;
  }

  setEvent(): void {
    this.addEvent('click', '.append', () => {
      const itemsLength = this.state.length;
      const $input = document.querySelector('.appender') as HTMLInputElement;
      const itemValue = $input.value;
      const newItems = [
        ...this.state,
        { id: itemsLength + 1, value: itemValue },
      ];
      this.setState(newItems);
    });

    this.addEvent('click', '.deleteBtn', (e) => {
      if (e.target instanceof HTMLElement) {
        const deletingId = Number(e.target.dataset.id);
        let items = [...this.state];
        items = items.filter((item) => item.id !== deletingId);
        this.setState(items);
      }
    });
  }
}
