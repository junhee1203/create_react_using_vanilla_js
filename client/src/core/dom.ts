import { Container } from "../types/ReactType";
import { React } from "./React";

export function updateDOM(
  component: () => JSX.Element,
  container: Container
): void {
  const newVirtualDOM = component();
  const oldVirtualDOM = container.__virtualDOM;

  if (!oldVirtualDOM) {
    // 초기 렌더링
    const $newDOM = React.render(newVirtualDOM);
    container.innerHTML = '';
    container.appendChild($newDOM);
  } else {
    // 재렌더링
    const diff = React.diff(oldVirtualDOM, newVirtualDOM);
    if (diff) {
      React.patch(container, diff);
    }
  }

  container.__virtualDOM = newVirtualDOM;
}