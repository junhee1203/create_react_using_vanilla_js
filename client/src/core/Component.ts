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
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setState(newState: T) {
    this.state = [...this.state, newState];
    this.render();
  }

  abstract fetchState(): Promise<T[]>;

  abstract template(): string;

  abstract setEvent(): void;
}
