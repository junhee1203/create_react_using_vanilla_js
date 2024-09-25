import { ItemComponent } from './components/Item';

class App {
  constructor() {
    const root = document.querySelector('#root');
    new ItemComponent(document.querySelector('#root') as HTMLElement);
  }
}

new App()