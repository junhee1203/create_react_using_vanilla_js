import { ItemComponent } from './Item';

class App {
  constructor() {
    const root = document.querySelector('#root') as HTMLElement;
    new ItemComponent(root);
  }
}

new App();
