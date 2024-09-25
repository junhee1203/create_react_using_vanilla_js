// app.ts
interface Item {
  id: number;
  value: string;
}

abstract class Component<T> {
  protected $target: HTMLElement;
  protected state: T[];

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.state = [];
    this.initialize();
  }

  private async initialize() {
    this.state = await this.fetchState();
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent()
  }

  setState(newState: T) {
    this.state = [...this.state, newState];
    this.render();
  }

  abstract fetchState(): Promise<T[]>;

  abstract template(): string;

  abstract setEvent(): void;
}

class ItemComponent extends Component<Item> {
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
    ${this.state.map((item) => `<li>${item.value}</li>`).join('')}
  </ul>
  <button class='append'>추가</button>
    `;
  }

  setEvent(): void {
    const $button = this.$target.querySelector('.append') as HTMLElement;
    $button.addEventListener('click', () => {
      const itemsLength = this.state.length;
      this.setState({ id: itemsLength + 1, value: `item${itemsLength + 1}` });
    });
  }
}

new ItemComponent(document.querySelector('#root') as HTMLElement);
