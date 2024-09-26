// core/Component
export abstract class Component<T> {
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
    this.setEvent();
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setState(newState: T[]) {
    this.state = newState;
    this.render();
  }

  addEvent(eventType: string, selector: string, callback: (e: Event) => void) {
    this.$target.addEventListener(eventType, (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest(selector)) {
          callback(e);
        }
      }
    });
  }

  abstract fetchState(): Promise<T[]>;

  abstract template(): string;

  abstract setEvent(): void;
}
