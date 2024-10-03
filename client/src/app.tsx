/** @jsx React.createElement */import { App } from './components/Todo';
import { updateDOM } from './core/dom';

const container = document.getElementById('root') as HTMLElement;

// 초기 렌더링
updateDOM(() => App(), container);