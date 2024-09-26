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
  <button class='append'>추가</button>
    `;
  }

  setEvent(): void {
    this.$target.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('.append')) {
          const itemsLength = this.state.length;
          const newItems = [
            ...this.state,
            { id: itemsLength + 1, value: `item${itemsLength + 1}` },
          ];
          this.setState(newItems);
        }

        if (e.target.closest('.deleteBtn')) {
          const deletingId = Number(e.target.dataset.id);
          let items = [...this.state];
          items = items.filter((item) => item.id !== deletingId);
          this.setState(items);
        }
      }
    });
  }
}
