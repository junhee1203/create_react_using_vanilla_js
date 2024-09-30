/** @jsx React.createElement */
import { React } from './core/React';
import { App } from './components/Todo';


const container = document.getElementById('root');

React.render(<App />, container as HTMLElement);
